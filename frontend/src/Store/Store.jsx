import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import AllPostSlice from "./slice/AllPostSlice";
const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        posts:AllPostSlice.reducer
    },
})
export default store