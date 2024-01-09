import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_URL } from '../../Config';

const Skills = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/introduction/personal-info`);
                setData(response.data)
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            className="flex flex-col w-full gap-10 lgl:flex-row lgl:gap-20"
        >
            <div className="w-full lgl:w-1/2">
                <div className="flex flex-col gap-4 py-12 font-titleFont">
                    <p className="text-sm text-designColor tracking-[4px] uppercase">
                        Features
                    </p>
                    <h2 className="text-3xl font-bold md:text-4xl">My Skill</h2>
                </div>
                <div className='className="flex flex-col w-full gap-6 mt-14'>
                    {
                        data && data?.map((d) => (
                            <>

                                {
                                    d && d?.skills?.map((s, i) => (

                                        <>
                                            <div className="overflow-x-hidden">
                                                <p className="text-sm font-medium uppercase">{s.name}</p>
                                                <span className="inline-flex w-full h-2 mt-2 rounded-md bgOpacity">
                                                    <motion.span
                                                        initial={{ x: "-100%", opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ duration: 0.5, delay: 0.5 }}
                                                        className={`w-[90%] h-full bg-gradient-to-r from-blue-600 via-pink-500 to-red-500 rounded-md relative`}
                                                    >
                                                        <span className="absolute right-0 -top-7">{s?.percentage}%</span>
                                                    </motion.span>
                                                </span>
                                            </div>
                                        </>

                                    ))
                                }


                            </>


                        ))
                    }

                </div>

            </div>

        </motion.div>
    );
}

export default Skills