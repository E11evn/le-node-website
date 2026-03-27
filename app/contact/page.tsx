import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Contact — le-node',
  description: 'Get in touch with the le-node team.',
}

const inputClass =
  'w-full px-4 py-2.5 rounded-lg border border-border text-foreground placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors bg-white'

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="min-h-[70vh] flex items-center">
        <div className="container-content py-24 max-w-lg mx-auto w-full">
          <span className="section-eyebrow">Contact</span>
          <h1 className="text-display-sm font-bold text-foreground mb-3">
            Let&apos;s talk GTM.
          </h1>
          <p className="text-muted text-lg mb-10">
            Tell us about your team and what you&apos;re trying to automate. We&apos;ll get
            back to you within one business day.
          </p>

          <form
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            className="flex flex-col gap-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Jane Smith"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  placeholder="Acme Corp"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="jane@acmecorp.com"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                What are you trying to automate?
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="We want to automate our outbound process and enrich leads automatically..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <button type="submit" className="btn-primary w-full py-3 text-base">
              Send message
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
