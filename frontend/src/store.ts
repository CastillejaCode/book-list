import { configureStore } from "@reduxjs/toolkit";
import { bookApi, bookSearchApi } from "./services/books.js";
import toggleReducer from "./features/toggleSlice.js";
import sortReducer from "./features/sortSlice.js";
import undoReducer from "./features/undoSlice.js";
import searchReducer from "./features/searchSlice.js";
import notificationReducer from "./features/notificationSlice.js";
import userReducer from "./features/userSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    search: searchReducer,
    undo: undoReducer,
    sort: sortReducer,
    toggle: toggleReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [bookSearchApi.reducerPath]: bookSearchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware, bookSearchApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
