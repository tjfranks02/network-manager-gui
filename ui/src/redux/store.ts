import { configureStore } from "@reduxjs/toolkit"
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import counterReducer from "./reducers/counter";
import activeElementReducer from "./reducers/activeElement";
import currentDraggedElementReducer from "./reducers/currentDraggedElement";

// Redux initialisation
const store: ToolkitStore = configureStore({
  reducer: {
    counter: counterReducer,
    activeElement: activeElementReducer,
    currentDraggedElement: currentDraggedElementReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;