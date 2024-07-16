import { TPosition } from "../types";


export const getPositionByIdElem = (id: string, direction: string): TPosition => {
    const wrap = document.getElementById(id)!;
    const pos = wrap?.getBoundingClientRect();
    const posParent = wrap?.offsetParent?.getBoundingClientRect()!;

    const mainScroll = window.scrollY;

    switch (direction) {
        case "right":
            return {
                top:
                    pos.top +
                    (posParent.top < 0
                        ? Math.round(-posParent.top) === Math.round(mainScroll) && posParent.top < 0
                            ? mainScroll
                            : +posParent.top + mainScroll
                        : mainScroll) +
                    (pos.height ?? 26),
                left: pos.left + (pos.width / 4),
                maxWidth: "100%"
            };

        case "left":
            return {
                top:
                    pos.top +
                    (posParent.top < 0
                        ? Math.round(-posParent.top) === Math.round(mainScroll) && posParent.top < 0
                            ? mainScroll
                            : +posParent.top + mainScroll
                        : mainScroll) +
                    (pos.height ?? 26),
                right: 0,
                width: pos.width * 4
            };

        default:
            return {
                top: pos.top,
                right: 0,
                left: 0,
                width: pos.width
            };
    }
};
