import Button from './components/Button'
import './App.css'
import { ShareIcon } from './Icons/ShareIcon'
import { PlusIcon } from './Icons/PlusIcon'
import { SideBar } from './components/SideBar'
import { Home } from './components/Home'
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from './components/Login'
import { useAuth } from './components/useAuth'
import { useState } from 'react'
import { AddcontentForm } from './components/AddContent'
import { ContentsTag } from './components/contentTag'
import { PrivateRoute } from './components/PrivateRoute';
import { Signup } from "./components/Signup"

function App() {
  const { isLogged } = useAuth();
  const [showForm, setForm] = useState<boolean>(false);

  function openAddForm() {
    setForm(true);
  }

  function shareMethod() {
    console.log("ShareMethod is called now");
  }

  return (
    <div className="relative h-screen">
      <Routes>
        {/* Public routes */}
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
                        OnClickHandler={shareMethod}
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
                    </div>
                  </div>
                  <div className="m-6 w-full h-full relative overflow-y-auto">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/content/tweets" element={<ContentsTag tag="tweets" />} />
                      <Route path="/content/youtube" element={<ContentsTag tag="youtube" />} />
                      <Route path="/content/link" element={<ContentsTag tag="link" />} />
                      <Route path="/content/documents" element={<ContentsTag tag="document" />} />
                      {/* fallback */}
                      <Route path="*" element={<Navigate to="/" />} />
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
