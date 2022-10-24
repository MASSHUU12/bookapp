import { useContext } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { dispatchStateContext, globalStateContext } from 'App';
import type { RootState, AppDispatch } from 'app/store';

// Use throughout app instead of plain `useDispatch` and `useSelector`.
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useGlobalState = () => [
  useContext(globalStateContext),
  useContext(dispatchStateContext),
];
