import React from 'react'
import {  Outlet, Navigate } from 'react-router-dom'

import { isAuthenticated } from './index'


const AdminRoute = () => (
    isAuthenticated() && isAuthenticated().user.role === "admin" ?
    <>
    <Outlet/>
    </>
        :
        (
            <Navigate to='/signin' />
        )
)

export default AdminRoute