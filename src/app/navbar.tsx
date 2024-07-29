import { NavBarButton, NavBarInfo, NavBarItemPosition, pluginLogger } from "bigbluebutton-html-plugin-sdk";
import { CustomLesson } from "./types";

export function getNavBarItems(time: number, isPaused: boolean, pauseCallback: () => void, endCallback: () => void) {
    const restoringButton: NavBarButton = new NavBarButton({
        label: isPaused ? "Возобновить" : "Пауза",
        icon: isPaused ? 'yellow-pause' : 'green-pause',
        tooltip: isPaused ? "Снять урок с паузы" : 'Поставить урок на паузу',
        disabled: false,
        onClick: pauseCallback,
        position: NavBarItemPosition.RIGHT,
        hasSeparator: false,
    });
    restoringButton.setItemId("pauseBtn")

    const EndButton: NavBarButton = new NavBarButton({
        label: "Завершить",
        icon: 'end-cust',
        tooltip: 'Завершить урок',
        disabled: false,
        onClick: endCallback,
        position: NavBarItemPosition.RIGHT,
        hasSeparator: true,
    });
    EndButton.setItemId("dendBtn")
    const info = new NavBarInfo({
        label: (time < 0 ? "Ждем начала урока" :
            (isPaused ? 'На паузе ' : 'Идет ') + ([Math.floor(time / 60), time % 60].map(x => x < 10 ? '0' + x : x).join(":"))),
        hasSeparator: true,
        position: NavBarItemPosition.CENTER,
    });

    return [restoringButton, EndButton, info]
}
