import Nav from '@/components/Nav'
import AgencyHero from '@/components/agency/AgencyHero'
import AgencyProblem from '@/components/agency/AgencyProblem'
import AgencyApproach from '@/components/agency/AgencyApproach'
import AgencyDeliverables from '@/components/agency/AgencyDeliverables'
import AgencyCTA from '@/components/agency/AgencyCTA'
import Footer from '@/components/Footer'

export default function AgencePage() {
  return (
    <>
      <Nav />
      <main>
        <AgencyHero />
        <AgencyProblem />
        <AgencyApproach />
        <AgencyDeliverables />
        <AgencyCTA />
      </main>
      <Footer />
    </>
  )
}
