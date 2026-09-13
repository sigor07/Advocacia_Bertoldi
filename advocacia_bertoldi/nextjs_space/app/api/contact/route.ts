export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.CF_TURNSTILE_SECRET_KEY
  // Sem chave configurada: não bloqueia o envio (fail-open em desenvolvimento).
  if (!secret) return true
  if (!token) return false
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    })
    const data = await res.json()
    return data?.success === true
  } catch (e) {
    console.error('Erro ao verificar Turnstile:', e)
    return false
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const name = (body?.name ?? '').toString().trim()
    const email = (body?.email ?? '').toString().trim()
    const subject = (body?.subject ?? '').toString().trim()
    const message = (body?.message ?? '').toString().trim()
    const turnstileToken = body?.turnstileToken

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Preencha todos os campos obrigatórios.' },
        { status: 400 },
      )
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!emailOk) {
      return NextResponse.json(
        { success: false, message: 'Informe um e-mail válido.' },
        { status: 400 },
      )
    }
    if (message.length < 500) {
      return NextResponse.json(
        { success: false, message: 'A mensagem deve ter no mínimo 500 caracteres.' },
        { status: 400 },
      )
    }

    const human = await verifyTurnstile(turnstileToken)
    if (!human) {
      return NextResponse.json(
        { success: false, message: 'Falha na verificação de segurança. Tente novamente.' },
        { status: 400 },
      )
    }

    // Persiste a submissão no banco de dados.
    await prisma.contactSubmission.create({
      data: { name, email, subject, message, formType: 'contact', status: 'new' },
    })

    // Envia a notificação por e-mail (falha não impede o sucesso do formulário).
    try {
      const appUrl = process.env.NEXTAUTH_URL || ''
      const hostname = appUrl ? new URL(appUrl).hostname : 'localhost'
      const dataHora = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color:#1f2937;">
          <div style="background:#184E77; padding:20px 24px; border-radius:10px 10px 0 0;">
            <h2 style="color:#fff; margin:0; font-size:18px;">Novo contato — Advocacia Bertoldi</h2>
          </div>
          <div style="background:#f8fafc; padding:24px; border-radius:0 0 10px 10px;">
            <p style="margin:8px 0;"><strong>Nome:</strong> ${name}</p>
            <p style="margin:8px 0;"><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin:8px 0;"><strong>Assunto:</strong> ${subject}</p>
            <p style="margin:16px 0 6px;"><strong>Mensagem:</strong></p>
            <div style="background:#fff; padding:16px; border-radius:6px; border-left:4px solid #22577A; white-space:pre-wrap;">${message.replace(/</g, '&lt;')}</div>
            <p style="color:#6b7280; font-size:12px; margin-top:20px;">Recebido em ${dataHora}</p>
          </div>
        </div>`

      const resp = await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deployment_token: process.env.ABACUSAI_API_KEY,
          app_id: process.env.WEB_APP_ID,
          notification_id: process.env.NOTIF_ID_FORMULRIO_DE_CONTATO,
          subject: `Novo contato do site: ${subject}`,
          body: htmlBody,
          is_html: true,
          recipient_email: 'atendimento@advbertoldi.com.br',
          reply_to: email,
          sender_email: `noreply@${hostname}`,
          sender_alias: 'Advocacia Bertoldi',
        }),
      })
      const result = await resp.json().catch(() => ({}))
      if (!result?.success && !result?.notification_disabled) {
        console.error('Falha ao enviar e-mail de notificação:', result?.message)
      }
    } catch (mailErr) {
      console.error('Erro no envio de e-mail:', mailErr)
    }

    return NextResponse.json({ success: true, message: 'Mensagem enviada com sucesso!' })
  } catch (error) {
    console.error('Erro no processamento do contato:', error)
    return NextResponse.json(
      { success: false, message: 'Não foi possível enviar sua mensagem. Tente novamente.' },
      { status: 500 },
    )
  }
}
