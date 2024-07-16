import { Draggable } from "@hello-pangea/dnd"
import cn from "classnames"
import { useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { FiInbox } from "react-icons/fi"
import { IoCloseCircle } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { closeTab, setActiveTabId, setPinnedTabs, setUnpinnedTabs } from "../../store/reducers/tabs"
import { getPositionByIdElem } from "../../utils/helpers"
import { useADispatch } from "../../utils/hooks"
import { TPosition, TTab } from "../../utils/types"
import Button from "../Button"
import PinPopup from "../PinPopup"
import s from "./styles.module.scss"

type TabProps = {
    tab: TTab;
    index: number;
    activeTabId: number;
    isDragDisabled?: boolean;
    handleVisibilityChange?: (tab: TTab, isVisible: boolean) => void;
}

export default function Tab({ tab, index, activeTabId, isDragDisabled, handleVisibilityChange }: TabProps): JSX.Element {
    const tabId = useId();
    const refId = useId();
    const dispatch = useADispatch();
    const navigate = useNavigate();
    const [position, setPosition] = useState<TPosition | null>(null);
    const [visibleLevel, setVisibleLevel] = useState<boolean>(false);
    const tabRef = useRef<HTMLParagraphElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const handleTab = (): void => {
        dispatch(setActiveTabId(tab.id));
        navigate(`/${tab.path}`);
    }

    const handleCloseTab = (): void => {
        if (observerRef.current && tabRef.current) {
            observerRef.current.unobserve(tabRef.current);
        }
        dispatch(closeTab(tab.id));
    }

    const handleMouseEnter = (): void => {
        setPosition(getPositionByIdElem(refId, "right"));
    };

    const handleMouseLeave = (): void => {
        setTimeout(() => setPosition(null), 300);
    }

    const handleClickPin = (): void => {
        if (!isDragDisabled) {
            dispatch(setPinnedTabs(tab));

        } else {
            dispatch(setUnpinnedTabs(tab));
        }
        setPosition(null);
    }

    const checkVisibleLevel = (entry: boolean) => {
        setVisibleLevel(entry)
    }

    useEffect(() => {
        if (tab.id === activeTabId && tabRef.current) {
            tabRef.current.scrollIntoView({ behavior: 'smooth', inline: "center" });
        }
    }, [tab, activeTabId]);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    handleVisibilityChange && handleVisibilityChange(tab, entry.isIntersecting);
                    checkVisibleLevel(entry.isIntersecting)
                });
            },
            { root: null, rootMargin: '0px', threshold: 0.6 }
        );

        if (tabRef.current) {
            observerRef.current.observe(tabRef.current);
        }

        return () => {
            if (observerRef.current && tabRef.current) {
                observerRef.current.unobserve(tabRef.current);
            }
        };
    }, [tab]);


    return (
        !isDragDisabled ? <Draggable draggableId={tabId} index={index} isDragDisabled={isDragDisabled} >
            {({ innerRef, draggableProps, dragHandleProps }, snapshot) => (
                <div
                    id={refId}
                    ref={innerRef}
                    {...draggableProps}
                    {...dragHandleProps}
                    style={{ ...draggableProps.style }}
                    className={cn(s.tab, { [s.active]: tab.id === activeTabId, [s.pinned]: isDragDisabled, [s.dragging]: snapshot.isDragging, [s.pointer_events]: !visibleLevel })}
                    onMouseDown={handleTab}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <FiInbox />
                    <p ref={tabRef}>{tab.title}</p>
                    {tab.id === activeTabId ? <Button onClick={handleCloseTab} icon={<IoCloseCircle color={"#EE3F3E"} />} /> : null}
                    {position && createPortal(
                        <PinPopup position={position} isPinned={isDragDisabled} onClick={handleClickPin} />,
                        document.body
                    )}
                </div>
            )
            }
        </Draggable > :
            <div
                id={refId}
                className={cn(s.tab, { [s.active]: tab.id === activeTabId, [s.pinned]: isDragDisabled })}
                onMouseDown={handleTab}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                draggable={false}
            >
                <FiInbox />
                <p >{tab.title}</p>
                {tab.id === activeTabId ? <Button onClick={handleCloseTab} icon={<IoCloseCircle color={"#EE3F3E"} />} /> : null}
                {position && createPortal(
                    <PinPopup position={position} isPinned={isDragDisabled} onClick={handleClickPin} />,
                    document.body
                )}
            </div>
    )
}