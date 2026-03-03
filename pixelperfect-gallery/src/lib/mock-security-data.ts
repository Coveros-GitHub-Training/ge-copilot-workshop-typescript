export type AuditEventType =
  | 'login_success'
  | 'login_failed'
  | 'logout'
  | 'photo_deleted'
  | 'gallery_created'
  | 'gallery_deleted'
  | 'settings_changed'
  | 'password_changed'
  | 'access_denied';

export type AuditSeverity = 'info' | 'warning' | 'critical';

export interface AuditEvent {
  id: string;
  type: AuditEventType;
  severity: AuditSeverity;
  user: string;
  ipAddress: string;
  location: string;
  description: string;
  timestamp: string;
}

export interface ActiveSession {
  id: string;
  user: string;
  ipAddress: string;
  location: string;
  device: string;
  browser: string;
  startedAt: string;
  lastActive: string;
  current: boolean;
}

export interface SecurityAlert {
  id: string;
  severity: AuditSeverity;
  title: string;
  description: string;
  recommendation: string;
}

export const auditEvents: AuditEvent[] = [
  {
    id: '1',
    type: 'login_failed',
    severity: 'critical',
    user: 'admin@gallery.com',
    ipAddress: '185.220.101.42',
    location: 'Unknown — TOR Exit Node',
    description: 'Failed login attempt — incorrect password (attempt 5 of 5)',
    timestamp: '2026-03-03T16:47:12Z',
  },
  {
    id: '2',
    type: 'login_success',
    severity: 'info',
    user: 'admin@gallery.com',
    ipAddress: '74.125.200.18',
    location: 'New York, NY, US',
    description: 'Successful login via password',
    timestamp: '2026-03-03T14:30:01Z',
  },
  {
    id: '3',
    type: 'settings_changed',
    severity: 'warning',
    user: 'admin@gallery.com',
    ipAddress: '74.125.200.18',
    location: 'New York, NY, US',
    description: 'Gallery visibility changed from Private to Public: "Wedding - Sarah & John"',
    timestamp: '2026-03-03T14:35:44Z',
  },
  {
    id: '4',
    type: 'photo_deleted',
    severity: 'warning',
    user: 'admin@gallery.com',
    ipAddress: '74.125.200.18',
    location: 'New York, NY, US',
    description: '3 photos permanently deleted from "Corporate Headshots"',
    timestamp: '2026-03-03T14:52:20Z',
  },
  {
    id: '5',
    type: 'access_denied',
    severity: 'warning',
    user: 'guest',
    ipAddress: '203.0.113.55',
    location: 'London, UK',
    description: 'Unauthorized access attempt to /admin — redirected to login',
    timestamp: '2026-03-03T13:10:09Z',
  },
  {
    id: '6',
    type: 'gallery_created',
    severity: 'info',
    user: 'admin@gallery.com',
    ipAddress: '74.125.200.18',
    location: 'New York, NY, US',
    description: 'New gallery created: "Spring Portraits 2026"',
    timestamp: '2026-03-03T11:05:33Z',
  },
  {
    id: '7',
    type: 'login_failed',
    severity: 'warning',
    user: 'admin@gallery.com',
    ipAddress: '198.51.100.77',
    location: 'Frankfurt, DE',
    description: 'Failed login attempt — incorrect password (attempt 2 of 5)',
    timestamp: '2026-03-02T22:18:45Z',
  },
  {
    id: '8',
    type: 'password_changed',
    severity: 'warning',
    user: 'admin@gallery.com',
    ipAddress: '74.125.200.18',
    location: 'New York, NY, US',
    description: 'Account password changed successfully',
    timestamp: '2026-03-02T09:44:00Z',
  },
  {
    id: '9',
    type: 'logout',
    severity: 'info',
    user: 'admin@gallery.com',
    ipAddress: '74.125.200.18',
    location: 'New York, NY, US',
    description: 'User signed out',
    timestamp: '2026-03-01T18:00:00Z',
  },
  {
    id: '10',
    type: 'login_success',
    severity: 'info',
    user: 'admin@gallery.com',
    ipAddress: '74.125.200.18',
    location: 'New York, NY, US',
    description: 'Successful login via password',
    timestamp: '2026-03-01T09:01:55Z',
  },
];

export const activeSessions: ActiveSession[] = [
  {
    id: 'sess_1',
    user: 'admin@gallery.com',
    ipAddress: '74.125.200.18',
    location: 'New York, NY, US',
    device: 'Desktop',
    browser: 'Chrome 122',
    startedAt: '2026-03-03T14:30:01Z',
    lastActive: '2026-03-03T16:49:00Z',
    current: true,
  },
  {
    id: 'sess_2',
    user: 'admin@gallery.com',
    ipAddress: '17.253.144.10',
    location: 'San Francisco, CA, US',
    device: 'Mobile',
    browser: 'Safari 17',
    startedAt: '2026-03-02T08:15:00Z',
    lastActive: '2026-03-02T20:30:00Z',
    current: false,
  },
];

export const securityAlerts: SecurityAlert[] = [
  {
    id: 'alert_1',
    severity: 'critical',
    title: 'Brute-force login attempt detected',
    description:
      '5 consecutive failed login attempts were made from IP 185.220.101.42 (TOR exit node) in the last hour.',
    recommendation:
      'Consider enabling account lockout after failed attempts and blocking known TOR exit-node IP ranges.',
  },
  {
    id: 'alert_2',
    severity: 'warning',
    title: 'Two-factor authentication not enabled',
    description: 'Your admin account does not have 2FA enabled, making it easier for attackers to gain access.',
    recommendation: 'Enable two-factor authentication (TOTP) to protect your admin account.',
  },
  {
    id: 'alert_3',
    severity: 'warning',
    title: 'Stale session detected',
    description: 'A session from San Francisco, CA was last active over 20 hours ago and has not been revoked.',
    recommendation: 'Review and revoke any sessions you do not recognise.',
  },
];
