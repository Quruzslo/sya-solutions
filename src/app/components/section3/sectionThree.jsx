'use client'
import SectionTitles from '../sectionTitles'
import TeamCard from './teamCard'
import TeamBigPic from './teamBigPic'
import { useState } from 'react'
// képek---------
import Zso from 'public/images/zso.jpg'
import Dani from 'public/images/danikep.jpg'
import Zsani from 'public/images/Zsanipic.jpg'
import Viola from 'public/images/Viola.jpg'

export default function SectionOne() {
  const [activeMember, setActiveMember] = useState({
    image: Zso,
    title: 'Tanácsadó',
    name: 'Szőgyényi Zsófia Zsó Cunn',
    desc: 'Ide jön a bla bla , meow és cunn',
    isActive: 1,
  })

  return (
    <div className=" w-[90%] max-w-[2560px] rounded-[20px] flex flex-col mx-auto py-[50px]">
      <SectionTitles title={'Csapatunk'} bgText={'Akik segítenek az utadon'}></SectionTitles>
      <div className="w-full flex flex-col xl:flex-row gap-[20px] my-[150px] min-h-[650px] items-center">
        <div className="flex w-[100%] xl:w-[50%] h-full">
          <TeamBigPic
            image={activeMember.image}
            title={activeMember.title}
            name={activeMember.name}
            desc={activeMember.desc}
          ></TeamBigPic>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 w-[350px] h-[350px] md:w-[450px] md:h-[450px] [clip-path:circle(50%_at_50%_50%)] overflow-hidden [&>*]:w-full [&>*]:h-full mx-auto filter:drop-shadow-[10px_10px_15px_rgba(0,0,0,0.6)]">
          <TeamCard
            image={Viola}
            title={'Fiókvezető'}
            name={'Vincze Viola'}
            desc={'Ide jön a bla bla'}
            num={1}
            isActive={activeMember.isActive}
            setActiveMember={setActiveMember}
          ></TeamCard>
          <TeamCard
            image={Zso}
            title={'Tanácsadó Leader'}
            name={'Szőgyényi Zsófia '}
            desc={'Ide jön a bla bla'}
            num={2}
            isActive={activeMember.isActive}
            setActiveMember={setActiveMember}
          ></TeamCard>
          <TeamCard
            image={Dani}
            title={'Tanácsadó'}
            name={'Kis Dániel'}
            desc={'Ide jön a bla bla '}
            num={3}
            isActive={activeMember.isActive}
            setActiveMember={setActiveMember}
          ></TeamCard>

          <TeamCard
            image={Zsani}
            title={'Tanácsadó'}
            name={'Szabó Zsanett'}
            desc={'Ide jön a bla bla '}
            num={4}
            isActive={activeMember.isActive}
            setActiveMember={setActiveMember}
          ></TeamCard>
        </div>
      </div>
    </div>
  )
}
