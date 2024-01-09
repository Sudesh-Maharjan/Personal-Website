import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import FooterBottom from '../footer/FooterBottom'
import axios from 'axios'
import { API_URL, IMG_URL } from '../../Config'
import { useParams } from 'react-router-dom'
import NewsCard from '../layouts/NewsCard'

const NInside = () => {

    const { id } = useParams()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/news/${id}`)
                setData(response?.data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [id])

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }

    return (
        <>
            <Navbar />
            <div className="max-w-screen-xl mx-auto sm:px-4">
                <NewsCard
                    title={data.name}
                    pdate={data.createdAt}
                    udate={data.updatedAt}
                    img={`${IMG_URL}/${data.image}`}
                    desc={data.description}
                    
                />
            </div>
            <Footer />
            <FooterBottom />
        </>
    )
}

export default NInside 
