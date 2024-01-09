import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '.'

const UserRoute = () => (
    isAuthenticated() && isAuthenticated().user.role=== "user" ?
    <Outlet />
    :
    <Navigate to='signin'/>
)

export default UserRoute