import Button from './components/Button'
import './App.css'
import { ShareIcon } from './Icons/ShareIcon'
import { PlusIcon } from './Icons/PlusIcon'
import { SideBar } from './components/SideBar'
import { Home } from './components/Home'
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login } from './components/Login'
import { useAuth } from './components/useAuth'
import { useEffect, useRef, useState } from 'react'
import { AddcontentForm } from './components/AddContent'
import { ContentsTag } from './components/contentTag'
import { PrivateRoute } from './components/PrivateRoute';
import { Signup } from "./components/Signup"
import { LandPage } from './components/LandingPage'
import { SharedContent } from "./components/SharedContent"
import axios from 'axios'
function App() {
  const { isLogged ,logout} = useAuth();
  const [showForm, setForm] = useState<boolean>(false);
  const navigate = useNavigate();
  const [showProfile, SetshowProfile] = useState<boolean>(false);
  interface Details{
    username :string ; 
    email:string ; 
    age ? :number 
  }
  const [Details , Setdetails] = useState<Details>({
    username:"",
    email:""
  })
  useEffect(() => {
       const getDetails = async ()=>{
        const token = localStorage.getItem("token");
        const info = await axios.get("http://localhost:3003/users/info",{
          headers :{authorization: token}
        });
        if(info){
          const data = info.data ; 
          console.log(data);
          if(data.success){
          Setdetails({
            username :data.details.username,
            email :data.details.email,
            age:data.details.age
          })
          }
        }
      }
      getDetails();
    if (isLogged) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [isLogged]);

  function openAddForm() {
    setForm(true);
  }
  function GetSharedContent() {
    navigate("/content/share")
  }

  return (
    <div className="relative  h-screen">
      <Routes>
        {/* Public routes */}

        <Route path='/' element={<LandPage />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
             <div className="flex flex-row h-screen w-screen overflow-hidden">
                {/* Sidebar */}
                <div className="bg-white w-80 shadow-xl h-screen">
                  <SideBar />
                </div>
                {/* Main content */}
                <div className="flex-1 h-full flex flex-col bg-gray-50 p-8 overflow-hidden min-w-0">
                  <div className="flex justify-between items-center">
                    <div className="border-none mt-2 h-8 justify-center items-center bg-white text-2xl text-black font-bold">
                      <span>All Notes</span>
                    </div>
                    <div className="flex">
                      <Button
                        varaient="secondary"
                        size="lg"
                        OnClickHandler={GetSharedContent}
                        text="Share Brain"
                        startIcon={<ShareIcon />}
                      />
                      <Button
                        varaient="primary"
                        size="lg"
                        OnClickHandler={openAddForm}
                        text="Add Content"
                        startIcon={<PlusIcon />}
                      />
                      <div className='flex items-center justify-center mx-2 rounded-full h-10 w-10 mt-1.5 bg-gray-200' onClick={() => { SetshowProfile((showProfile) => !showProfile) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 flex justify-center items-center">
                          <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div
                        className={`fixed top-20 right-6 w-64 h-64 z-50 bg-white shadow-lg rounded-xl p-4 transition-transform duration-300 ease-in-out ${showProfile ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
                          }`}
                      >
                        <h2 className="text-xl font-semibold mb-2">Profile</h2>
                        <p className="text-sm text-gray-700">{`UserName: ${Details.username}`}</p>
                        <p className="text-sm text-gray-700">{`Email: ${Details.email}`}</p>
                        <button
                          onClick={()=>logout()}
                          className="mt-4 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                   <div className="flex-1 overflow-y-auto w-full min-w-0">
                    <Routes>
                      <Route path="/home" element={<Home />} />
                      <Route path="/content/tweets" element={<ContentsTag tag="tweets" />} />
                      <Route path="/content/youtube" element={<ContentsTag tag="youtube" />} />
                      <Route path="/content/link" element={<ContentsTag tag="link" />} />
                      <Route path="/content/documents" element={<ContentsTag tag="document" />} />
                      <Route path="/content/shared" />
                      {/* fallback */}
                      <Route path="*" element={<SharedContent />} />
                    </Routes>
                  </div>
                </div>
                {showForm && (
                  <div className="absolute inset-0 bg-white flex justify-center items-center">
                    <span className="rounded-2xl">
                      <AddcontentForm OnClickHandler={() => setForm(false)} />
                    </span>
                  </div>
                )}
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
