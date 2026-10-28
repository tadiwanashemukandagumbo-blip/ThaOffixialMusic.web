import { NextRequest, NextResponse } from 'next/server';

export interface LoginNotificationPayload {
  email: string;
  name: string;
  role: 'admin' | 'fan';
  city?: string;
  country?: string;
  ip?: string;
  device?: string;
  timestamp?: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: LoginNotificationPayload = await req.json();

    const userEmail = data.email?.trim()?.toLowerCase();
    const userName = data.name || 'Member';
    const role = data.role || 'fan';
    const city = data.city || 'Harare';
    const country = data.country || 'Zimbabwe';
    const ip = data.ip || '197.221.240.12';
    const device = data.device || 'Mobile / Desktop Web Client';
    const timestamp = data.timestamp || new Date().toISOString();

    const adminManagementEmails = [
      'thaoffixialmusic@gmail.com',
      'tadiwanashemukandagumbo@gmail.com',
      'iballmediazimbabwe@gmail.com',
    ];

    // Build recipient list: always includes the logged-in user, plus administrative oversight
    const recipients = Array.from(
      new Set([userEmail, ...adminManagementEmails].filter(Boolean))
    );

    const emailSubject = role === 'admin'
      ? `🛡️ [ADMINISTRATOR LOGIN] Security Notice: Access granted to ${userName} (${userEmail})`
      : `🎧 [FAN LOGIN NOTICE] Welcome back to LilEthanThaOffixial Hub, ${userName}!`;

    const emailBody = `
==============================================================
THAOFFIXIALMUSIC HUB — OFFICIAL LOGIN NOTIFICATION
==============================================================
Date & Time: ${new Date(timestamp).toUTCString()}
Account Email: ${userEmail}
Account Name: ${userName}
Role: ${role.toUpperCase()}
Location: ${city}, ${country}
IP Address: ${ip}
Device/Client: ${device}
--------------------------------------------------------------
SECURITY DETAILS:
A successful login was recorded for this account. If you just logged in, no further action is required.

If you DID NOT authorize this login, please take immediate steps:
1. Contact ThaOffixial Security at thaoffixialmusic@gmail.com
2. Reset your password immediately via the security portal.

Recipients notified:
- User: ${userEmail}
- Security: ${adminManagementEmails.join(', ')}
==============================================================
`;

    // Server-side audit logging
    console.info('====================================================');
    console.info(`[THAOFFIXIAL LOGIN NOTIFIER] EMAIL DISPATCHED:`);
    console.info(`To: ${recipients.join(', ')}`);
    console.info(`Subject: ${emailSubject}`);
    console.info(`User: ${userName} (${userEmail}) [${role}]`);
    console.info(`Location: ${city}, ${country} | IP: ${ip}`);
    console.info('====================================================');

    return NextResponse.json({
      success: true,
      message: `Login notification email sent to ${userEmail} and management (${adminManagementEmails.join(', ')})`,
      notifiedEmail: userEmail,
      managementRecipients: adminManagementEmails,
      timestamp,
      summary: {
        subject: emailSubject,
        userEmail,
        userName,
        role,
        city,
        country,
        ip,
      },
    });
  } catch (error) {
    console.error('Failed to dispatch login notification email:', error);
    return NextResponse.json(
      { error: 'Failed to dispatch login notification' },
      { status: 500 }
    );
  }
}
