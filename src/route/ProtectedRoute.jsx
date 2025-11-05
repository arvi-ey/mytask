import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router'


const ProtectedRoute = () => {
    const [isValid, setIsvalid] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        GetCredential()
    }, [])

    const GetCredential = () => {
        setLoading(true)
        const getToken = localStorage.getItem("userAccessToken")
        const token = JSON.parse(getToken)
        setTimeout(() => {
            setLoading(false)
            if (token && token.expiry > Date.now()) {
                setIsvalid(true)

            }
            else {
                setIsvalid(false)
            }
        }, 2000)

    }



    if (loading) {
        return (
            <div className='w-full h-screen flex justify-center'>
                <div className='font-bold'>Loading ....</div>


            </div>
        )
    }

    if (loading === false && isValid === false) {
        console.log(isValid, "ISVALID")
        return <Navigate to="/" replace />
    }



    return (
        <Outlet />
    )
}

export default ProtectedRoute