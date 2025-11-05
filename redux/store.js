import { configureStore } from '@reduxjs/toolkit'
import taskSlice from './slices/taskSlicer'

export const store = configureStore({
    reducer: {
        tasks: taskSlice,
    },
})

