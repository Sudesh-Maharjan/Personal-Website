import React from 'react'
import { BsPersonLock} from "react-icons/bs"

const AdminDashboardCard = ({title, subtitle}) => {
    return (
        <div className="w-full p-6 md:w-1/2 xl:w-1/3">
            <div className="p-5 border-b-4 border-green-600 rounded-lg shadow-xl bg-gradient-to-b from-green-200 to-green-100">
                <div className="flex flex-row items-center">
                    <div className="flex-shrink pr-4">
                        <div className="p-5 bg-green-600 rounded-full"><BsPersonLock className='text-5xl' /></div>
                    </div>
                    <div className="flex-1 text-right md:text-center">
                        <h2 className="text-3xl font-bold text-black uppercase">{title}</h2>
                        <p className="font-bold ">{subtitle} <span className="text-green-500"></span></p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AdminDashboardCard
