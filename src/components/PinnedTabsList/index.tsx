import { FiInbox } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getPinnedTabs, setActiveTabId } from "../../store/reducers/tabs";
import { useADispatch, useASelector } from "../../utils/hooks";
import { TPosition } from "../../utils/types";
import s from "./styles.module.scss";

type PinnedTabsListProps = {
    position?: TPosition
}

export default function PinnedTabsList({ position }: PinnedTabsListProps): JSX.Element {
    const dispatch = useADispatch();
    const navigate = useNavigate();
    const pinnedTabs = useASelector(getPinnedTabs);

    const handleActiveTab = (id: number): void => {
        dispatch(setActiveTabId(id));
        const tabPath = pinnedTabs.find((t) => t.id === id)?.path;
        navigate(`/${tabPath}`);
    }

    return (
        <ul style={position} className={s.pinned_tab}>
            {pinnedTabs.length === 0 ? <li><p>{"Empty list"}</p></li> : pinnedTabs.map((t) => <li key={t.id} onClick={() => handleActiveTab(t.id)}><FiInbox size={"16px"} /><p>{t.title}</p></li>)}
        </ul>
    )
}