'use client';

import { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  ShieldOff,
  LogIn,
  LogOut,
  AlertTriangle,
  XCircle,
  Trash2,
  KeyRound,
  FolderPlus,
  FolderMinus,
  Settings2,
  Monitor,
  Smartphone,
  MapPin,
  Clock,
  Globe,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { Hero, SectionContainer, SectionTitle } from '@/components/ui';
import {
  auditEvents,
  activeSessions,
  securityAlerts,
  AuditEvent,
  AuditSeverity,
  AuditEventType,
} from '@/lib/mock-security-data';

// ── helpers ────────────────────────────────────────────────────────────────

function formatTimestamp(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

const EVENT_ICON: Record<AuditEventType, React.ElementType> = {
  login_success: LogIn,
  login_failed: XCircle,
  logout: LogOut,
  photo_deleted: Trash2,
  gallery_created: FolderPlus,
  gallery_deleted: FolderMinus,
  settings_changed: Settings2,
  password_changed: KeyRound,
  access_denied: ShieldOff,
};

const EVENT_LABEL: Record<AuditEventType, string> = {
  login_success: 'Login success',
  login_failed: 'Login failed',
  logout: 'Logout',
  photo_deleted: 'Photo deleted',
  gallery_created: 'Gallery created',
  gallery_deleted: 'Gallery deleted',
  settings_changed: 'Settings changed',
  password_changed: 'Password changed',
  access_denied: 'Access denied',
};

const SEVERITY_STYLES: Record<AuditSeverity, string> = {
  info: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
  warning: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
  critical: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
};

const SEVERITY_ICON: Record<AuditSeverity, React.ElementType> = {
  info: CheckCircle,
  warning: AlertTriangle,
  critical: AlertCircle,
};

const ALERT_BORDER: Record<AuditSeverity, string> = {
  info: 'border-blue-400',
  warning: 'border-amber-400',
  critical: 'border-red-500',
};

// ── sub-components ─────────────────────────────────────────────────────────

function AuditRow({ event }: { event: AuditEvent }) {
  const Icon = EVENT_ICON[event.type];
  const SevIcon = SEVERITY_ICON[event.severity];
  return (
    <tr className="table-row">
      <td className="py-3 px-4">
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${SEVERITY_STYLES[event.severity]}`}>
          <SevIcon className="h-3 w-3" />
          {event.severity}
        </span>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          <Icon className="h-4 w-4 flex-shrink-0 text-slate-400" />
          {EVENT_LABEL[event.type]}
        </div>
      </td>
      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400 max-w-xs">
        {event.description}
      </td>
      <td className="py-3 px-4">
        <div className="text-xs text-slate-500 dark:text-slate-400 space-y-0.5">
          <div className="flex items-center gap-1"><Globe className="h-3 w-3" />{event.ipAddress}</div>
          <div className="flex items-center gap-1"><MapPin className="h-3 w-3" />{event.location}</div>
        </div>
      </td>
      <td className="py-3 px-4 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {formatTimestamp(event.timestamp)}
        </div>
      </td>
    </tr>
  );
}

// ── page ───────────────────────────────────────────────────────────────────

type SeverityFilter = 'all' | AuditSeverity;

export default function SecurityPage() {
  const [filter, setFilter] = useState<SeverityFilter>('all');

  const criticalCount = auditEvents.filter(e => e.severity === 'critical').length;
  const warningCount  = auditEvents.filter(e => e.severity === 'warning').length;
  const infoCount     = auditEvents.filter(e => e.severity === 'info').length;

  const filtered = filter === 'all' ? auditEvents : auditEvents.filter(e => e.severity === filter);

  const FILTER_TABS: { key: SeverityFilter; label: string; count: number }[] = [
    { key: 'all',      label: 'All Events',  count: auditEvents.length },
    { key: 'critical', label: 'Critical',    count: criticalCount },
    { key: 'warning',  label: 'Warning',     count: warningCount },
    { key: 'info',     label: 'Info',        count: infoCount },
  ];

  return (
    <div className="page-gradient">
      <Hero
        title="Security Audit Log"
        description="Monitor login activity, admin actions, and access events across your gallery."
      />

      <SectionContainer>
        {/* Back link */}
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm nav-link-active mb-6">
          ← Back to Admin Dashboard
        </Link>

        {/* Security Alerts ─────────────────────────────────────────────── */}
        {securityAlerts.length > 0 && (
          <>
            <SectionTitle title="Security Alerts" />
            <div className="space-y-4 mb-10">
              {securityAlerts.map(alert => {
                const AlertIcon = SEVERITY_ICON[alert.severity];
                return (
                  <div
                    key={alert.id}
                    className={`card-base p-5 border-l-4 ${ALERT_BORDER[alert.severity]}`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertIcon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                        alert.severity === 'critical' ? 'text-red-500' :
                        alert.severity === 'warning'  ? 'text-amber-500' :
                        'text-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 dark:text-white mb-1">{alert.title}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{alert.description}</p>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">Recommendation: </span>
                          {alert.recommendation}
                        </p>
                      </div>
                      <span className={`status-badge ${
                        alert.severity === 'critical' ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300' :
                        alert.severity === 'warning'  ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' :
                        'status-active'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Stats row ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Events',    value: auditEvents.length,   icon: ShieldCheck,   color: 'icon-container-blue',   iconColor: 'icon-blue' },
            { label: 'Critical',        value: criticalCount,        icon: ShieldAlert,   color: 'icon-container-red',    iconColor: 'icon-red' },
            { label: 'Warnings',        value: warningCount,         icon: AlertTriangle, color: 'icon-container-orange', iconColor: 'icon-orange' },
            { label: 'Active Sessions', value: activeSessions.length, icon: Monitor,      color: 'icon-container-green',  iconColor: 'icon-green' },
          ].map((stat, i) => (
            <div key={i} className="card-stats flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{stat.value}</p>
              </div>
              <div className={stat.color}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Active Sessions ─────────────────────────────────────────────── */}
        <SectionTitle title="Active Sessions" />
        <div className="card-base overflow-hidden mb-10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                  {['User', 'Device / Browser', 'IP & Location', 'Started', 'Last Active', ''].map(h => (
                    <th key={h} className="text-left py-3 px-4 font-medium text-slate-700 dark:text-slate-300 text-sm">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeSessions.map(session => {
                  const DeviceIcon = session.device === 'Mobile' ? Smartphone : Monitor;
                  return (
                    <tr key={session.id} className="table-row">
                      <td className="py-3 px-4">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{session.user}</p>
                        {session.current && (
                          <span className="status-badge status-active mt-1">current</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                          <DeviceIcon className="h-4 w-4" />
                          {session.device} · {session.browser}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-500 dark:text-slate-400 space-y-0.5">
                        <div className="flex items-center gap-1"><Globe className="h-3 w-3" />{session.ipAddress}</div>
                        <div className="flex items-center gap-1"><MapPin className="h-3 w-3" />{session.location}</div>
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-500 dark:text-slate-400">
                        {formatTimestamp(session.startedAt)}
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-500 dark:text-slate-400">
                        {formatTimestamp(session.lastActive)}
                      </td>
                      <td className="py-3 px-4">
                        {!session.current && (
                          <button className="btn-icon btn-icon-danger" title="Revoke session">
                            <XCircle className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Log ───────────────────────────────────────────────────── */}
        <SectionTitle title="Audit Log" />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {FILTER_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                filter === tab.key
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-blue-400'
              }`}
            >
              {tab.label}
              <span className={`text-xs rounded-full px-1.5 py-0.5 ${
                filter === tab.key
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="card-base overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                  {['Severity', 'Event', 'Description', 'IP & Location', 'Time'].map(h => (
                    <th key={h} className="text-left py-3 px-4 font-medium text-slate-700 dark:text-slate-300 text-sm">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(event => (
                  <AuditRow key={event.id} event={event} />
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-slate-400 dark:text-slate-500 text-sm">
              No events match this filter.
            </div>
          )}
        </div>
      </SectionContainer>
    </div>
  );
}
