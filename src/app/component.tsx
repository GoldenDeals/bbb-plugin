import * as ReactDOM from 'react-dom/client';
import * as React from 'react';
import { useEffect, useState } from 'react';

import {
    FloatingWindow,
    PluginApi,
    BbbPluginSdk,
    NavBarButton,
    NavBarItemPosition,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleFloatingWindowPluginProps } from './types';
import StickyNote from '../float/component';
import enums from '../utils/events';
import { getWindowDimensions } from '../utils/window';

function SampleFloatingWindowPlugin(
    { pluginUuid: uuid }: SampleFloatingWindowPluginProps,
): React.ReactElement {
    const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
    const [isClosed, setIsClosed] = useState(false);

    const handleCloseWindow: EventListener = (
        () => {
            setIsClosed(true);
        }) as EventListener;


    const [wd, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const restoringButton: NavBarButton = new NavBarButton({
            label: "Действия c уроком",
            icon: 'person',
            tooltip: 'Open private notes floating window',
            disabled: false,
            onClick: () => {
                setIsClosed(false);
            },
            position: NavBarItemPosition.RIGHT,
            hasSeparator: true,
        });

        pluginApi.setNavBarItems([restoringButton]);
        if (!isClosed) {
            const floatingWindow = new FloatingWindow({
                top: wd.height / 2 - (192 / 2),
                left: wd.width / 2 - (336 / 2),

                movable: false,
                backgroundColor: '#f1f1f1',
                boxShadow: '2px 2px 10px #777',
                contentFunction: (element: HTMLElement) => {
                    const root = ReactDOM.createRoot(element);
                    root.render(
                        <React.StrictMode>
                            <StickyNote />
                        </React.StrictMode>,
                    );
                },
            });
            pluginApi.setFloatingWindows([floatingWindow]);
        } else {
            pluginApi.setFloatingWindows([]);
        }
    }, [isClosed, wd]);

    useEffect(() => {
        window.addEventListener(enums.SampleFloatingWindow.CLOSE_WINDOW, handleCloseWindow);
        return () => {
            window.removeEventListener(enums.SampleFloatingWindow.CLOSE_WINDOW, handleCloseWindow);
        };
    }, []);

    return null;
}

export default SampleFloatingWindowPlugin;
