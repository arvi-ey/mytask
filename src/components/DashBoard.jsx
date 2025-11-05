import React, { useEffect, useState } from 'react'
import { TaskBox } from './TaskBox'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllTasks, AddNewTask, Deletetask, Updatetask } from '../../redux/slices/taskSlicer'



export const DashBoard = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { tasks } = useSelector((state) => state.tasks)


    useEffect(() => {
        GetTaks()
    }, [])



    const DemoTask = [
        {
            title: "New Task",
            description: "Random description",
            status: "pending",
            id: "1786531835831"
        },
        {
            title: "New Task",
            description: "Random description",
            status: "complete",
            id: "17865948374301"
        },
        {
            title: "New Task",
            description: "Random description",
            status: "complete",
            id: "1786519587492301"
        },
    ]





    const GetTaks = () => {
        if (tasks && tasks.length > 0) return
        else {
            dispatch(GetAllTasks(DemoTask))
        }
    }



    const OnLogOut = () => {
        localStorage.removeItem("userAccessToken")
        navigate("/")
    }


    return (
        <div className='w-full h-screen pl-5'>
            <div className='w-[95%] flex justify-end mt-2 '>
                <div className='w-20 p-2 rounded-md flex  bg-red-500 justify-center cursor-pointer hover:bg-red-400'
                    onClick={OnLogOut}
                >
                    <span>
                        Log Out
                    </span>
                </div>
            </div>
            <h1 className='font-extrabold text-2xl opacity-70'>My Tasks</h1>
            <h1 className='font-semibold  opacity-70 mt-6 cursor-pointer'
                onClick={() => navigate("/addtask")}
            >+Add new task</h1>
            <div className='flex px-1 flex-wrap gap-5 mt-5' >
                {
                    tasks?.map((data, index) => {
                        return (
                            <TaskBox
                                data={data}

                            />
                        )
                    })

                }
            </div>
        </div>
    )
}
