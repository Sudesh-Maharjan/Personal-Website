import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import FooterBottom from '../footer/FooterBottom'
import NewsCard from '../layouts/NewsCard'
import axios from 'axios'
import { API_URL, IMG_URL } from '../../Config'
import { useParams } from 'react-router-dom'
import BusinessCard from '../layouts/BusinessCard'

const BInside = () => {

    const { id } = useParams()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/business/${id}`)
                setData(response.data)
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
                <BusinessCard
                    title={data.name}
                    sdate={data.startDate}
                    edate={data.endDate}
                    img={`${IMG_URL}/${data.image}`}
                    desc={data.description}
                />
            </div>
            <Footer />
            <FooterBottom />
        </>
    )
}

export default BInside 
