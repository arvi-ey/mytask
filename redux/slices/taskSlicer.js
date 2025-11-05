import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    task: null
}
export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        GetAllTasks: (state, action) => {
            state.tasks = action.payload
        },
        AddNewTask: (state, action) => {
            state.tasks = [action.payload, ...state.tasks]
        },
        Deletetask: (state, action) => {
            state.tasks = state.tasks.filter((data) => data.id != action.payload)
        },
        Updatetask: (state, action) => {

            state.tasks = state.tasks.map((data) => data.id == action.payload.id ? action.payload : data)
        },
        GetSingletask: (state, action) => {
            state.task = state.tasks.filter((data) => data.id == action.payload)
        }
    }
})


export const { GetAllTasks, AddNewTask, Deletetask, Updatetask, GetSingletask } = taskSlice.actions
export default taskSlice.reducer
