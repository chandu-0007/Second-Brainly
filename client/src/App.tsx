import Button from './components/Button'
import './App.css'
import { ShareIcon } from './Icons/ShareIcon'
import { PlusIcon } from './Icons/PlusIcon'
import { SideBar } from './components/SideBar'
import { Home } from './components/Home'
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login } from './components/Login'
import { useAuth } from './components/useAuth'
import { useEffect, useState } from 'react'
import { AddcontentForm } from './components/AddContent'
import { ContentsTag } from './components/contentTag'
import { PrivateRoute } from './components/PrivateRoute';
import { Signup } from "./components/Signup"
import { LandPage } from './components/LandingPage'
import { SharedContent } from "./components/SharedContent"
function App() {
  const { isLogged } = useAuth();
  const [showForm, setForm] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
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
    <div className="relative h-screen">
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
              <div className="flex flex-row h-screen">
                {/* Sidebar */}
                <div className="bg-white w-80 shadow-xl h-screen">
                  <SideBar />
                </div>
                {/* Main content */}
                <div className="p-8 bg-gray-50 w-full">
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
                      <div className='flex items-center justify-center mx-2 '>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                          <path fill-rule="evenodd" d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="m-6 w-full h-full relative overflow-y-auto">
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
