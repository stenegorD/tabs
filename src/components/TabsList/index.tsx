import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { RefObject, useCallback, useRef } from 'react';
import { getActiveTab, getUnpinnedTabs, setHiddenTabs, setUnpinnedDraggedTabs } from "../../store/reducers/tabs";
import { useADispatch, useASelector } from "../../utils/hooks";
import { TTab } from '../../utils/types';
import Tab from '../Tab';
import s from "./styles.module.scss";

type TabsListProps = {
    handleScroll: (ref: RefObject<HTMLDivElement>) => void
}

export default function TabsList({ handleScroll }: TabsListProps): JSX.Element {
    const dispatch = useADispatch();
    const unpinnedTabs = useASelector(getUnpinnedTabs);
    const activeTabId = useASelector(getActiveTab);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const handleDragEnd = (result: DropResult): void => {
        if (!result.destination) return;

        const newUnpinnedTabs = Array.from(unpinnedTabs);
        const [reorderedCard] = newUnpinnedTabs.splice(result.source.index, 1);
        newUnpinnedTabs.splice(result.destination.index, 0, reorderedCard);
        dispatch(setUnpinnedDraggedTabs(newUnpinnedTabs));
    };

    const handleVisibilityChange = useCallback((tab: TTab, isVisible: boolean) => {
        dispatch(setHiddenTabs({ tab, isVisible }))
    }, [])

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable-list" direction="horizontal">
                {(provided) => (
                    <div
                        ref={(el) => {
                            scrollContainerRef.current = el;
                            provided.innerRef(el);
                        }}
                        {...provided.droppableProps}
                        className={s.wrap_tabs}
                        onScroll={() => handleScroll(scrollContainerRef)}
                    >
                        {unpinnedTabs.map((t, i: number) => <>
                            <Tab key={t.id + "unpinned-tab"} index={i} tab={t} activeTabId={activeTabId} isDragDisabled={false} handleVisibilityChange={handleVisibilityChange} />
                            {i < unpinnedTabs.length - 1 && <span className={s.pseudo_line}></span>}
                        </>)}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

