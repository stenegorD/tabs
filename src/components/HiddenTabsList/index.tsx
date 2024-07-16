import { FiInbox } from "react-icons/fi";
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { closeTab, getHiddenTabs, setActiveTabId } from "../../store/reducers/tabs";
import { useADispatch, useASelector } from "../../utils/hooks";
import { TPosition } from "../../utils/types";
import Button from "../Button";
import s from "./styles.module.scss";

type MoreTabsListProps = {
    position: TPosition
}

export default function HiddenTabsList({ position }: MoreTabsListProps): JSX.Element {
    const dispatch = useADispatch();
    const navigate = useNavigate();
    const hiddenTabs = useASelector(getHiddenTabs);

    const handleActiveTab = (id: number): void => {
        dispatch(setActiveTabId(id));
        const tabPath = hiddenTabs.find((t) => t.id === id)?.path;
        navigate(`/${tabPath}`);
    }

    const handleCloseTab = (id: number): void => {
        dispatch(closeTab(id))
    }

    return (
        <ul style={position} className={s.more_tabs}>
            {hiddenTabs.length === 0 ? <li><p>{"Empty list"}</p></li> : hiddenTabs.map((t) => <li key={t.id + "hidden-tab"} onClick={() => handleActiveTab(t.id)}><FiInbox size={"16px"} /><p>{t.title}</p><Button icon={<IoCloseCircle size={"16px"} onClick={() => handleCloseTab(t.id)} />} /></li>)}
        </ul>
    )
} 