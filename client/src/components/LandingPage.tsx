
import { Logo } from "../assets/Logo"
import { useNavigate } from "react-router-dom"
import appimg from "../assets/looklike.png"
export const LandPage = () => {
  const nav = useNavigate();
  function getstart() {
    nav("/signup");
  }
  return (
    <div className="bg-gradient-to-br from-white via-blue-100 to-blue-500 min-h-screen font-sans">
      <div className='mx-[120px] pt-5'>
        <div className='flex  justify-between'>
          <span className='flex gap-0.5 text-3xl font-bold tracking-tight '>
            {Logo(32, 32)}
            <span>Second Brain</span></span>
          <div >
            <button onClick={() => nav("/login")} className="border-none mr-5 hover:bg-black hover:rounded-2xl hover:text-white  transition-all duration-300 ease-in-out w-30 h-8">Sign In</button>
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
            <p className='text-2xl text-gray-500 pt-5 '>Your personal second brain for storing, categorizing, and sharing YouTube videos, articles, and notes — all in one place.</p>
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
        {/* how it look like  */}
        <div className="text-6xl font-bold  flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-600 m-6">
          How it works
        </div>
        <div className=" flex items-center justify-center text-gray-500 text-2xl mt-7 mb-6 tracking-tight">
          Everything you save becomes a part of your Second Brain — always searchable, always accessible.
        </div>

        <div onClick={()=>{nav("/signup")}} className="w-full h-[600px] bg-white border-blue-500 shadow-blue-300 shadow-2xl flex items-center justify-center rounded-2xl  ">
          <img src={appimg} className="w-full h-full rounded-2xl"></img>
        </div>
        <div className=" mt-10 "> 
        </div>
      </div>
      <div className=" flex-col px-[120px] h-100  bg-white ">
         <div className="flex justify-center items-center text-gray-600 font-[Manrope]  pt-10 text-4xl ">Build Your Second Brain in 3 Simple Steps </div>
         <div className="flex justify-evenly items-center mt-10 ">
          <div className="w-80 h-60 bg-gray-50 rounded-2xl  shadow-lg shadow-blue-500  ">
             <div className="p-2 text-lg bg-indigo-400  rounded-t-2xl">
              <span className="text-xl text-white">Step </span>
              <span className="rounded-full text-xl text-white">1</span>
             </div>
             <div className="p-4 text-lg">
              <h3 className="text-xl  text-indigo-600  font-[Manrope]">Save Any Link </h3>
              <ul className="list-disc list-inside">
              <li>Capture Youtube videos , tweets articles , and any useful links </li>
             <li>Input Field Illustration</li>
             <li>Button :"Save to Second Brain"</li> 
              </ul>
             </div>
          </div>
          <div className="w-80 h-60 bg-gray-50 rounded-2xl  shadow-lg shadow-blue-500  ">
             <div className="p-2 text-lg bg-indigo-400  rounded-t-2xl">
              <span className="text-xl text-white">Step </span>
              <span className="rounded-full text-xl text-white">2</span>
             </div>
             <div className="p-4 text-lg">
              <h3 className="text-xl  text-indigo-600  font-[Manrope]">Auto-Organize & Enrich</h3>
              <ul className="list-disc list-inside">
              <li>We fetch titles, thumbnails, and summaries. You can tag, categorize, and take notes</li>
             <li>Card preview with metadata, tags, and note input</li>
              </ul>
             </div>
          </div>
          <div className="w-80 h-60 bg-gray-50 rounded-2xl  shadow-lg shadow-blue-500  ">
             <div className="p-2 text-lg bg-indigo-400  rounded-t-2xl">
              <span className="text-xl text-white">Step </span>
              <span className="rounded-full text-xl text-white">3</span>
             </div>
             <div className="p-4 text-lg">
               <h3 className="text-xl  text-indigo-600  font-[Manrope]">Search & Use Anytime</h3>
              <ul className="list-disc list-inside">
              <li>Quickly search your saved knowledge. Filter by tags, sources, or keywords </li>
             <li> “Revisit, reflect, reuse.”</li>
              </ul>
             </div>
          </div>
         </div>
      </div>
      <div className="px-[120px] bg-black h-60 ">
        
      </div>
    </div>
  )
}