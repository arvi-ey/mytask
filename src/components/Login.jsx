import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
const Login = () => {
    const navigate = useNavigate()

    const [state, setState] = useState({
        userName: "",
        password: ""
    })
    const [errortext, setErrorText] = useState({
        userName: "",
        password: ""
    })

    const HandleLoginSubmit = () => {
        if (state.userName.length < 3) {
            setErrorText({ ...errortext, userName: "User Name must be more than 3 character" })
            return
        }
        if (state.password.length < 6) {
            setErrorText({ ...errortext, password: "Password must be more than 6 character" })
            return
        }

        const token = {
            state: `${state.userName} ${state.password}`,
            expiry: Date.now() + 10 * 60 * 1000
        }
        const accessToken = JSON.stringify(token)
        localStorage.setItem("userAccessToken", accessToken)
        navigate("/dashboard")

    }
    // const getToken = localStorage.getItem("userAccessToken")

    return (
        <div className='w-full h-screen flex justify-center items-center gap-5 flex-col'>
            <div className='font-bold text-2xl'>Log IN</div>
            <div className='relative flex flex-col'>
                <input
                    name='userName'
                    type='text'
                    className='border-2 rounded-md p-2 outline-none border-gray-600 w-96'
                    value={state.userName}
                    placeholder='User Name'
                    onChange={(e) => {
                        setState({ ...state, [e.target.name]: e.target.value })
                        setErrorText({ ...errortext, userName: "" })
                    }
                    }
                />
                {
                    errortext?.userName.length > 0 &&
                    <span className='text-red-600'>{errortext.userName}</span>
                }
            </div>
            <div className='relative flex flex-col'>
                <input
                    name="password"
                    type='text'
                    className='border-2 rounded-md p-2 outline-none border-gray-600 w-96'
                    value={state.password}
                    placeholder='Password'
                    onChange={(e) => {
                        setState({ ...state, [e.target.name]: e.target.value })
                        setErrorText({ ...errortext, password: "" })
                    }
                    }
                />
                {
                    errortext?.password.length > 0 &&
                    <span className='text-red-600'>{errortext.password}</span>
                }

            </div>
            <div className='cursor-pointer flex justify-center items-center w-50 bg-sky-700 hover:bg-sky-600 p-2 rounded-md'
                onClick={HandleLoginSubmit}
            >
                <span className='text-white font-semibold'>Submit</span>
            </div>
        </div>
    )
}

export default Login