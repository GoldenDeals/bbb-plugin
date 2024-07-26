import * as React from 'react';
import Header from '../header/component';


function GetLessonStatus(paused: boolean) {
    if (paused) {
        return <div className='text-grey-850 text-base bg-yellow-200 rounded-2xl pl-4 pr-4'> На паузе </div>
    }
    return <div className='text-grey-850 text-base bg-green-200 rounded-2xl pl-4 pr-4'> В процессе </div>
}

function StickyNote() {
    return (
        <>
            <Header />
            <div className='h-48 w-96 bg-zinc-100 pb-3 pt-3'>
                <div className='w-full border-b-2 border-b-gray-850 mt-3 mb-2 flex justify-between content-center pl-4 pr-4'>
                    <span className='text-base text-grey-850'>Статус урока</span>
                    {GetLessonStatus(false)}
                </div>

                <div className='w-full border-b-2 border-b-gray-850 mt-3 flex justify-between content-center pl-4 pr-4'>
                    <span className='text-base text-grey-850'>Статус урока</span>
                    {GetLessonStatus(true)}
                </div>

                <div className='w-full border-b-2 border-b-gray-850 mt-3 flex justify-between content-center pl-4 pr-4'>
                    <span className='text-base text-grey-850'>Статус урока</span>
                    {GetLessonStatus(true)}
                </div>
            </div>
        </>
    );
}

export default StickyNote;
