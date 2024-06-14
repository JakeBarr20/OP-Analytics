import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import LifterSlice from "./LifterSlice";
import CompareSlice from "./CompareSlice";

const persistConfig = {
  key: "persist",
  storage,
};

const rootReducer = combineReducers({
  lifter: LifterSlice,
  compare: CompareSlice,
});

export const makeStore = () => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  let store: any = configureStore({
    reducer: persistedReducer,
  });
  store.__persistor = persistStore(store);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
