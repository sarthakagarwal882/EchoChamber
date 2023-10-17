import { createSlice } from '@reduxjs/toolkit'

const AllPostSlice = createSlice({
    name: 'posts',
    initialState: { data: [] },
    reducers: {
        addData(state, action) {
            state.data = [
                ...action.payload]
        }
    },
},
)

export const { addData } = AllPostSlice.actions

export default AllPostSlice
