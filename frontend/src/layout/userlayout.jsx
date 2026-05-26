import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar"
import { ToastContainer } from 'react-toastify';

export default function userLayout() {
  return (
    <>
        
          <Navbar />
          <Outlet />
           <ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      
    </>
  );
}
