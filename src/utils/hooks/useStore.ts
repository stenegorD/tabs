import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import type { RootState, AppDispatch } from "../../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useADispatch: () => AppDispatch = useDispatch;
export const useASelector: TypedUseSelectorHook<RootState> = useSelector;
