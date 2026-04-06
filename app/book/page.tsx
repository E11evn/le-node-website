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
const BOOKING_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3Faaox17Cxqc2jgjFxGWDNSVzWnV7c5nYiWnSyndS3emNh2fUHLtFkrxQsht5PR9W94ReLK0vu'

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
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
            <iframe
              src={`${BOOKING_URL}?gv=true`}
              style={{ border: 0 }}
              width="100%"
              height="600"
              frameBorder="0"
              title="Book a strategy call"
            />
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
