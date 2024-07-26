import * as React from 'react';
import enums from '../utils/events';

function Header() {
    const handleRedClick = () => {
        dispatchEvent(new CustomEvent(enums.SampleFloatingWindow.CLOSE_WINDOW));
    };

    return (
        <div className='w-full h-7 bg-zinc-250 flex justify-end content-center border-b-zinc-400 border-b-1'>
            <div onClick={handleRedClick} className='rounded-full bg-red-800 hover:bg-red-600 w-4 h-4 flex content-center justify-center mt-[6px] mr-2' >
                <svg className="text-red-850 w-full h-full" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </div>
        </div>
    );
}

export default Header;
