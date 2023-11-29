import React from 'react'

const AdminFieldTitle = ({title}) => {
    return (
        <div className="bg-gray-800 pt-14">
            <div className="p-4 text-2xl text-white shadow rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800">
                <h1 className="pl-2 font-bold">{title}</h1>
            </div>
        </div>
    )
}

export default AdminFieldTitle
