import Button from './components/Button'
import './App.css'
import { ShareIcon } from './Icons/ShareIcon'
import { PlusIcon } from './Icons/PlusIcon'
import { SideBar } from './components/SideBar'
function App() {
 const  onsubmit:()=>void = ()=>{
   console.log("called the button component")
 }
 function ShareMethod():void {
  console.log(" the method the shareMethod is called Now")
 }
 function siderBarfuc(e:string) {
  console.log(e)
 }
  return (
    <>
      <div className='flex flex-row'>
        {/* sideBar  */}
        <div className='bg-white  w-80 shadow-xl h-screen '>
          <SideBar funcall={siderBarfuc}/>
        </div>
        {/* main  content page  */}
        <div className='p-8 bg-gray-50 w-full '>
          <div className='flex justify-between items-center '>
          <div className="border-none mt-2 h-8 justify-center items-center bg-white text-2xl text-black font-bold">
            <span>All Notes </span>
           </div>
          <div className='flex '>
            <Button varaient='secondary' size="lg" OnClickHandler={ShareMethod} 
            text="Share Brain"
             startIcon={<ShareIcon/>}
             ></Button>
            <Button varaient='primary' size="lg" OnClickHandler={onsubmit}
            text='Add Content' startIcon={<PlusIcon/>}></Button>
            </div>
          </div>
        </div>
        
      </div>
      

    </>
  )
}

export default App
