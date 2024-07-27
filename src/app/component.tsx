import * as React from 'react';
import { useEffect, useState } from 'react';

import {
    PluginApi,
    BbbPluginSdk,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleFloatingWindowPluginProps } from './types';
import { getSidebar } from './sidebar';
import { getNavBarItems } from './navbar';

function SampleFloatingWindowPlugin(
    { pluginUuid: uuid }: SampleFloatingWindowPluginProps,
): React.ReactElement {
    const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
    const [isPaused, setIsPaused] = useState(false);
    const [time, setTime] = useState(0)

    const userListOpened = pluginApi
        .useUiData(UserListUiDataNames.USER_LIST_IS_OPEN, { value: true });

    useEffect(() => {
        const navBaritems = getNavBarItems(time, isPaused, () => {
            setIsPaused(!isPaused)
        }, () => { alert("ended") })
        pluginApi.setNavBarItems(navBaritems);

        const interval = setInterval(() => { setTime(time + 1) }, 1000)
        return () => { clearInterval(interval) }
    }, [isPaused, time])


    useEffect(() => {
        const sidebar = getSidebar()
        pluginApi.setGenericContentItems([sidebar])
    }, [])

    return null;
}

export default SampleFloatingWindowPlugin;
