import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { recaptchaToken, fax_number, name, email, message } = body

    if (!recaptchaToken || fax_number) {
      return NextResponse.json({ success: false, message: 'Spam gyanús levél' }, { status: 400 })
    }

    // 2. ReCAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`

    const recaptchaRes = await fetch(verificationUrl, { method: 'POST' })
    const recaptchaData = await recaptchaRes.json()

    if (!recaptchaData.success || recaptchaData.score < 0.6) {
      return NextResponse.json(
        { success: false, message: 'reCAPTCHA ellenőrzés sikertelen. (Spam gyanú)' },
        { status: 400 },
      )
    }

    // RESEND KÜLDÉS ---
    const resend = new Resend('re_YPGaCp7Q_QBFWCbRKUy3VugR6wFpWCebp')

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'buliii1010@gmail.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
    })

    return NextResponse.json(
      { success: true, message: 'Üzenet sikeresen elküldve!' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Hiba a szerver oldalon:', error)
    return NextResponse.json(
      { success: false, message: 'Szerverhiba történt a feldolgozás során.' },
      { status: 500 },
    )
  }
}
