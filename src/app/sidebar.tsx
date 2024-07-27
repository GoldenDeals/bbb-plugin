import * as React from 'react';
import { LessonI, FileI } from './types';
import { GenericContentSidekickArea } from 'bigbluebutton-html-plugin-sdk';

import * as ReactDOM from 'react-dom/client';

export function getSidebar() {
    const sidebar = new GenericContentSidekickArea({
        name: 'Информация об уроке',
        section: 'Урок',
        buttonIcon: 'test',
        open: false,
        contentFunction: (element: HTMLElement) => {
            const root = ReactDOM.createRoot(element);
            root.render(
                <React.StrictMode>
                    <GenericContentSidekickExample />
                </React.StrictMode>,
            );
        },
    })

    return sidebar;
}


export function GenericContentSidekickExample() {
    const lesson: LessonI = {
        id: "668a8cb6b497e65c3832bf49",
        created_at: "1722065092",
        updated_at: "1722070092",
        name: "dfsfsdfsd",
        subject_id: "667add073b2d436535b01cac",
        grade_id: "66813b35ea61130a81e1fc4c",
        type_id: "000000000000000000000000",
        expected_time: 3600,
        time_started: 1722071092,
        chat_token: "ojfdklg;kler;",
        time_ended: 0,
        time_erased: 0,
        paused: false,
        last_pause: 1722071092,
        suspend_message: "",
        total_time: 0,
        chat_id: "668a8ce9b497e65c3832bf4a",
        "teacher_confirmed": true,
        "student_confirmed": true,
        "paused_by_end": false,
        "planned": 1722071092 - 60,
        "active": false,
        "sub_token": "f0d32cca-3c12-4803-8c85-3cb51006c15e",
        "amount": 0,
        "teacher_amount": 0,
        "price": 1500,
        "percent": 60,
        "attachment": [
            { base64: "", fileName: "Первый файл", fileSize: "1024", fileType: "document/pdf" },
            { base64: "", fileName: "2 файл", fileSize: "134217728", fileType: "" },
            { base64: "", fileName: "3 файл", fileSize: "1024", fileType: "document/docx" },
            { base64: "", fileName: "", fileSize: "1024", fileType: "text/javascript" },
            { base64: "", fileName: "5 файл", fileSize: "1024", fileType: "" },
            { base64: "", fileName: "8938443324u58342urph2ife;wlvdbs;k/nvwed;sbjdsknc/swdsjcb файл", fileSize: "1024", fileType: "" },
        ],
    }

    const getStatus = (paused: boolean) => {
        if (paused) {
            <span className='mb-2 ml-2 pl-3 pr-3 rounded-xl bg-yellow-400'> На паузе </span>
        }
        return <span className='mb-2 ml-2 pl-3 pr-3 rounded-xl bg-green-400'> В процессе </span>
    }
    const getFile = (file: FileI) => {
        let name = file.fileName;
        if (file.fileName === "") {
            name = "Без имени"
        }

        return (
            <div className='my-2 w-full flex content-center justify-between border-b-zinc-200 px-2 border-b-2'>
                <span className='truncate hover:text-clip w-[75%]'>{name} </span>
                <svg className="hs-tooltip-toggle h-6 w-6 text-black" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <line x1="12" y1="11" x2="12" y2="17" />  <polyline points="9 14 12 17 15 14" /></svg>
            </div>
        )
    }
    const getFileTable = (files: FileI[]) => {
        return files.map(file => getFile(file))
    }
    return (<>
        <div className='bg-white w-full h-full border-b-5 border-b-black'>
            <div className='font-bold flex text-lg content-center justify-between mt-4 px-2 border-b-zinc-200 border-b-2'>
                <span className='mb-2'>Урок: </span>
                {getStatus(lesson.paused || lesson.paused_by_end)}
            </div>

            <div className='flex text-md content-center justify-between mt-4 px-2 border-b-zinc-200 border-b-2'>
                <span className='mb-2'>Начало: </span>
            </div>

            <div className='flex text-md content-center justify-between mt-4 px-2 border-b-zinc-200 border-b-2'>
                <span className='mb-2'>Запланированно: </span>
            </div>

            <div className='flex text-md content-center justify-between my-4 px-2'>
                <span className='mb-2'>Длительность: </span>
            </div>

            <hr className="h- my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className='font-bold flex text-lg content-center justify-between px-2 mb-2'>
                <span className='mb-2'>Участиники</span>
            </div>

            <div className='flex text-md content-center justify-between mt-4 px-2 border-b-zinc-200 border-b-2'>
                <span className='mb-2'>Ученик: </span>
            </div>

            <div className='flex text-md content-center mb-5 justify-between mt-4 px-2'>
                <span className='mb-2'>Учитель: </span>
            </div>

            <hr className="h- my-8 bg-gray-200 border-0 dark:bg-gray-700" />

            <div className='font-bold flex text-lg content-center justify-between mb-2 px-2'>
                <span className='mb-2'>Файлы</span>
            </div>
            <div className=''>
                {getFileTable(lesson.attachment)}
            </div>
        </div>
    </>
    );
}
