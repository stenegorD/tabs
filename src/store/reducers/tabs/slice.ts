import { createSlice } from "@reduxjs/toolkit";
import { tabData } from "../../../utils/constants";
import { findActiveTabId } from "../../../utils/helpers/findActiveTabId";
import { TTab } from "../../../utils/types";

type initialStateType = {
    pinnedTabs: TTab[],
    unpinnedTabs: TTab[],
    activeTabId: number,
    hiddenTabs: TTab[] | []
}

const initialState: initialStateType = {
    pinnedTabs: [],
    unpinnedTabs: tabData,
    activeTabId: 1,
    hiddenTabs: []
};

export const tabsSlice = createSlice({
    name: "tabs",
    initialState,
    reducers: {
        setPinnedTabs: (state, { payload }) => {
            state.pinnedTabs = [...state.pinnedTabs, payload];
            state.unpinnedTabs = state.unpinnedTabs.filter((tab) => tab.id !== payload.id);
        },
        setUnpinnedTabs: (state, { payload }) => {
            state.unpinnedTabs = [...state.unpinnedTabs, payload];
            state.pinnedTabs = state.pinnedTabs.filter((tab) => tab.id !== payload.id);
        },
        setUnpinnedDraggedTabs: (state, { payload }) => {
            state.unpinnedTabs = payload;
        },
        setActiveTabId: (state, { payload }) => {
            state.activeTabId = payload;
        },
        closeTab: (state, { payload }) => {
            state.activeTabId = findActiveTabId(payload);
            state.unpinnedTabs = state.unpinnedTabs.filter((tab) => tab.id !== payload);
            state.hiddenTabs = state.hiddenTabs.filter((tab) => tab.id !== payload);

        },
        setHiddenTabs: (state, { payload }) => {
            if (!payload.isVisible) {
                const isPinnedTab = state.pinnedTabs.find((t) => t.id === payload.tab.id);
                if (!isPinnedTab) {
                    state.hiddenTabs = state.hiddenTabs.filter((t) => t.id !== payload.tab.id);
                    state.hiddenTabs = [...state.hiddenTabs, payload.tab];
                }
            } else {
                state.hiddenTabs = state.hiddenTabs.filter((t) => t.id !== payload.tab.id);
            }
        }
    },

    selectors: {
        getPinnedTabs: (state) => state.pinnedTabs,
        getUnpinnedTabs: (state) => state.unpinnedTabs,
        getActiveTab: (state) => state.activeTabId,
        getHiddenTabs: (state) => state.hiddenTabs,
    }
});

export const { getPinnedTabs, getUnpinnedTabs, getActiveTab, getHiddenTabs } = tabsSlice.selectors;

export const { setPinnedTabs, setUnpinnedTabs, setActiveTabId, closeTab, setHiddenTabs, setUnpinnedDraggedTabs } = tabsSlice.actions;

export default tabsSlice.reducer;