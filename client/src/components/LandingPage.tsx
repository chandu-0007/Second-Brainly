
import { Logo } from "../assets/Logo"
import { useNavigate } from "react-router-dom"
export const LandPage = ()=>{
    const nav = useNavigate();
    function getstart(){
        nav("/signup");
    }
    return(
         <div className="bg-gradient-to-br from-white via-blue-100 to-blue-500 min-h-screen font-sans">
      <div className='mx-[120px] pt-5'>
        <div className='flex  justify-between'>
          <span className='flex gap-0.5 text-3xl font-bold tracking-tight '>
            {Logo(32, 32)}
            <span>Second Brain</span></span>
            <div >
           <button onClick={()=>nav("/login")} className="border-none mr-5 hover:bg-black hover:rounded-2xl hover:text-white  transition-all duration-300 ease-in-out w-30 h-8">Sign In</button>     
          <button onClick={getstart} className='bg-black text-white  h-8 rounded-2xl w-30 p-0.5 '>Get Started</button>
         </div>
        </div>
        <div className='flex justify-between mt-[120px]'>
            {/* content in text  */}
          <div className='w-2xl'>
            <br></br>
            <br></br>
            <div className='text-6xl font-bold  tracking-tight mb-3'>Organize Everything</div >
            <div className='text-6xl font-bold  tracking-tight'> You Learn, Effortlessly .</div >
            <p className='text-2xl text-gray-500 pt-5 f'>Your personal second brain for storing, categorizing, and sharing YouTube videos, articles, and notes — all in one place.</p>
            <button onClick={getstart} className='bg-gradient-to-b from-blue-300 to-blue-500 
             transition-all duration-300 ease-in-out text-white shadow-2xl shadow-white h-8   mt-6 rounded-2xl  w-40
             hover:scale-105
    hover:shadow-purple-500/50
    hover:shadow-2xl
    active:scale-95 '> Try it for free </button>
          </div>
           {/* Fetures card  */}
          <div className='w-[400px] h-[400px] ml-7 rounded-2xl border-blue-200 shadow-lg shadow-white  bg-white '>
            <div className='m-4'> 
              <div className='w-full  flex h-10 items-center gap-x-3 bg-gray-200   rounded-4xl '>
                <span className='text-white rounded-4xl h-full w-full items-center flex pl-3  bg-blue-600'>How it wroks </span>
                <span>Youtube</span>
                <span>Tweets</span>
                <span className='p-1'>documents</span>
              </div>
               <div className='text-xl mb-2 font-balck my-2  tracking-norma;'>Features Section</div>
               <div className='bg-gray-100 p-4 rounded-2xl mt-2'>
                <h2 className='text-xl text-indigo-600 font-medium tracking-tight '> Save any content</h2>
                <p>Copy-paste or share any YouTube link, blog post, or personal note — store it instantly.</p>
               </div>
               <div className='bg-gray-100 p-4 rounded-2xl mt-2'>
                <h2 className='text-xl text-indigo-600 font-medium tracking-tight '> Organize with smart tags</h2>
                <p>Let our AI automatically categorize and tag everything for fast retrieval..</p>
               </div>
                <button className='bg-gradient-to-t from-white to-blue-600 p-2 text-white rounded-xl mt-4 '> Bulld your second Brain Today</button>
            </div>
          </div>
        </div>
      </div>
       </div>
    )
}