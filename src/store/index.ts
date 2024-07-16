import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { tabsSlice } from "./reducers/tabs";


const rootReducer = combineReducers({
    tabs: tabsSlice.reducer,

});

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["tabs"]
};

const reducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
