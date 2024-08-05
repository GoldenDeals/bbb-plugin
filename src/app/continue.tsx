import * as React from 'react';
import { FloatingWindow } from 'bigbluebutton-html-plugin-sdk';
import * as ReactDOM from 'react-dom/client';
import { request } from './fetcher';
import { CustomLesson } from './types';

export function getContinuePopup(width: number, height: number, Id: string, Token: string, closeCallback: () => void) {
    // 384
    const popup = new FloatingWindow({
        top: height / 2 - (height / 6),
        left: width / 2 - (width < 384 ? (width / 6) : 384 / 2),
        movable: false,
        backgroundColor: '#f1f1f1',
        boxShadow: '2px 2px 10px #777',

        contentFunction: (element: HTMLElement) => {
            const root = ReactDOM.createRoot(element);
            root.render(
                <React.StrictMode>
                    <Popup endCallback={async () => {
                        console.log("ID: ", Id, "Token: ", Token)
                        await request<CustomLesson>("bbb/end", Id, Token)
                        window.location.href = "https://www.test.fiveplas.ru/account"
                    }} continueCallback={async (time) => {
                        await fetch('https://api.test.fiveplas.ru/bbb/continue?id=' + Id + "&token=" + Token + '&time=' + time, { method: "GET" })
                        closeCallback()
                    }} />
                </React.StrictMode>,
            );
        },
    });
    return popup
}

interface PopupProps {
    endCallback: () => void
    continueCallback: (time: number) => void
}

export default function Popup({ endCallback, continueCallback }: PopupProps) {
    const [minutes, setMinutes] = React.useState(0)
    return <>
        <div className='w-[50vw] h-[45vh] min-h-48 min-w-80 max-w-sm max-h-52'>

            <div className='w-full flex content-center justify-center border-b-2 border-b-black' >
                <span className='font-bold text-xl my-3'>
                    Время урока подошло к концу!
                </span>
            </div>
            <div className="py-2 px-3 m-4 bg-white border border-gray-200 rounded-lg" data-hs-input-number="">
                <div className="w-full flex justify-between items-center gap-x-5">
                    <span className="block text-xs text-gray-500 dark:text-neutral-400">
                        Доп. время
                    </span>
                    <input onChange={(event) => { setMinutes(Math.max(Number(event.target.value), 0)) }} value={minutes} className="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-non" style={{ MozAppearance: "textfield" }} type="number" aria-roledescription="Number field" data-hs-input-number-input="">
                    </input>
                    <span className="block text-xs text-gray-500 dark:text-neutral-400">
                        мин.
                    </span>
                    <div className="flex justify-end items-center gap-x-1.5">
                        <button onClick={() => { setMinutes(Math.max(minutes - 1, 0)) }} type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" tabIndex={-1} aria-label="Decrease" data-hs-input-number-decrement="">
                            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14"></path>
                            </svg>
                        </button>
                        <button onClick={() => { setMinutes(minutes + 1) }} type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" tabIndex={-1} aria-label="Increase" data-hs-input-number-increment="">
                            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5v14"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className='px-3 flex content-evenly mt-5 justify-center h-fit'>
                <button type="button" onClick={() => { continueCallback(minutes) }} disabled={minutes == 0} className="py-3 mr-3 ml-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                    Продолжить
                </button>
                <button type="button" onClick={endCallback} className="py-3 px-4 mx-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-400 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600 disabled:opacity-50 disabled:pointer-events-none">
                    Закончить
                </button>
            </div>
        </div >
    </>
}
