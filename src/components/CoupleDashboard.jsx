import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  UserCheck,
  UserX,
  Utensils,
  Download,
  RefreshCw,
  Mail,
  Search,
  Trash2,
  Music,
  MessageSquare,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Send,
  Lock,
  Settings,
  Plus,
  Copy,
  Check,
  Heart,
} from 'lucide-react';
import {
  fetchCloudStore,
  deleteRsvpEntry,
  saveDashboardSettings,
  sendRsvpEmailNotification,
  exportRsvpsToCsv,
  submitRsvpEntry,
  getDietLabel,
  DEFAULT_SETTINGS,
} from '../utils/rsvpService';

export default function CoupleDashboard({ onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('matri_dashboard_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [rsvps, setRsvps] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'yes' | 'no' | 'allergies' | 'songs'
  const [activeTab, setActiveTab] = useState('responses'); // 'responses' | 'settings' | 'add'

  // Settings form state
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsStatus, setSettingsStatus] = useState('');
  const [testingEmail, setTestingEmail] = useState(false);
  const [testEmailStatus, setTestEmailStatus] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Manual guest entry state
  const [manualGuest, setManualGuest] = useState({
    name: '',
    attendance: 'yes',
    hasCompanion: false,
    companionName: '',
    dietary: 'traditional',
    dietaryNotes: '',
    companionDietary: 'traditional',
    companionDietaryNotes: '',
    songRequest: '',
    message: '',
  });
  const [addingManual, setAddingManual] = useState(false);

  const loadData = async (showSpinner = true) => {
    if (showSpinner) setSyncing(true);
    try {
      const data = await fetchCloudStore();
      setRsvps(data.rsvps || []);
      setSettings(data.settings || DEFAULT_SETTINGS);
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    let isMounted = true;
    fetchCloudStore()
      .then((data) => {
        if (!isMounted) return;
        setRsvps(data.rsvps || []);
        setSettings(data.settings || DEFAULT_SETTINGS);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
          setSyncing(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    const clean = pinInput.trim().toLowerCase();
    if (
      clean === 'novios2027' ||
      clean === 'dashboard' ||
      clean === 'odlan' ||
      clean === 'matri2027' ||
      clean === 'matri2026' ||
      clean === 'admin'
    ) {
      setPinError('');
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem('matri_dashboard_auth', 'true');
      } catch {
        // ignore
      }
    } else {
      setPinError('Clave incorrecta. Usa "novios2027" o "matri2027".');
    }
  };

  // Compute summary metrics
  const stats = useMemo(() => {
    let attendingResponses = 0;
    let declinedResponses = 0;
    let totalConfirmedPeople = 0;

    const menus = {
      traditional: 0,
      vegetarian: 0,
      vegan: 0,
      celiac: 0,
    };

    let allergiesCount = 0;
    let songsCount = 0;

    rsvps.forEach((r) => {
      if (r.attendance === 'yes') {
        attendingResponses += 1;
        totalConfirmedPeople += r.hasCompanion ? 2 : 1;

        const m1 = r.dietary || 'traditional';
        if (menus[m1] !== undefined) menus[m1] += 1;
        else menus.traditional += 1;

        if (r.dietaryNotes && r.dietaryNotes.trim()) allergiesCount += 1;

        if (r.hasCompanion) {
          const m2 = r.companionDietary || 'traditional';
          if (menus[m2] !== undefined) menus[m2] += 1;
          else menus.traditional += 1;

          if (r.companionDietaryNotes && r.companionDietaryNotes.trim()) {
            allergiesCount += 1;
          }
        }
      } else {
        declinedResponses += 1;
      }

      if (r.songRequest && r.songRequest.trim()) {
        songsCount += 1;
      }
    });

    return {
      totalResponses: rsvps.length,
      attendingResponses,
      declinedResponses,
      totalConfirmedPeople,
      menus,
      allergiesCount,
      songsCount,
    };
  }, [rsvps]);

  const filteredRsvps = useMemo(() => {
    return rsvps.filter((r) => {
      if (filterMode === 'yes' && r.attendance !== 'yes') return false;
      if (filterMode === 'no' && r.attendance !== 'no') return false;
      if (
        filterMode === 'allergies' &&
        !(r.dietaryNotes && r.dietaryNotes.trim()) &&
        !(r.companionDietaryNotes && r.companionDietaryNotes.trim())
      ) {
        return false;
      }
      if (filterMode === 'songs' && !(r.songRequest && r.songRequest.trim())) {
        return false;
      }

      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      return (
        (r.name || '').toLowerCase().includes(q) ||
        (r.companionName || '').toLowerCase().includes(q) ||
        (r.message || '').toLowerCase().includes(q) ||
        (r.songRequest || '').toLowerCase().includes(q)
      );
    });
  }, [rsvps, filterMode, searchTerm]);

  const handleDelete = async (id, guestName) => {
    if (!window.confirm(`¿Eliminar la confirmación de "${guestName}"?`)) return;
    setSyncing(true);
    const updated = await deleteRsvpEntry(id);
    setRsvps(updated);
    setSyncing(false);
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsStatus('');
    try {
      const saved = await saveDashboardSettings(settings);
      setSettings(saved);
      setSettingsStatus('¡Configuración guardada y sincronizada en la nube!');
      setTimeout(() => setSettingsStatus(''), 4000);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSendTestEmail = async () => {
    if (!settings.notificationEmail || !settings.notificationEmail.trim()) {
      setTestEmailStatus({
        ok: false,
        msg: 'Primero escribe un correo electrónico arriba y haz clic en Guardar.',
      });
      return;
    }

    setTestingEmail(true);
    setTestEmailStatus(null);
    try {
      await saveDashboardSettings(settings);
      const sampleEntry = {
        name: 'Invitado de Prueba (Odlan & María Jose)',
        attendance: 'yes',
        hasCompanion: true,
        companionName: 'Acompañante de Prueba',
        dietary: 'traditional',
        dietaryNotes: 'Sin alergias (Correo de prueba)',
        companionDietary: 'vegetarian',
        companionDietaryNotes: 'Vegetariano',
        songRequest: 'Bailando - Enrique Iglesias',
        message: '¡Este es un correo de prueba desde su Dashboard de Novios!',
        createdAt: new Date().toISOString(),
      };

      const res = await sendRsvpEmailNotification(sampleEntry, settings, true);
      if (res.sent) {
        setTestEmailStatus({
          ok: true,
          msg: `¡Correo enviado a ${settings.notificationEmail}! IMPORTANTE: Si es la primera vez que usas este correo, revisa tu Bandeja de Entrada o Spam y haz clic en el botón "Activate Form" que envía FormSubmit para activar las notificaciones automáticas.`,
        });
      } else {
        setTestEmailStatus({
          ok: false,
          msg: 'No se pudo enviar el correo de prueba. Verifica que el correo esté bien escrito.',
        });
      }
    } finally {
      setTestingEmail(false);
    }
  };

  const handleAddManualGuest = async (e) => {
    e.preventDefault();
    if (!manualGuest.name.trim()) return;
    setAddingManual(true);
    try {
      await submitRsvpEntry(manualGuest);
      await loadData(false);
      setManualGuest({
        name: '',
        attendance: 'yes',
        hasCompanion: false,
        companionName: '',
        dietary: 'traditional',
        dietaryNotes: '',
        companionDietary: 'traditional',
        companionDietaryNotes: '',
        songRequest: '',
        message: '',
      });
      setActiveTab('responses');
    } finally {
      setAddingManual(false);
    }
  };

  const copyDashboardUrl = () => {
    const url = `${window.location.origin}${window.location.pathname}?dashboard=1`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#6e6b41] text-[#FAE7C9] flex items-center justify-center p-4 relative z-20">
        <div className="max-w-md w-full rounded-3xl p-8 bg-[#575432]/95 border-2 border-[#E1C78F]/50 shadow-[0_25px_70px_rgba(40,38,20,0.65)] text-center space-y-6 backdrop-blur-xl">
          <div className="w-16 h-16 rounded-full bg-[#FAE7C9]/15 border border-[#E1C78F]/60 flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-7 h-7 text-[#FAE7C9]" />
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-montserrat uppercase tracking-[0.25em] text-[#E1C78F] font-semibold">
              PANEL EXCLUSIVO DE NOVIOS
            </span>
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FAE7C9]">
              Dashboard Odlan & María Jose
            </h1>
            <p className="font-garamond italic text-base text-[#FAE7C9]/85">
              Ingresa tu clave para ver las confirmaciones de asistencia y configurar tu correo.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                if (pinError) setPinError('');
              }}
              placeholder="Clave de acceso (ej. novios2027)"
              className="w-full px-4 py-3.5 rounded-xl bg-[#464428] border border-[#E1C78F]/45 text-[#FAE7C9] placeholder-[#FAE7C9]/45 text-center font-montserrat text-sm focus:outline-none focus:border-[#FAE7C9]"
            />

            {pinError && (
              <p className="text-xs text-rose-200 bg-rose-950/60 border border-rose-400/40 rounded-lg py-2 px-3">
                {pinError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E1C78F] via-[#FAE7C9] to-[#E1C78F] text-[#3a3820] font-cinzel font-bold text-xs tracking-[0.2em] uppercase shadow-lg hover:brightness-105 transition-all cursor-pointer"
            >
              Entrar al Dashboard
            </button>
          </form>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-montserrat text-[#E1C78F] hover:text-[#FAE7C9] uppercase tracking-widest cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a la Invitación</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#6e6b41] text-[#FAE7C9] py-8 px-4 sm:px-6 md:px-10 relative z-20">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Bar */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#575432]/95 border border-[#E1C78F]/45 shadow-[0_20px_50px_rgba(40,38,20,0.5)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B0926A]/35 border border-[#FAE7C9]/40 text-[#FAE7C9] text-[11px] font-montserrat tracking-[0.2em] uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#E1C78F]" />
              <span>PANEL DE CONTROL • NOVIOS</span>
            </div>
            <h1 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#FAE7C9] tracking-wide">
              Dashboard Odlan & María Jose
            </h1>
            <p className="font-garamond italic text-base sm:text-lg text-[#E1C78F]">
              Revisa en tiempo real las respuestas del formulario RSVP, menús, alergias y notificaciones por correo.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button
              type="button"
              onClick={copyDashboardUrl}
              className="px-4 py-2.5 rounded-full bg-[#464428] hover:bg-[#3c3a22] border border-[#E1C78F]/40 text-[#FAE7C9] text-xs font-montserrat uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
              title="Copiar link directo al Dashboard"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="text-emerald-200">Link Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#E1C78F]" />
                  <span>Link Dashboard</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => loadData(true)}
              disabled={syncing}
              className="px-4 py-2.5 rounded-full bg-[#464428] hover:bg-[#3c3a22] border border-[#E1C78F]/40 text-[#FAE7C9] text-xs font-montserrat uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#E1C78F] ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Sincronizando...' : 'Actualizar'}</span>
            </button>

            <button
              type="button"
              onClick={() => exportRsvpsToCsv(rsvps)}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E1C78F] via-[#FAE7C9] to-[#E1C78F] text-[#3a3820] font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:brightness-105 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Excel (.CSV)</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full bg-[#B0926A]/40 hover:bg-[#B0926A]/60 border border-[#FAE7C9]/40 text-[#FAE7C9] text-xs font-montserrat uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ver Invitación</span>
            </button>
          </div>
        </div>

        {/* Email Alert Banner if not configured yet */}
        {!settings.notificationEmail && (
          <div className="rounded-2xl p-4 sm:p-5 bg-[#B0926A]/35 border-2 border-[#FAE7C9]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
            <div className="flex items-start gap-3 text-left">
              <Mail className="w-6 h-6 text-[#FAE7C9] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#FAE7C9] uppercase tracking-wider">
                  Activa las notificaciones en tu Correo Electrónico
                </h3>
                <p className="font-montserrat text-xs text-[#FAE7C9]/90 mt-0.5">
                  Configura a qué correo quieres que lleguen automáticamente las respuestas cada vez que un invitado confirme su asistencia.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className="px-5 py-2.5 rounded-full bg-[#FAE7C9] text-[#3a3820] font-cinzel font-bold text-xs uppercase tracking-wider shrink-0 hover:bg-[#E1C78F] transition-colors cursor-pointer"
            >
              Configurar Correo Ahora
            </button>
          </div>
        )}

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl p-5 bg-[#575432]/90 border border-[#E1C78F]/40 text-left shadow-md">
            <div className="flex items-center justify-between text-[#E1C78F] mb-2">
              <span className="text-[11px] font-montserrat uppercase tracking-widest font-semibold">
                Total Personas Confirmadas
              </span>
              <UserCheck className="w-5 h-5 text-[#FAE7C9]" />
            </div>
            <div className="font-cinzel text-3xl sm:text-4xl font-bold text-[#FAE7C9]">
              {stats.totalConfirmedPeople}
            </div>
            <div className="text-xs font-montserrat text-[#E1C78F]/90 mt-1">
              En {stats.attendingResponses} pase(s) que asisten
            </div>
          </div>

          <div className="rounded-2xl p-5 bg-[#575432]/90 border border-[#E1C78F]/40 text-left shadow-md">
            <div className="flex items-center justify-between text-[#E1C78F] mb-2">
              <span className="text-[11px] font-montserrat uppercase tracking-widest font-semibold">
                Formularios Recibidos
              </span>
              <Users className="w-5 h-5 text-[#E1C78F]" />
            </div>
            <div className="font-cinzel text-3xl sm:text-4xl font-bold text-[#FAE7C9]">
              {stats.totalResponses}
            </div>
            <div className="text-xs font-montserrat text-[#E1C78F]/90 mt-1">
              Respuestas totales registradas
            </div>
          </div>

          <div className="rounded-2xl p-5 bg-[#575432]/90 border border-[#E1C78F]/40 text-left shadow-md">
            <div className="flex items-center justify-between text-[#E1C78F] mb-2">
              <span className="text-[11px] font-montserrat uppercase tracking-widest font-semibold">
                No Podrán Asistir
              </span>
              <UserX className="w-5 h-5 text-rose-300" />
            </div>
            <div className="font-cinzel text-3xl sm:text-4xl font-bold text-[#FAE7C9]">
              {stats.declinedResponses}
            </div>
            <div className="text-xs font-montserrat text-[#E1C78F]/90 mt-1">
              Ausencias notificadas
            </div>
          </div>

          <div className="rounded-2xl p-5 bg-[#575432]/90 border border-[#E1C78F]/40 text-left shadow-md">
            <div className="flex items-center justify-between text-[#E1C78F] mb-2">
              <span className="text-[11px] font-montserrat uppercase tracking-widest font-semibold">
                Alergias / Notas Menú
              </span>
              <Utensils className="w-5 h-5 text-[#FAE7C9]" />
            </div>
            <div className="font-cinzel text-3xl sm:text-4xl font-bold text-[#FAE7C9]">
              {stats.allergiesCount}
            </div>
            <div className="text-xs font-montserrat text-[#E1C78F]/90 mt-1">
              Personas con requerimiento especial
            </div>
          </div>
        </div>

        {/* Catering Menu Breakdown Bar */}
        <div className="rounded-2xl p-5 bg-[#4e4b2c]/90 border border-[#E1C78F]/35 shadow-md">
          <div className="flex items-center gap-2 text-xs font-montserrat uppercase tracking-widest text-[#E1C78F] mb-3 font-semibold">
            <Utensils className="w-4 h-4" />
            <span>Conteo de Platos para Banquetería (Titulares + Acompañantes Confirmados)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-[#6e6b41]/60 border border-[#FAE7C9]/25">
              <span className="text-xs font-montserrat text-[#E1C78F] block">Tradicional Gala</span>
              <span className="font-cinzel text-2xl font-bold text-[#FAE7C9]">{stats.menus.traditional}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#6e6b41]/60 border border-[#FAE7C9]/25">
              <span className="text-xs font-montserrat text-[#E1C78F] block">Vegetariano</span>
              <span className="font-cinzel text-2xl font-bold text-[#FAE7C9]">{stats.menus.vegetarian}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#6e6b41]/60 border border-[#FAE7C9]/25">
              <span className="text-xs font-montserrat text-[#E1C78F] block">Vegano</span>
              <span className="font-cinzel text-2xl font-bold text-[#FAE7C9]">{stats.menus.vegan}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#6e6b41]/60 border border-[#FAE7C9]/25">
              <span className="text-xs font-montserrat text-[#E1C78F] block">Sin Gluten (Celíaco)</span>
              <span className="font-cinzel text-2xl font-bold text-[#FAE7C9]">{stats.menus.celiac}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-3 border-b border-[#E1C78F]/30 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('responses')}
            className={`px-5 py-2.5 rounded-full font-cinzel text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'responses'
                ? 'bg-[#FAE7C9] text-[#3a3820] shadow-md'
                : 'bg-[#575432]/80 text-[#FAE7C9] hover:bg-[#575432]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Respuestas de Invitados ({rsvps.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('add')}
            className={`px-5 py-2.5 rounded-full font-cinzel text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'add'
                ? 'bg-[#FAE7C9] text-[#3a3820] shadow-md'
                : 'bg-[#575432]/80 text-[#FAE7C9] hover:bg-[#575432]'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Invitado Manual</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-2.5 rounded-full font-cinzel text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-[#FAE7C9] text-[#3a3820] shadow-md'
                : 'bg-[#575432]/80 text-[#FAE7C9] hover:bg-[#575432]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Configurar Correo & Enlaces</span>
          </button>
        </div>

        {/* TAB 1: GUEST RESPONSES LIST */}
        {activeTab === 'responses' && (
          <div className="space-y-5">
            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#E1C78F] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nombre de invitado, acompañante, canción o mensaje..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#575432]/90 border border-[#E1C78F]/40 text-[#FAE7C9] placeholder-[#FAE7C9]/50 text-xs sm:text-sm font-montserrat focus:outline-none focus:border-[#FAE7C9]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', label: 'Todos' },
                  { id: 'yes', label: 'Asistirán' },
                  { id: 'no', label: 'No Asistirán' },
                  { id: 'allergies', label: 'Con Alergias' },
                  { id: 'songs', label: 'Con Canción' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilterMode(f.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-montserrat uppercase tracking-wider transition-all cursor-pointer border ${
                      filterMode === f.id
                        ? 'bg-[#E1C78F] text-[#3a3820] border-[#FAE7C9] font-bold'
                        : 'bg-[#575432]/70 text-[#FAE7C9] border-[#E1C78F]/30 hover:border-[#FAE7C9]/60'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="rounded-3xl p-12 bg-[#575432]/80 border border-[#E1C78F]/35 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-[#E1C78F] animate-spin mx-auto" />
                <p className="font-montserrat text-sm text-[#FAE7C9]">
                  Cargando respuestas de invitados desde la nube...
                </p>
              </div>
            ) : filteredRsvps.length === 0 ? (
              <div className="rounded-3xl p-12 bg-[#575432]/85 border border-[#E1C78F]/35 text-center space-y-3">
                <Heart className="w-10 h-10 text-[#E1C78F] mx-auto opacity-80" />
                <h3 className="font-cinzel text-xl font-bold text-[#FAE7C9]">
                  {rsvps.length === 0
                    ? 'Aún no hay confirmaciones registradas'
                    : 'No se encontraron resultados para tu filtro'}
                </h3>
                <p className="font-montserrat text-xs sm:text-sm text-[#E1C78F] max-w-md mx-auto">
                  {rsvps.length === 0
                    ? 'Cuando tus invitados completen el formulario "Confirma Tu Asistencia" en la página, aparecerán automáticamente aquí y en tu correo.'
                    : 'Prueba cambiando los filtros de búsqueda.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRsvps.map((item) => {
                  const isYes = item.attendance === 'yes';
                  const seats = isYes ? (item.hasCompanion ? 2 : 1) : 0;
                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl p-5 sm:p-6 bg-[#575432]/95 border border-[#E1C78F]/40 shadow-lg text-left transition-all hover:border-[#FAE7C9]/70"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E1C78F]/25 pb-3.5 mb-4">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-montserrat uppercase tracking-wider font-bold border ${
                              isYes
                                ? 'bg-emerald-900/70 border-emerald-300/60 text-emerald-200'
                                : 'bg-rose-900/70 border-rose-300/60 text-rose-200'
                            }`}
                          >
                            {isYes ? `✓ Asistirá (${seats} ${seats === 1 ? 'cupo' : 'cupos'})` : '✕ No Asistirá'}
                          </span>

                          <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#FAE7C9]">
                            {item.name}
                          </h3>

                          {item.hasCompanion && (
                            <span className="px-2.5 py-0.5 rounded-full bg-[#B0926A]/45 border border-[#FAE7C9]/35 text-[11px] font-montserrat text-[#FAE7C9]">
                              + Acompañante: <strong>{item.companionName || 'Asignado'}</strong>
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-xs font-montserrat text-[#E1C78F]/85">
                          <span>
                            {item.createdAt
                              ? new Date(item.createdAt).toLocaleDateString('es-CL', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              : 'Reciente'}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id, item.name)}
                            className="p-2 rounded-lg bg-rose-950/50 hover:bg-rose-900/80 text-rose-200 border border-rose-400/30 transition-colors cursor-pointer"
                            title="Eliminar registro"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-montserrat">
                        {isYes && (
                          <div className="p-3.5 rounded-xl bg-[#464428]/90 border border-[#E1C78F]/25 space-y-1.5">
                            <div className="text-[#E1C78F] uppercase tracking-wider font-semibold text-[11px] flex items-center gap-1.5">
                              <Utensils className="w-3.5 h-3.5" />
                              <span>Menú Titular ({item.name})</span>
                            </div>
                            <div className="text-[#FAE7C9] font-semibold text-sm">
                              {getDietLabel(item.dietary)}
                            </div>
                            {item.dietaryNotes && (
                              <div className="text-amber-200 bg-amber-950/60 border border-amber-400/40 rounded-lg px-2.5 py-1 text-[11px]">
                                ⚠️ Alergias / Notas: {item.dietaryNotes}
                              </div>
                            )}
                          </div>
                        )}

                        {isYes && item.hasCompanion && (
                          <div className="p-3.5 rounded-xl bg-[#464428]/90 border border-[#E1C78F]/25 space-y-1.5">
                            <div className="text-[#E1C78F] uppercase tracking-wider font-semibold text-[11px] flex items-center gap-1.5">
                              <Utensils className="w-3.5 h-3.5" />
                              <span>Menú Acompañante ({item.companionName || 'Acompañante'})</span>
                            </div>
                            <div className="text-[#FAE7C9] font-semibold text-sm">
                              {getDietLabel(item.companionDietary)}
                            </div>
                            {item.companionDietaryNotes && (
                              <div className="text-amber-200 bg-amber-950/60 border border-amber-400/40 rounded-lg px-2.5 py-1 text-[11px]">
                                ⚠️ Alergias / Notas: {item.companionDietaryNotes}
                              </div>
                            )}
                          </div>
                        )}

                        {item.songRequest && (
                          <div className="p-3.5 rounded-xl bg-[#464428]/70 border border-[#E1C78F]/20 flex items-start gap-2.5">
                            <Music className="w-4 h-4 text-[#E1C78F] shrink-0 mt-0.5" />
                            <div>
                              <span className="text-[10px] uppercase tracking-widest text-[#E1C78F] block">
                                Canción infaltable para la fiesta:
                              </span>
                              <span className="text-[#FAE7C9] font-medium italic font-garamond text-base">
                                "{item.songRequest}"
                              </span>
                            </div>
                          </div>
                        )}

                        {item.message && (
                          <div className="p-3.5 rounded-xl bg-[#464428]/70 border border-[#E1C78F]/20 flex items-start gap-2.5">
                            <MessageSquare className="w-4 h-4 text-[#E1C78F] shrink-0 mt-0.5" />
                            <div>
                              <span className="text-[10px] uppercase tracking-widest text-[#E1C78F] block">
                                Mensaje para Odlan & María Jose:
                              </span>
                              <p className="text-[#FAE7C9] italic font-garamond text-base leading-snug">
                                "{item.message}"
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ADD MANUAL GUEST */}
        {activeTab === 'add' && (
          <div className="rounded-3xl p-6 sm:p-8 bg-[#575432]/95 border border-[#E1C78F]/45 shadow-xl text-left max-w-2xl mx-auto">
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FAE7C9] mb-1">
              Agregar Confirmación Manualmente
            </h2>
            <p className="font-montserrat text-xs text-[#E1C78F] mb-6">
              Úsalo si algún invitado o familiar les confirmó por teléfono o en persona para mantener su lista y conteo de platos al día.
            </p>

            <form onSubmit={handleAddManualGuest} className="space-y-4 font-montserrat text-xs">
              <div>
                <label className="block text-[#FAE7C9] uppercase tracking-wider mb-1.5 font-semibold">
                  Nombre y Apellido del Invitado *
                </label>
                <input
                  type="text"
                  required
                  value={manualGuest.name}
                  onChange={(e) => setManualGuest({ ...manualGuest, name: e.target.value })}
                  placeholder="Ej. Tía Carmen Soto"
                  className="w-full px-4 py-3 rounded-xl bg-[#464428] border border-[#E1C78F]/40 text-[#FAE7C9] focus:outline-none focus:border-[#FAE7C9]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#FAE7C9] uppercase tracking-wider mb-1.5 font-semibold">
                    ¿Asistirá?
                  </label>
                  <select
                    value={manualGuest.attendance}
                    onChange={(e) => setManualGuest({ ...manualGuest, attendance: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#464428] border border-[#E1C78F]/40 text-[#FAE7C9] focus:outline-none"
                  >
                    <option value="yes">Sí Asistirá</option>
                    <option value="no">No Podrá Asistir</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#FAE7C9] uppercase tracking-wider mb-1.5 font-semibold">
                    Modalidad de Pase
                  </label>
                  <select
                    value={manualGuest.hasCompanion ? 'double' : 'single'}
                    onChange={(e) =>
                      setManualGuest({ ...manualGuest, hasCompanion: e.target.value === 'double' })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#464428] border border-[#E1C78F]/40 text-[#FAE7C9] focus:outline-none"
                  >
                    <option value="single">Pase Individual (1 cupo)</option>
                    <option value="double">Con Acompañante (2 cupos)</option>
                  </select>
                </div>
              </div>

              {manualGuest.attendance === 'yes' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#FAE7C9] uppercase tracking-wider mb-1.5 font-semibold">
                      Menú Titular
                    </label>
                    <select
                      value={manualGuest.dietary}
                      onChange={(e) => setManualGuest({ ...manualGuest, dietary: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#464428] border border-[#E1C78F]/40 text-[#FAE7C9] focus:outline-none"
                    >
                      <option value="traditional">Tradicional Gala</option>
                      <option value="vegetarian">Vegetariano</option>
                      <option value="vegan">Vegano</option>
                      <option value="celiac">Sin Gluten</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#FAE7C9] uppercase tracking-wider mb-1.5 font-semibold">
                      Alergias Titular (Opcional)
                    </label>
                    <input
                      type="text"
                      value={manualGuest.dietaryNotes}
                      onChange={(e) => setManualGuest({ ...manualGuest, dietaryNotes: e.target.value })}
                      placeholder="Ej. Sin mariscos"
                      className="w-full px-4 py-3 rounded-xl bg-[#464428] border border-[#E1C78F]/40 text-[#FAE7C9]"
                    />
                  </div>
                </div>
              )}

              {manualGuest.attendance === 'yes' && manualGuest.hasCompanion && (
                <div className="p-4 rounded-2xl bg-[#464428]/70 border border-[#E1C78F]/30 space-y-3">
                  <div>
                    <label className="block text-[#FAE7C9] uppercase tracking-wider mb-1.5 font-semibold">
                      Nombre del Acompañante
                    </label>
                    <input
                      type="text"
                      value={manualGuest.companionName}
                      onChange={(e) =>
                        setManualGuest({ ...manualGuest, companionName: e.target.value })
                      }
                      placeholder="Nombre y Apellido del acompañante"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#38361f] border border-[#E1C78F]/40 text-[#FAE7C9]"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#FAE7C9] uppercase tracking-wider mb-1 font-semibold">
                        Menú Acompañante
                      </label>
                      <select
                        value={manualGuest.companionDietary}
                        onChange={(e) =>
                          setManualGuest({ ...manualGuest, companionDietary: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-xl bg-[#38361f] border border-[#E1C78F]/40 text-[#FAE7C9]"
                      >
                        <option value="traditional">Tradicional Gala</option>
                        <option value="vegetarian">Vegetariano</option>
                        <option value="vegan">Vegano</option>
                        <option value="celiac">Sin Gluten</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#FAE7C9] uppercase tracking-wider mb-1 font-semibold">
                        Alergias Acompañante
                      </label>
                      <input
                        type="text"
                        value={manualGuest.companionDietaryNotes}
                        onChange={(e) =>
                          setManualGuest({
                            ...manualGuest,
                            companionDietaryNotes: e.target.value,
                          })
                        }
                        placeholder="Opcional"
                        className="w-full px-3 py-2.5 rounded-xl bg-[#38361f] border border-[#E1C78F]/40 text-[#FAE7C9]"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[#FAE7C9] uppercase tracking-wider mb-1.5 font-semibold">
                  Nota o Mensaje (Opcional)
                </label>
                <input
                  type="text"
                  value={manualGuest.message}
                  onChange={(e) => setManualGuest({ ...manualGuest, message: e.target.value })}
                  placeholder="Confirmado por WhatsApp / Teléfono"
                  className="w-full px-4 py-3 rounded-xl bg-[#464428] border border-[#E1C78F]/40 text-[#FAE7C9]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={addingManual}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E1C78F] via-[#FAE7C9] to-[#E1C78F] text-[#3a3820] font-cinzel font-bold text-xs uppercase tracking-[0.2em] shadow-lg cursor-pointer disabled:opacity-50"
                >
                  {addingManual ? 'Guardando...' : 'Guardar Invitado en el Dashboard'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: EMAIL & SETTINGS */}
        {activeTab === 'settings' && (
          <div className="rounded-3xl p-6 sm:p-8 bg-[#575432]/95 border border-[#E1C78F]/45 shadow-xl text-left max-w-3xl mx-auto space-y-6">
            <div>
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FAE7C9] mb-1">
                Configuración de Correo Electrónico y Enlaces
              </h2>
              <p className="font-montserrat text-xs sm:text-sm text-[#E1C78F]">
                Cada vez que un invitado confirme su asistencia en la página web, se guardará en este Dashboard y además se enviará un correo automático con todos sus datos.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5 font-montserrat text-xs">
              <div className="p-5 rounded-2xl bg-[#464428]/90 border border-[#E1C78F]/35 space-y-4">
                <div className="flex items-center gap-2 text-[#FAE7C9] font-semibold uppercase tracking-wider text-xs">
                  <Mail className="w-4 h-4 text-[#E1C78F]" />
                  <span>Notificaciones por Correo Electrónico</span>
                </div>

                <div>
                  <label className="block text-[#FAE7C9] uppercase tracking-wider mb-1.5 font-medium">
                    Correo Principal de los Novios *
                  </label>
                  <input
                    type="email"
                    value={settings.notificationEmail || ''}
                    onChange={(e) =>
                      setSettings({ ...settings, notificationEmail: e.target.value })
                    }
                    placeholder="ejemplo@gmail.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#38361f] border border-[#E1C78F]/45 text-[#FAE7C9] placeholder-[#FAE7C9]/40 focus:outline-none focus:border-[#FAE7C9] text-sm"
                  />
                  <p className="text-[11px] text-[#E1C78F]/85 mt-1">
                    A este correo llegarán todas las respuestas del formulario RSVP.
                  </p>
                </div>

                <div>
                  <label className="block text-[#FAE7C9] uppercase tracking-wider mb-1.5 font-medium">
                    Segundo Correo en Copia (CC) — Opcional
                  </label>
                  <input
                    type="email"
                    value={settings.ccEmail || ''}
                    onChange={(e) => setSettings({ ...settings, ccEmail: e.target.value })}
                    placeholder="segundocorreo@gmail.com (para que les llegue a ambos)"
                    className="w-full px-4 py-3 rounded-xl bg-[#38361f] border border-[#E1C78F]/45 text-[#FAE7C9] placeholder-[#FAE7C9]/40 focus:outline-none focus:border-[#FAE7C9] text-sm"
                  />
                </div>

                {/* Test Email Button */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSendTestEmail}
                    disabled={testingEmail}
                    className="px-5 py-2.5 rounded-full bg-[#B0926A] hover:bg-[#c2a378] text-[#fffaf0] font-montserrat font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {testingEmail ? 'Enviando correo de prueba...' : 'Enviar Correo de Prueba (1 Clic)'}
                    </span>
                  </button>
                </div>

                {testEmailStatus && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                      testEmailStatus.ok
                        ? 'bg-emerald-950/70 border-emerald-400/50 text-emerald-100'
                        : 'bg-rose-950/70 border-rose-400/50 text-rose-100'
                    }`}
                  >
                    {testEmailStatus.ok ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
                    )}
                    <span className="leading-relaxed">{testEmailStatus.msg}</span>
                  </div>
                )}
              </div>

              <div className="p-5 rounded-2xl bg-[#464428]/90 border border-[#E1C78F]/35 space-y-4">
                <div className="text-[#FAE7C9] font-semibold uppercase tracking-wider text-xs">
                  Datos Adicionales de la Página
                </div>

                <div>
                  <label className="block text-[#FAE7C9] uppercase tracking-wider mb-1.5 font-medium">
                    Número de WhatsApp para Confirmaciones (con código 569...)
                  </label>
                  <input
                    type="text"
                    value={settings.whatsappPhone || ''}
                    onChange={(e) => setSettings({ ...settings, whatsappPhone: e.target.value })}
                    placeholder="56982375963"
                    className="w-full px-4 py-3 rounded-xl bg-[#38361f] border border-[#E1C78F]/40 text-[#FAE7C9] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#FAE7C9] uppercase tracking-wider mb-1.5 font-medium">
                    Enlace de Carpeta Google Drive (Álbum QR de Fotos)
                  </label>
                  <input
                    type="url"
                    value={settings.driveUrl || ''}
                    onChange={(e) => setSettings({ ...settings, driveUrl: e.target.value })}
                    placeholder="https://drive.google.com/drive/folders/..."
                    className="w-full px-4 py-3 rounded-xl bg-[#38361f] border border-[#E1C78F]/40 text-[#FAE7C9] text-sm"
                  />
                </div>
              </div>

              {settingsStatus && (
                <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-400/50 text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>{settingsStatus}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={savingSettings}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#E1C78F] via-[#FAE7C9] to-[#E1C78F] text-[#3a3820] font-cinzel font-bold text-xs sm:text-sm uppercase tracking-[0.2em] shadow-lg hover:brightness-105 transition-all cursor-pointer disabled:opacity-50"
              >
                {savingSettings ? 'Guardando en la Nube...' : 'Guardar Configuración'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
