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

function SampleFloatingWindowPlugin(
    { pluginUuid: uuid }: SampleFloatingWindowPluginProps,
): React.ReactElement {
    BbbPluginSdk.initialize(uuid)
    const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
    const [isPaused, setIsPaused] = useState(false);
    const [time, setTime] = useState(0)
    const [less, setLesson] = useState<CustomLesson>()

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const [Token, setToken] = useState("")
    const [Id, setID] = useState("")

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
            setLesson(lesson)

            //pluginLogger.info("New lesson", lesson)

            const realPause = lesson.lesson.paused || lesson.lesson.paused_by_end
            if (realPause == isPaused) {
                pluginLogger.info("Changed is paused to ", realPause)
                setIsPaused(realPause)
            }

            let realTime = (Math.floor(Date.now() / 1000)) - (less.lesson.time_started + less.lesson.expected_time)
            if (isPaused) {
                realTime = (Math.floor(Date.now() / 1000)) - less.lesson.last_pause
            }

            pluginLogger.info("Real Time ", realTime)

            setTime(realTime)
        }, 1000)

        return () => { clearInterval(inter) }
    }, [Id, Token])

    useEffect(() => {
        const navBaritems = getNavBarItems(time, isPaused, async () => {
            setIsPaused(!isPaused)

            const lesson = await request<CustomLesson>("bbb/pause", Id, Token)
            setLesson(lesson)
        }, async () => {
            alert("ended")

            const lesson = await request<CustomLesson>("bbb/end", Id, Token)
            setLesson(lesson)

            window.location.href = "https://www.fiveplas.ru/profile"
        })
        pluginApi.setNavBarItems(navBaritems);

    }, [isPaused, time, Id, Token])


    useEffect(() => {
        const sidebar = getSidebar(Id, Token, isPaused)
        pluginApi.setGenericContentItems([sidebar])
    }, [Id, Token, isPaused])


    //useEffect(() => {
    //    if (lesson.lesson.paused_by_end) {
    //        const popup = getContinuePopup(windowDimensions.width, windowDimensions.height)
    //        pluginApi.setFloatingWindows([popup])
    //    }
    //}, [windowDimensions, ])

    return null;
}

export default SampleFloatingWindowPlugin;
