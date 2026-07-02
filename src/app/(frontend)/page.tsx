import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import Hero from '../components/hero/hero'
import SectionOne from '../components/section1/sectionOne'
import SectionTwo from '../components/section2/sectionTwo'
import SectionThree from '../components/section3/sectionThree'
import FavProds from '../components/section4/favProducts'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  // const { user } = await payload.auth({ headers })
  // const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <Hero></Hero>
      <SectionOne></SectionOne>
      <SectionTwo></SectionTwo>
      <SectionThree></SectionThree>
      <FavProds></FavProds>
    </section>
  )
}
