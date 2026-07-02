import SectionTitles from '../sectionTitles'

export default function FavProds() {
  return (
    <div className=" w-[90%] max-w-[2560px] rounded-[20px] flex flex-col mx-auto py-[50px]">
      <SectionTitles
        title={'Legkeresettebb termékek'}
        bgText={'Szinte biztos, hogy neked is segít'}
      ></SectionTitles>

      <div className="flex flex-col xl:flex-row gap-3">
        <div className="fulek w-[100%] xl:w-[50%] flex flex-col gap-3"></div>
        <div className="tartalom w-[100%] xl:w-[50%] flex flex-col gap-3"></div>
      </div>
    </div>
  )
}
