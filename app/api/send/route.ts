import { Resend } from 'resend'
import { EmailTemplate } from '../../_components/email-template'

const resend = new Resend(process.env.RESEND_API)

export async function POST(req: any) {
  const response = await req.json()
  try {
    const data = await resend.emails.send({
      from: 'HamzaHussain@resend.dev',
      to: [`${response.RecipentEmail}`],
      subject: `FILE SHARED BY ${response.Username}`,
      react: EmailTemplate({ response }),
    })

    return Response.json(data)
  } catch (error) {
    return Response.json({ error })
  }
}
