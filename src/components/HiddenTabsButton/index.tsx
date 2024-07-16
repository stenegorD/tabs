import cn from "classnames";
import { useId, useState } from "react";
import { createPortal } from "react-dom";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { getPositionByIdElem } from "../../utils/helpers";
import { TPosition } from "../../utils/types";
import Button from "../Button";
import HiddenTabsList from "../HiddenTabsList";
import s from "./styles.module.scss";


export default function HiddenTabsButton(): JSX.Element {
    const [position, setPosition] = useState<TPosition | null>(null);
    const refId = useId();

    const handleMouseEnter = (): void => {
        setPosition(getPositionByIdElem(refId, "left"));
    };
    const handleMouseLeave = (): void => {
        setPosition(null);
    };

    return (
        <div id={refId} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Button className={s.hiddenTabs} icon={<MdOutlineKeyboardArrowUp className={cn({ [s.rotate]: position })} size={"16px"} />} />
            {position && createPortal(
                <HiddenTabsList position={position} />,
                document.body
            )}
        </div>

    )
} 