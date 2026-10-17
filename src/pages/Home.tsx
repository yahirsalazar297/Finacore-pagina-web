import { useEffect } from 'react'
import { Hero } from '../components/sections/Hero'
import { Pillars } from '../components/sections/Pillars'
import { AcademicAreasPreview } from '../components/sections/AcademicAreasPreview'
import { ToolsPreview } from '../components/sections/ToolsPreview'
import { AISection } from '../components/sections/AISection'
import { HomeCTA } from '../components/sections/HomeCTA'

export function Home() {
  useEffect(() => {
    document.title = 'FINACORE — Accounting & Finance Academy'
  }, [])

  return (
    <>
      <Hero />
      <Pillars />
      <AcademicAreasPreview />
      <ToolsPreview />
      <AISection />
      <HomeCTA />
    </>
  )
}
