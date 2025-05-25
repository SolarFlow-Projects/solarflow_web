import { useEffect, useState } from "react"

type OverlayProp = {
    info: {
        title: String,
        subtitle: string,
        time: number
        error: boolean
    }
}

export default function Overlay(props:OverlayProp) { 
    const [visible, setVisible] = useState(true)

    useEffect( ()=> {
        const timer = setTimeout(() => {
            setVisible(false);
        }, props.info.time);

        return () => clearTimeout(timer);
    })

    const closeOverlay = () => {
        setVisible(false)
    }

    if (!visible) return false

    return (
        <div className="fixed bottom-4 right-1/2 transform translate-x-1/2 lg:bottom-auto lg:top-6 lg:right-6 lg:translate-x-0 bg-white py-7 px-4 w-[340px] rounded-lg z-50 flex flex-col gap-5 transition-all duration-300 shadow-lg ">
            <svg onClick={() => closeOverlay()} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x-icon lucide-x absolute top-4 right-4 cursor-pointer"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            
            <div className="flex flex-row gap-2">
                { props.info.error ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#17a589" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>

                )}

                <div className="flex flex-col gap-3">
                    <h3 className="text-[14px] font-semibold pr-6">{props.info.title}</h3>
                    <p className={`" ${ props.info.error ? 'text-[#e74c3c] text-[13px]' : 'text-[13px]' } `}>{props.info.subtitle}</p>
                </div>
            </div>
        </div>
    )
}