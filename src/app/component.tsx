import * as React from 'react';
import { useEffect, useState } from 'react';

import {
    PluginApi,
    BbbPluginSdk,
    pluginLogger,
} from 'bigbluebutton-html-plugin-sdk';
import { CustomLesson, SampleFloatingWindowPluginProps, getWindowDimensions } from './types';
import { getSidebar } from './sidebar';
import { getNavBarItems } from './navbar';
import { request } from './fetcher';
import { getContinuePopup } from './continue';

function SampleFloatingWindowPlugin(
    { pluginUuid: uuid }: SampleFloatingWindowPluginProps,
): React.ReactElement {
    BbbPluginSdk.initialize(uuid)
    const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
    const [isPaused, setIsPaused] = useState(false);
    const [time, setTime] = useState(0)
    const [less, setLesson] = useState<CustomLesson | null>(null)

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const [Token, setToken] = useState("")
    const [Id, setID] = useState("")
    const [continueOpen, setContinueOpen] = useState(false)

    const meetingDataReq = pluginApi.useMeeting();
    const userDataReq = pluginApi.useCurrentUser();

    React.useEffect(() => {
        const userData = userDataReq?.data
        const meetingData = meetingDataReq?.data

        if (meetingData && userData) {
            pluginLogger.info("Data ", userData, meetingData)
            setToken(userData.userId)
            //@ts-ignore
            setID(meetingData.meetingId)
        }
    }, [meetingDataReq, userDataReq]);

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        const inter = setInterval(async () => {
            const lesson = await request<CustomLesson>("bbb/lesson", Id, Token)
            if (!lesson) {
                pluginLogger.warn("No lesson")
                return
            }
            setLesson(lesson)

            //pluginLogger.info("New lesson", lesson)
            if (lesson.lesson.time_ended !== 0) {
                window.location.href = "https://www.test.fiveplas.ru/account"
            }

            if (lesson.lesson.paused_by_end) {
                setContinueOpen(true)
            }

            const realPause = lesson.lesson.paused || lesson.lesson.paused_by_end
            setIsPaused(realPause)

            if (realPause) {
                setTime((Math.floor(Date.now() / 1000)) - lesson.lesson.last_pause)
            } else {
                setTime((lesson.lesson.time_started + lesson.lesson.expected_time + lesson.lesson.time_erased) - (Math.floor(Date.now() / 1000)))
            }
        }, 1000)

        return () => { clearInterval(inter) }
    }, [Id, Token])

    useEffect(() => {
        const navBaritems = getNavBarItems(time, isPaused, async () => {
            setIsPaused(!isPaused)

            const lesson = await request<CustomLesson>("bbb/pause", Id, Token)
            setLesson(lesson)
        }, async () => {
            const lesson = await request<CustomLesson>("bbb/end", Id, Token)
            setLesson(lesson)

            window.location.href = "https://www.test.fiveplas.ru/account"
        })
        pluginApi.setNavBarItems(navBaritems);
    }, [isPaused, time, Id, Token])


    useEffect(() => {
        const sidebar = getSidebar(Id, Token)
        pluginApi.setGenericContentItems([sidebar])
    }, [Id, Token])

    // FIXME: Починить sidebar
    // DONE: Таймер на паузе/в процессе 
    // DONE: Скачивание файлов
    // DONE: Продление
    // DONE: Снимаю/Ставлю на паузу таймер отприцателен
    // DONE: Модалка продления моргает 
    // DONE: Закончить в модалке 
    // DONE: При завершении крашит у другово 
    // DONE: При редиректе правильный адрес
    // TODO: Обработка ошибок в Continue
    // DONE: Time started 0


    useEffect(() => {
        if (continueOpen) {
            const popup = getContinuePopup(windowDimensions.width, windowDimensions.height, Id, Token, () => { setContinueOpen(false) })

            pluginApi.setFloatingWindows([popup])
        }
    }, [windowDimensions, Id, Token, continueOpen])

    return null;
}

export default SampleFloatingWindowPlugin;
