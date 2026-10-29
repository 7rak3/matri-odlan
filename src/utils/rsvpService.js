// Cloud + Local RSVP & Settings Persistence + Email Notification Service

const CLOUD_OBJECT_URL = 'https://api.restful-api.dev/objects/ff808181a09d98f701a187f0f7814f7b';
const NTFY_TOPIC_URL = 'https://ntfy.sh/matri_odlan_mariajose_2027_rsvp_store';

const LOCAL_RSVPS_KEY = 'matri_odlan_rsvps_v1';
const LOCAL_SETTINGS_KEY = 'matri_odlan_settings_v1';
const LOCAL_DELETED_KEY = 'matri_odlan_deleted_ids_v1';

export const DEFAULT_SETTINGS = {
  notificationEmail: 'odlan.fernandez@gmail.com',
  ccEmail: '',
  webhookUrl: '',
  driveUrl: 'https://drive.google.com/drive/folders/matrimonio-odlan-y-mariajose-2027',
  whatsappPhone: '56982375963',
  parisCode: 'Odlan & María Jose',
};

export const DIETARY_LABELS = {
  traditional: 'Tradicional Gala',
  vegetarian: 'Vegetariano',
  vegan: 'Vegano',
  celiac: 'Sin Gluten',
};

export function getDietLabel(id) {
  return DIETARY_LABELS[id] || id || 'Tradicional Gala';
}

function getLocalRsvps() {
  try {
    const raw = localStorage.getItem(LOCAL_RSVPS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setLocalRsvps(list) {
  try {
    localStorage.setItem(LOCAL_RSVPS_KEY, JSON.stringify(list));
  } catch {
    // ignore storage errors
  }
}

function getDeletedIds() {
  try {
    const raw = localStorage.getItem(LOCAL_DELETED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setDeletedIds(ids) {
  try {
    localStorage.setItem(LOCAL_DELETED_KEY, JSON.stringify(ids));
  } catch {
    // ignore storage errors
  }
}

export function getLocalSettings() {
  try {
    const raw = localStorage.getItem(LOCAL_SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : { ...DEFAULT_SETTINGS };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function setLocalSettings(settings) {
  try {
    const merged = { ...getLocalSettings(), ...settings };
    localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return { ...DEFAULT_SETTINGS, ...settings };
  }
}

function mergeRsvpLists(listA = [], listB = [], deletedIds = []) {
  const deletedSet = new Set(deletedIds);
  const map = new Map();

  [...listA, ...listB].forEach((item) => {
    if (!item || !item.id || deletedSet.has(item.id)) return;
    const existing = map.get(item.id);
    if (!existing || (item.updatedAt || item.createdAt || '') >= (existing.updatedAt || existing.createdAt || '')) {
      map.set(item.id, item);
    }
  });

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );
}

/**
 * Fetches RSVPs and Settings from the cloud and merges with local cache.
 */
export async function fetchCloudStore() {
  const localRsvps = getLocalRsvps();
  const localSettings = getLocalSettings();
  const localDeleted = getDeletedIds();

  let cloudRsvps = [];
  let cloudSettings = {};
  let cloudDeleted = [];

  // 1. Primary Cloud Store
  try {
    const res = await fetch(CLOUD_OBJECT_URL, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        if (Array.isArray(json.data.rsvps)) cloudRsvps = json.data.rsvps;
        if (json.data.settings) cloudSettings = json.data.settings;
        if (Array.isArray(json.data.deletedIds)) cloudDeleted = json.data.deletedIds;
      }
    }
  } catch {
    // Fallback to ntfy stream if primary is unreachable
  }

  // 2. Secondary Cloud Stream backup (ntfy.sh)
  try {
    const res = await fetch(`${NTFY_TOPIC_URL}/json?poll=1&since=all`, {
      method: 'GET',
      cache: 'no-store',
    });
    if (res.ok) {
      const text = await res.text();
      const lines = text.split('\n').filter(Boolean);
      const ntfyRsvps = [];
      lines.forEach((line) => {
        try {
          const msg = JSON.parse(line);
          if (msg.event === 'message' && msg.message) {
            const payload = JSON.parse(msg.message);
            if (payload && payload.type === 'RSVP_ENTRY' && payload.entry) {
              ntfyRsvps.push(payload.entry);
            } else if (payload && payload.type === 'SETTINGS_UPDATE' && payload.settings) {
              cloudSettings = { ...cloudSettings, ...payload.settings };
            } else if (payload && payload.type === 'RSVP_DELETE' && payload.id) {
              cloudDeleted.push(payload.id);
            }
          }
        } catch {
          // ignore malformed line
        }
      });
      cloudRsvps = [...cloudRsvps, ...ntfyRsvps];
    }
  } catch {
    // ignore backup stream errors
  }

  const allDeleted = Array.from(new Set([...localDeleted, ...cloudDeleted]));
  const mergedRsvps = mergeRsvpLists(localRsvps, cloudRsvps, allDeleted);
  const mergedSettings = {
    ...DEFAULT_SETTINGS,
    ...localSettings,
    ...Object.fromEntries(
      Object.entries(cloudSettings || {}).filter(([, val]) => val !== undefined && val !== '')
    ),
  };

  setDeletedIds(allDeleted);
  setLocalRsvps(mergedRsvps);
  setLocalSettings(mergedSettings);

  return {
    rsvps: mergedRsvps,
    settings: mergedSettings,
    deletedIds: allDeleted,
  };
}

/**
 * Pushes the current state to the cloud store.
 */
export async function syncCloudStore(rsvps, settings, deletedIds = getDeletedIds()) {
  setLocalRsvps(rsvps);
  setLocalSettings(settings);
  setDeletedIds(deletedIds);

  try {
    await fetch(CLOUD_OBJECT_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'matri-odlan-2027',
        data: {
          rsvps,
          settings,
          deletedIds,
          updatedAt: new Date().toISOString(),
        },
      }),
    });
  } catch {
    // ignore network error
  }
}

/**
 * Saves a new RSVP submission, syncs to cloud, and sends email + webhook notifications.
 */
export async function submitRsvpEntry(formData) {
  const store = await fetchCloudStore();
  const entry = {
    id: `rsvp_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: (formData.name || '').trim(),
    attendance: formData.attendance === 'no' ? 'no' : 'yes',
    hasCompanion: Boolean(formData.hasCompanion),
    companionName: formData.hasCompanion ? (formData.companionName || '').trim() : '',
    dietary: formData.dietary || 'traditional',
    dietaryNotes: (formData.dietaryNotes || '').trim(),
    companionDietary: formData.companionDietary || 'traditional',
    companionDietaryNotes: (formData.companionDietaryNotes || '').trim(),
    songRequest: (formData.songRequest || '').trim(),
    message: (formData.message || '').trim(),
    createdAt: new Date().toISOString(),
  };

  const updatedRsvps = [entry, ...store.rsvps];
  await syncCloudStore(updatedRsvps, store.settings, store.deletedIds);

  // Also broadcast to ntfy backup stream
  try {
    await fetch(NTFY_TOPIC_URL, {
      method: 'POST',
      body: JSON.stringify({ type: 'RSVP_ENTRY', entry }),
    });
  } catch {
    // ignore backup error
  }

  // Send Email Notification if notificationEmail is configured
  const emailResult = await sendRsvpEmailNotification(entry, store.settings);

  // Send Webhook (e.g. Google Sheets / Make / Zapier) if configured
  if (store.settings.webhookUrl && store.settings.webhookUrl.trim()) {
    try {
      await fetch(store.settings.webhookUrl.trim(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
    } catch {
      // ignore webhook error
    }
  }

  return { entry, emailResult, settings: store.settings };
}

/**
 * Deletes an RSVP entry by ID and syncs to cloud.
 */
export async function deleteRsvpEntry(id) {
  const store = await fetchCloudStore();
  const deletedIds = Array.from(new Set([...(store.deletedIds || []), id]));
  const updatedRsvps = store.rsvps.filter((r) => r.id !== id);

  await syncCloudStore(updatedRsvps, store.settings, deletedIds);

  try {
    await fetch(NTFY_TOPIC_URL, {
      method: 'POST',
      body: JSON.stringify({ type: 'RSVP_DELETE', id }),
    });
  } catch {
    // ignore
  }

  return updatedRsvps;
}

/**
 * Saves updated Dashboard settings (email, drive link, etc.) to cloud.
 */
export async function saveDashboardSettings(newSettings) {
  const store = await fetchCloudStore();
  const mergedSettings = { ...store.settings, ...newSettings };
  await syncCloudStore(store.rsvps, mergedSettings, store.deletedIds);

  try {
    await fetch(NTFY_TOPIC_URL, {
      method: 'POST',
      body: JSON.stringify({ type: 'SETTINGS_UPDATE', settings: mergedSettings }),
    });
  } catch {
    // ignore
  }

  return mergedSettings;
}

/**
 * Sends a formatted RSVP notification email using FormSubmit AJAX API.
 */
export async function sendRsvpEmailNotification(entry, settings = getLocalSettings(), isTest = false) {
  const targetEmail = (settings.notificationEmail || '').trim();
  if (!targetEmail) {
    return { sent: false, reason: 'no_email_configured' };
  }

  const isAttending = entry.attendance === 'yes';
  const totalSeats = isAttending ? (entry.hasCompanion ? 2 : 1) : 0;

  const payload = {
    _subject: isTest
      ? `✨ [Prueba de Correo] Dashboard Matrimonio Odlan & María Jose`
      : `💍 Nueva Confirmación RSVP: ${entry.name} (${isAttending ? `Asistirá - ${totalSeats} cupo(s)` : 'No podrá asistir'})`,
    _template: 'table',
    _captcha: 'false',
    Invitado_Titular: entry.name,
    Asistencia: isAttending ? 'SÍ ASISTIRÁ' : 'NO PODRÁ ASISTIR',
    Tipo_de_Pase: entry.hasCompanion ? 'Pase Doble (Con Acompañante - 2 cupos)' : 'Pase Individual (1 cupo)',
    Total_Personas_Confirmadas: String(totalSeats),
    Menu_Titular: isAttending ? getDietLabel(entry.dietary) : 'No aplica',
    Alergias_Titular: entry.dietaryNotes || 'Ninguna indicada',
    Nombre_Acompanante: entry.hasCompanion && entry.companionName ? entry.companionName : 'No aplica',
    Menu_Acompanante:
      isAttending && entry.hasCompanion ? getDietLabel(entry.companionDietary) : 'No aplica',
    Alergias_Acompanante:
      isAttending && entry.hasCompanion ? entry.companionDietaryNotes || 'Ninguna indicada' : 'No aplica',
    Cancion_Sugerida_Fiesta: entry.songRequest || 'Sin sugerencia',
    Mensaje_para_los_Novios: entry.message || 'Sin mensaje adicional',
    Fecha_de_Registro: new Date(entry.createdAt || Date.now()).toLocaleString('es-CL'),
  };

  if (settings.ccEmail && settings.ccEmail.trim()) {
    payload._cc = settings.ccEmail.trim();
  }

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return { sent: res.ok, data };
  } catch (err) {
    return { sent: false, error: err?.message || 'Error de red' };
  }
}

/**
 * Exports all RSVPs to a downloadable CSV file (UTF-8 with BOM for Excel in Spanish).
 */
export function exportRsvpsToCsv(rsvps = []) {
  const headers = [
    'Fecha Registro',
    'Invitado Titular',
    'Asistencia',
    'Tipo de Pase',
    'Cupos Confirmados',
    'Menú Titular',
    'Alergias Titular',
    'Nombre Acompañante',
    'Menú Acompañante',
    'Alergias Acompañante',
    'Canción para la Fiesta',
    'Mensaje para los Novios',
  ];

  const escapeCsv = (val) => {
    const str = String(val ?? '').replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = rsvps.map((r) => {
    const isAttending = r.attendance === 'yes';
    const seats = isAttending ? (r.hasCompanion ? 2 : 1) : 0;
    return [
      new Date(r.createdAt || Date.now()).toLocaleString('es-CL'),
      r.name,
      isAttending ? 'Sí Asistirá' : 'No Asistirá',
      r.hasCompanion ? 'Con Acompañante (2 cupos)' : 'Individual (1 cupo)',
      seats,
      isAttending ? getDietLabel(r.dietary) : '—',
      r.dietaryNotes || '—',
      r.hasCompanion ? r.companionName || '—' : '—',
      isAttending && r.hasCompanion ? getDietLabel(r.companionDietary) : '—',
      isAttending && r.hasCompanion ? r.companionDietaryNotes || '—' : '—',
      r.songRequest || '—',
      r.message || '—',
    ].map(escapeCsv).join(';');
  });

  // Using semicolon delimiter + UTF-8 BOM so Microsoft Excel in Chile/Latin America opens columns directly
  const csvContent = '\uFEFF' + [headers.map(escapeCsv).join(';'), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute(
    'download',
    `Confirmaciones-Matrimonio-Odlan-y-MariaJose-${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
