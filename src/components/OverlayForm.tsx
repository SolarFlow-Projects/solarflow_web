import React, { useState } from "react"


type propsOverlay = {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  children?: React.ReactNode 
}

export default function OverlayForm(props: propsOverlay) {


    if(!props.show) {
      return null
    } else {
      document.body.style.overflow = 'hidden';
    }

    const changeOverlay = () => {
      props.setShow(false)
      document.body.style.overflow = 'auto';
    }

    return (
      <>
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center px-4" onClick={() => changeOverlay()}>
      </div>
        <div className="bg-white rounded-2xl lg:rounded-3xl  px-7 lg:px-10 pt-14 pb-7 lg:pt-[67px] lg:pb-10 shadow-lg w-full max-w-[650px] z-10 fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
        <button className="fixed top-4 right-4 bg-main rounded-full text-white p-1 lg:p-1.5" onClick={() => changeOverlay()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
          {props.children}

        </div>
      </>
    )
}