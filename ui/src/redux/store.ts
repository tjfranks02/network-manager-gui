import { configureStore } from "@reduxjs/toolkit"
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import counterReducer from "./slices/counter";
import activeElementReducer from "./slices/activeElement";

// Redux initialisation
const store: ToolkitStore = configureStore({
  reducer: {
    counter: counterReducer,
    activeElement: activeElementReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;