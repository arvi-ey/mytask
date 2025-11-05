import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddNewTask, Updatetask, GetSingletask } from '../../redux/slices/taskSlicer'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router'

const TaskForm = () => {
    const dispatch = useDispatch()
    const { task } = useSelector((state) => state.tasks)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [taskdata, settaskdata] = useState({
        title: "",
        description: "",
        status: "pending",
        id: ""
    })
    const { id } = useParams()


    useEffect(() => {
        dispatch(GetSingletask(id))
    }, [id])

    useEffect(() => {
        if (task?.length > 0) settaskdata(task[0])
    }, [task])


    const [errortext, setErrorText] = useState({
        title: "",
        description: "",
        status: ""
    })
    const HandleLoginSubmit = () => {
        if (taskdata.title.length < 3) {
            setErrorText({ ...errortext, title: "Title must be more than 3 character" })
            return
        }
        if (taskdata.description.length < 10) {
            setErrorText({ ...errortext, description: "Description must be more than 10 character" })
            return
        }
        setLoading(true)
        const taskobj = { ...taskdata, id: Date.now().toString() }

        if (id) dispatch(Updatetask(taskdata))
        else dispatch(AddNewTask(taskobj))

        setTimeout(() => {
            setLoading(false)
            navigate("/dashboard")
        }, 1000)


    }


    return (
        <div className='w-full h-screen flex flex-col gap-7 justify-center items-center'>
            <div className='relative flex flex-col'>
                <input
                    name='title'
                    type='text'
                    className='border-2 rounded-md p-2 outline-none border-gray-600 w-96'
                    value={taskdata.title}
                    placeholder='Task title'
                    onChange={(e) => {
                        settaskdata({ ...taskdata, [e.target.name]: e.target.value })
                        setErrorText({ ...errortext, title: "" })
                    }
                    }
                />
                {
                    errortext?.title.length > 0 &&
                    <span className='text-red-600'>{errortext.title}</span>
                }
            </div>
            <div className='relative flex flex-col'>
                <textarea
                    name="description"
                    type='text'
                    className='border-2 rounded-md p-2 outline-none border-gray-600 w-96'
                    value={taskdata.description}
                    placeholder='Task Description'
                    onChange={(e) => {
                        settaskdata({ ...taskdata, [e.target.name]: e.target.value })
                        setErrorText({ ...errortext, settaskdata: "" })
                    }
                    }
                />
                {
                    errortext?.description.length > 0 &&
                    <span className='text-red-600'>{errortext.description}</span>
                }

            </div>
            <div className='relative flex flex-col'>
                <select
                    name="status"
                    className='border-2 rounded-md p-2 outline-none border-gray-600 w-96'
                    value={taskdata.status}
                    onChange={(e) => {
                        settaskdata({ ...taskdata, [e.target.name]: e.target.value })
                    }
                    }
                >
                    <option>pending</option>
                    <option>complete</option>
                </select>


            </div>
            <div className='cursor-pointer flex justify-center items-center w-50 bg-sky-700 hover:bg-sky-600 p-2 rounded-md'
                onClick={HandleLoginSubmit}
            >
                {
                    loading ?
                        <span className='text-white font-semibold'>Loading....</span>
                        :
                        <span className='text-white font-semibold'>Submit</span>
                }
            </div>

        </div>
    )
}

export default TaskForm