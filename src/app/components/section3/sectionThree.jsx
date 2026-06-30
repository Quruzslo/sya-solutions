import SectionTitles from '../sectionTitles'

export default function SectionOne() {
  return (
    <div className=" w-[90%] max-w-[2560px] rounded-[20px] flex flex-col mx-auto py-[50px]">
      <SectionTitles title={'Csapatunk'} bgText={'Akik segítenek az utadon'}></SectionTitles>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] my-[50px]"></div>
    </div>
  )
}
