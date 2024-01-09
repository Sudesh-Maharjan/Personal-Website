import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { API_URL } from '../../../Config';

const ADLogin = () => {
    const [data, setData] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/introduction/personal-info`);
            setData(response.data);
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/user/signin`, {
                username,
                password,
            });

            // Handle successful login response (you may want to save tokens, user info, etc.)
            console.log('Login successful:', response.data);
        } catch (error) {
            // Handle login error
            console.error('Error during login:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="p-4 sm:p-20 bg-purple-900">
                <div className="min-h-screen sm:flex sm:flex-row justify-center bg-gray-900 p-5 sm:p-20 rounded-3xl shadow-xl">
                    <div className="flex-col flex self-center lg:p-10 sm:max-w-5xl xl:max-w-lg z-10">
                        <div className="self-start hidden lg:flex flex-col text-white">
                            <div className="flex items-center mb-5">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Eo_circle_purple_letter-a.svg/2048px-Eo_circle_purple_letter-a.svg.png"
                                    alt="Aji Logo"
                                    className="w-10"
                                />
                                {
                                    data && data?.map((d) => (
                                        <h3 key={d} className="text-3xl font-semibold ml-2">{d.name}</h3>
                                    ))
                                }
                            </div>


                            <h1 className="my-3 font-semibold text-4xl">Welcome back  </h1>

                            <p className="pr-3 text-sm opacity-75">
                                Lorem ipsum is placeholder text commonly used in the graphic, print,
                                and publishing industries for previewing layouts and visual mockups
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center self-center z-10">
                        <div className="p-12 bg-gray-800 mx-auto rounded-3xl w-96">
                            <div className="col-start-2 border border-black-300 shadow-xl mt-20 py-20 px-10 bg-white rounded-md">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="rounded-md block w-full border border-black-200 py-3 px-2 mb-5"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="rounded-md block w-full border border-black-200 py-3 px-2 mb-5"
                                />
                                <button
                                    type="button"
                                    onClick={handleLogin}
                                    className="block w-full bg-green-700 text-white rounded-md py-3 px-2 mb-5"
                                >
                                    Login
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ADLogin
