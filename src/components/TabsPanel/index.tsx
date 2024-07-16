import HiddenTabsButton from "../HiddenTabsButton";
import PinnedTabsButton from "../PinnedTabsButton";
import WrapTabsList from "../WrapTabsList";
import s from "./styles.module.scss";

export default function TabsPanel(): JSX.Element {
    return (
        <div className={s.wrap_panel}>
            <PinnedTabsButton />
            <WrapTabsList />
            <HiddenTabsButton />
        </div>
    )
}