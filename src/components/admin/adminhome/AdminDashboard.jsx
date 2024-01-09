import React from 'react'
import AdminNavbar from '../adminnavbar/AdminNavbar'
import AdminSidebar from '../adminsidebar/AdminSidebar'

const AdminDashboard = () => {
    return (
        <div>
            <AdminNavbar />
            <div className="flex flex-col md:flex-row">
                <AdminSidebar />
                

            </div>

        </div>



    )
}

export default AdminDashboard
