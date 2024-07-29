import * as React from 'react';
import { FileI, CustomLesson } from './types';
import { GenericContentSidekickArea, pluginLogger } from 'bigbluebutton-html-plugin-sdk';

import * as ReactDOM from 'react-dom/client';
import { request } from "./fetcher"

export function getSidebar(Id: string, Token: string) {
    const sidebar = new GenericContentSidekickArea({
        name: 'Информация об уроке',
        section: 'Урок',
        buttonIcon: 'test',
        open: false,
        contentFunction: async (element: HTMLElement) => {
            const root = ReactDOM.createRoot(element);
            root.render(
                <React.StrictMode>
                    <GenericContentSidekickExample Id={Id} Token={Token} />
                </React.StrictMode>,
            );
        },
    })

    return sidebar;
}


export function GenericContentSidekickExample({ Id, Token }: { Id: string, Token: string }) {
    pluginLogger.info("Hello from Sidebar", Id, Token)
    const [le, setLess] = React.useState<CustomLesson | null>(null)

    React.useEffect(() => {
        const inter = setInterval(async () => {
            const lesson = await request<CustomLesson>("bbb/lesson", Id, Token)
            pluginLogger.info("Fetched lesson from sidebar")
            setLess(lesson)
        }, 5000)
        return () => { clearInterval(inter) }
    }, [Id, Token])

    if (!le) {
        return (
            <div className="font-xl font-bold flex justify-center content-center w-full h-full ">
                <span>Загрузка...</span>
            </div>
        )
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
                <svg onClick={() => {
                    pluginLogger.warn("Clicked download!!!")
                    window.open("https://api.test.fiveplas.ru/storage/" + file.base64, '_blank').focus();
                }} className="hs-tooltip-toggle h-6 w-6 text-black" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <line x1="12" y1="11" x2="12" y2="17" />  <polyline points="9 14 12 17 15 14" /></svg>
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
                {getStatus(le.lesson.paused)}
            </div>

            <div className='flex text-md content-center justify-between mt-4 px-2 border-b-zinc-200 border-b-2'>
                <span className='mb-2'>Начало: </span>
                <span className='mb-2'> {new Date(le.lesson.time_started * 1000).toLocaleDateString("ru-RU", { weekday: "short", year: "2-digit", month: "2-digit", day: "2-digit" })} </span>
            </div>

            <div className='flex text-md content-center justify-between mt-4 px-2 border-b-zinc-200 border-b-2'>
                <span className='mb-2'>Запланированно: </span>

                <span className='mb-2'> {new Date(le.lesson.planned * 1000).toLocaleDateString("ru-RU", { weekday: "short", year: "2-digit", month: "2-digit", day: "2-digit" })} </span>
            </div>

            <hr className="h- my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className='font-bold flex text-lg content-center justify-between px-2 mb-2'>
                <span className='mb-2'>Участиники</span>
            </div>

            <div className='flex text-md content-center justify-between mt-4 px-2 border-b-zinc-200 border-b-2'>
                <span className='mb-2'>Ученик: </span>
                <span className='mb-2'> {le.child.name} </span>
            </div>

            <div className='flex text-md content-center mb-5 justify-between mt-4 px-2'>
                <span className='mb-2'>Учитель: </span>

                <span className='mb-2'> {le.teacher.name} </span>
            </div>

            <hr className="h- my-8 bg-gray-200 border-0 dark:bg-gray-700" />

            <div className='font-bold flex text-lg content-center justify-between mb-2 px-2'>
                <span className='mb-2'>Файлы</span>
            </div>
            <div className=''>

                {le.lesson.attachment ? getFileTable(le.lesson.attachment) : <span>Нет прикрепленных файлов </span>}
            </div>
        </div>
    </>
    );
}
