import axios from 'axios' 
import React, { useEffect, useState } from 'react' 
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai' 
import { API_URL } from '../../Config' 

const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US') 

const renderHobbies = (hobbies) => (
    <div className="">
        <h1 className="text-base font-semibold md:text-left">Hobbies</h1>
        {hobbies.map((h, i) => (
            <React.Fragment key={i}>
                <p className='text-sm font-thin'>{h.name}{i < hobbies.length - 1 && ','}</p>
            </React.Fragment>
        ))}
    </div>
) 

const renderPersonalDetails = (d) => (
    <div className="flex justify-center gap-8 p-4 md:p-8 xs:text-xs " key={d.id}>
        <div className='items-center'>
            {d?.fathersName && (
                <div className="">
                    <h1 className="text-base font-semibold md:text-left">Father Name</h1>
                    <span className='text-sm font-thin'>{d.fathersName}</span>
                </div>
            )}
            {d?.mothersName && (
                <div className="">
                    <h1 className="text-base font-semibold md:text-left">Mother Name</h1>
                    <span className='text-sm font-thin'>{d.mothersName}</span>
                </div>
            )}
            {d?.spouse && (
                <div>
                    <h1 className="text-base font-semibold md:text-left">Spouse</h1>
                    <span className='text-sm font-thin'>{d.spouse}</span>
                </div>
            )}
            {d?.grandfather && (
                <div>
                    <h1 className="text-base font-semibold md:text-left">GrandFather Name</h1>
                    <span className='text-sm font-thin'>{d.grandfather}</span>
                </div>
            )}
            {d?.grandmother && (
                <div>
                    <h1 className="text-base font-semibold md:text-left">GrandMother Name</h1>
                    <span className='text-sm font-thin'>{d.grandmother}</span>
                </div>
            )}
        </div>
        <div className='items-center'>
            {d?.address && (
                <div>
                    <h1 className="text-base font-semibold md:text-left">Address</h1>
                    <span className='text-sm font-thin'>{d.address}</span>
                </div>
            )}
            {d?.dob && (
                <div>
                    <h1 className="text-base font-semibold md:text-left">Date Of Birth</h1>
                    <span className='text-sm font-thin'>{formatDate(d.dob)}</span>
                </div>
            )}
            {d?.hobby && d?.hobby.length > 0 && renderHobbies(d.hobby)}
        </div>
    </div>
) 

const Accordion = () => {
    const [data, setData] = useState([]) 
    const [isOpen, setIsOpen] = useState(false) 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `${API_URL}/introduction/personal-info` 
                const response = await axios.get(apiUrl) 
                setData(response.data) 
            } catch (error) {
                console.error('Error fetching data:', error) 
            }
        } 
        fetchData() 
    }, []) 

    const toggleAccordion = () => {
        setIsOpen(!isOpen) 
    } 

    return (
        <div className="container mx-auto my-4 xl:my-8">
            <div className="w-full mb-4 shadow-md lg:w-2/3 xs:w-full">
                <button
                    onClick={toggleAccordion}
                    className="flex items-center justify-center w-full text-xl font-semibold focus:border-black focus:outline-none"
                >
                    Personal Details {isOpen ? <AiOutlineUp className='ml-2' /> : <AiOutlineDown className='ml-2' />}
                </button>
                <div
                    className={`relative overflow-hidden transition-all ease-out duration-300 ${isOpen ? 'max-h-full' : 'max-h-0'
                        }`}
                >
                    {data?.map(renderPersonalDetails)}
                </div>
            </div>
        </div>
    ) 
} 

export default Accordion 
