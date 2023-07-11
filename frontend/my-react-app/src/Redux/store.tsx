import { configureStore } from "@reduxjs/toolkit";
import { SupplierReducer } from "./SupplierReducer";


const store = configureStore({
  reducer: {
    Admin: SupplierReducer
  },
});

export default store;

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
