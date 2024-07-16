import { useId, useState } from "react";
import { createPortal } from "react-dom";
import { FiInbox } from "react-icons/fi";
import { getPositionByIdElem } from "../../utils/helpers";
import { TPosition } from "../../utils/types";
import Button from "../Button";
import PinnedTabsList from "../PinnedTabsList";
import s from "./styles.module.scss";


export default function PinnedTabsButton(): JSX.Element {
    const [position, setPosition] = useState<TPosition>();
    const refId = useId();

    const handleMouseEnter = (): void => {
        setPosition(getPositionByIdElem(refId, "right"));
    };
    const handleMouseLeave = (): void => {
        setPosition(undefined);
    };

    return (
        <div id={refId} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Button className={s.pinnedTabs} icon={<FiInbox size={"16px"} />} />
            {position && createPortal(
                <PinnedTabsList position={position} />,
                document.body
            )}
        </div>
    )
}