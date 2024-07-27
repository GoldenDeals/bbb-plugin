import { FloatingWindow } from 'bigbluebutton-html-plugin-sdk';
import * as React from 'react';

import * as ReactDOM from 'react-dom/client';

export function getFloat() {
    const floatingWindow = new FloatingWindow({
        top: 50,
        left: 50,
        movable: true,
        backgroundColor: '#f1f1f1',
        boxShadow: '2px 2px 10px #777',
        contentFunction: (element: HTMLElement) => {
            const root = ReactDOM.createRoot(element);
            root.render(
                <React.StrictMode>
                    <Float />
                </React.StrictMode>,
            );
        },
    });
    return floatingWindow;
}


function Float() {
    return (
        <>
            <div className='w-[30vw] h-[30vh] bg-zinc-100'> hello </div>
        </>
    );
}

export default Float;
