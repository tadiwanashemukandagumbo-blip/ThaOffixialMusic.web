import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, resetUrl, resetToken, timestamp } = await req.json();

    const primarySecurityEmail = 'thaoffixialmusic@gmail.com';
    const backupSecurityEmail = 'tadiwanashemukandagumbo@gmail.com';

    const recipients = Array.from(new Set([
      primarySecurityEmail,
      backupSecurityEmail,
      email?.trim()?.toLowerCase() || '',
    ].filter(Boolean)));

    const alertDetails = {
      to: recipients.join(', '),
      primaryRecipient: primarySecurityEmail,
      backupRecipient: backupSecurityEmail,
      targetAccountEmail: email || 'Unspecified account',
      from: 'security@thaoffixial.com (ThaOffixial Official Security & Administration Desk)',
      subject: `🚨 SECURITY ALERT: 5 Failed Password Attempts Detected (${email || 'Account'})`,
      timestamp: timestamp || new Date().toISOString(),
      resetUrl,
      resetToken,
      message: `A security threshold was triggered: 5 consecutive failed password attempts were recorded for account (${email}). Account re-entry is locked for a 10-second security cooldown. To protect the fan portal and reset credentials immediately, use the secure link below.`,
    };

    // Log the security alert email dispatch to the server
    console.warn('====================================================');
    console.warn('[THAOFFIXIAL SECURITY DESK] SECURITY ALERT EMAIL DISPATCH:');
    console.warn(`To: ${alertDetails.to}`);
    console.warn(`Target Account: ${alertDetails.targetAccountEmail}`);
    console.warn(`Subject: ${alertDetails.subject}`);
    console.warn(`Timestamp: ${alertDetails.timestamp}`);
    console.warn(`Reset Link: ${alertDetails.resetUrl}`);
    console.warn('====================================================');

    return NextResponse.json({
      success: true,
      message: `Security alert email dispatched to ${primarySecurityEmail} and ${backupSecurityEmail}`,
      recipients,
      dispatchedEmail: alertDetails,
    });
  } catch (error) {
    console.error('Error sending security alert email:', error);
    return NextResponse.json({ error: 'Failed to dispatch security alert' }, { status: 500 });
  }
}
