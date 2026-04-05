import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Book a call — le-node Consulting',
  description: 'Book a 30-minute GTM strategy call with the le-node team.',
}

// ─────────────────────────────────────────────────────────────────────────────
// Paste your Google Calendar Appointment Scheduling link here.
// It looks like: https://calendar.google.com/calendar/appointments/schedules/XXXX
// ─────────────────────────────────────────────────────────────────────────────
const BOOKING_URL =
  'https://calendar.google.com/calendar/appointments/schedules/REPLACE_WITH_YOUR_LINK'

export default function BookPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-white">
        <div className="container-content py-16 md:py-20">

          {/* Header */}
          <div className="max-w-xl mb-10">
            <span
              className="text-xs font-semibold tracking-widest uppercase mb-4 block"
              style={{ color: '#FA7900' }}
            >
              le node Consulting
            </span>
            <h1 className="text-display-sm font-bold text-foreground mb-4">
              Let&apos;s talk about your GTM.
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              30 minutes. No pitch — just a straight diagnosis of where your pipeline is
              leaking and what the fastest fix looks like.
            </p>
          </div>

          {/* Google Calendar embed */}
          <div
            className="rounded-2xl overflow-hidden border border-border shadow-sm"
            style={{ minHeight: 650 }}
          >
            <iframe
              src={`${BOOKING_URL}?gv=true`}
              style={{ border: 0 }}
              width="100%"
              height="650"
              frameBorder="0"
              scrolling="no"
              title="Book a strategy call"
            />
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
