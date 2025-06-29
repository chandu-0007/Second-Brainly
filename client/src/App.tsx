import Button from './components/Button'
import './App.css'
import { ShareIcon } from './Icons/ShareIcon'
import { PlusIcon } from './Icons/PlusIcon'
import { SideBar } from './components/SideBar'
import { Home } from './components/Home'
import {Routes, Route,} from "react-router-dom";
import { Login } from './components/Login'
import { useAuth } from './components/useAuth'
import { useEffect, useState } from 'react'
import { AddcontentForm } from './components/AddContent'
import { ContentsTag } from './components/contentTag'
function App() {
 const  OpenAddForm:()=>void = ()=>{
   setForm(true)
 }
 function ShareMethod():void {
  console.log(" the shareMethod is called Now")
 }
const {isLogged,SetIsLogged} = useAuth()
  useEffect(()=>{
  if(localStorage.getItem("token")) SetIsLogged(true)   
  },[])
const [ShowFrom , setForm ] = useState<boolean>(false);
  return (
    <div className='relative h-screen '>{isLogged ? <div>
        <div className='flex flex-row'>
        {/* sideBar  */}
        <div className='bg-white  w-80 shadow-xl h-screen '>
          <SideBar/>
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
            <Button varaient='primary' size="lg" OnClickHandler={OpenAddForm}
            text='Add Content' startIcon={<PlusIcon/>}></Button>
            </div>
          </div>
          <div className='m-6 w-full h-full relative '>
                   
                  <Routes>
                     <Route path='/courses' element={<Home/>}></Route>
                     <Route path='/content/tweets' element={<ContentsTag tag="tweets" />} />
                     <Route path='/content/youtube' element={<ContentsTag tag="youtube" />} />
                     <Route path='/content/link' element={<ContentsTag tag="link" />} />
                     <Route path='/content/documents' element={<ContentsTag tag="document" />} />
                  </Routes>
          </div>
        </div>
      </div>
    </div> : <Login/>}
        {ShowFrom &&  <div className="absolute inset-0  bg-white  flex justify-center items-center">
         <span className=' rounded-2xl '>
          <AddcontentForm OnClickHandler={()=> setForm(false)}></AddcontentForm>
         </span>
         </div> }
        
    </div>
  )
}

export default App
