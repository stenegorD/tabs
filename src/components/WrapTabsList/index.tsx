import cn from "classnames";
import { RefObject, useCallback, useRef, useState } from "react";
import { getActiveTab, getPinnedTabs } from "../../store/reducers/tabs";
import { useASelector } from "../../utils/hooks";
import Tab from "../Tab";
import TabsList from "../TabsList";
import s from "./styles.module.scss";


export default function WrapTabsList() {
    const [shadowView, setShadowView] = useState({ left: false, right: true });
    const pinnedTabs = useASelector(getPinnedTabs);
    const activeTabId = useASelector(getActiveTab);
    const prevScrollX = useRef(0);

    const handleScroll = useCallback((scrollContainerRef: RefObject<HTMLDivElement>): void => {
        if (scrollContainerRef.current) {
            if (scrollContainerRef.current.scrollLeft > prevScrollX.current) {
                if (Math.floor(scrollContainerRef.current.scrollLeft + scrollContainerRef.current.clientWidth) === scrollContainerRef.current.scrollWidth) {
                    setShadowView({ left: true, right: false })
                } else {
                    setShadowView({ left: true, right: true })
                }
            } else if (scrollContainerRef.current.scrollLeft < prevScrollX.current) {
                if (scrollContainerRef.current.scrollLeft === 0) {
                    setShadowView({ left: false, right: true })
                } else {
                    setShadowView({ left: true, right: true })
                }
            }
            prevScrollX.current = scrollContainerRef.current.scrollLeft;
        }
    }, []);

    return (
        <div className={s.wrap_tabs_list}>
            {pinnedTabs.map((t, i: number) => <Tab key={t.id + "pinned-tab"} index={i} tab={t} activeTabId={activeTabId} isDragDisabled={true} />)}
            <div className={cn(s.shadow, { [s.shadow_left]: shadowView.left, [s.shadow_right]: shadowView.right })}>
                <TabsList handleScroll={handleScroll} />
            </div>
        </div>
    )
}