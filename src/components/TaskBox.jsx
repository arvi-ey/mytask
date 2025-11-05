import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { Updatetask, Deletetask } from '../../redux/slices/taskSlicer'

export const TaskBox = ({ data }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    return (
        <div className='size-56 gap-4 relative rounded-lg z-50 shadow-xl flex flex-col items-center cursor-pointer hover:scale-105 bg-amber-50'
            key={data.id}
        >
            <div className='font-bold'>{data?.title.toUpperCase()}</div>
            <div className='overflow-hidden'>{data?.description}</div>
            <div className={`${data.status == "pending" ? "bg-amber-500" : " bg-green-500"} p-1 rounded-md`}>{data.status}</div>
            <div className='w-full flex justify-around'>
                <div className='bg-red-500 rounded-md p-1'

                    onClick={() => setOpenDeleteModal(true)}
                >Delete</div>
                <div className='bg-blue-400 rounded-md p-1'
                    onClick={() => {
                        navigate(`/updateTask/${data.id}`)
                    }}
                >Edit</div>
            </div>

            {
                openDeleteModal &&
                <div className=' w-96 h-50 absolute top-0 bg-gray-200 rounded-2xl  z-50 flex flex-col gap-10 justify-center items-center' >
                    Do you want to delete the task
                    <div className='w-full flex justify-around'>
                        <div className='bg-red-500 p-1 rounded-md'
                            onClick={() => {
                                dispatch(Deletetask(data.id))
                            }}
                        >
                            delete
                        </div>
                        <div className='bg-green-500 p-1 rounded-md'
                            onClick={() => setOpenDeleteModal(false)}
                        >
                            cancel
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}
