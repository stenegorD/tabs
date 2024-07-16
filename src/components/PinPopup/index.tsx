import { DetailedHTMLProps, HTMLAttributes } from "react";
import { TbPin, TbPinnedOff } from "react-icons/tb";
import { TPosition } from "../../utils/types";
import s from "./styles.module.scss";

export interface PinPopupProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    isPinned?: boolean;
    position: TPosition;
}

export default function PinPopup({ position, isPinned, ...props }: PinPopupProps): JSX.Element {
    return (
        <div style={position} className={s.popup} {...props}>
            {isPinned ? <><TbPinnedOff size={"16px"} /> Tab unpin </> : <><TbPin size={"16px"} /> Tab pin </>}
        </div>
    )
}