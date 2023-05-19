import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import userReducer from "../redux/states/user.state";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

setupListeners(store.dispatch);
