import React, { useEffect, useState } from 'react'
import { Cursor } from "react-simple-typewriter"
import Media from './Media'
import { Link as ScrollLink } from "react-scroll"
import { API_URL } from '../../Config'
import axios from 'axios'
import TypewriterEffect from './TypeWriterEffect'
import Accordion from '../accordion/Accordion'

const LeftBanner = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/introduction/personal-info`)  // Replace with your API endpoint
        setData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])
  return (
    <div className="flex flex-col w-full gap-20 lgl:w-1/2">
      {data && data?.map((d) => (
        <div className="flex flex-col gap-5 " key={d.id}>
          <h1 className="font-bold text-black sm:text-5xl lg:text-6xl">
            Hi, I'm <span className="capitalize text-nameColor">{d.name}</span>
          </h1>

          {
            data?.words?.length > 0 ?
              null
              :
              <>
                <h2 className="text-4xl text-black">
                  a <span>
                    <TypewriterEffect
                      words={d.words}
                      typeSpeed={80}  // Typing speed (milliseconds per character)
                      deleteSpeed={100}  // Deleting speed (milliseconds per character)
                      delaySpeed={9000}  // Delay between words (milliseconds)
                    />

                  </span>
                  <Cursor
                    cursorBlinking="false"
                    cursorStyle="|"
                    cursorColor="#ff014f"
                  />
                </h2>
              </>

          }

          <p className="text-base leading-6 tracking-wide font-bodyFont">
            {d.personalIntroduction}
          </p>
          {/* <ScrollLink to="aboutmebanner" className="blueButton" >
            ABOUT ME
          </ScrollLink> */}
          <Accordion />
        </div>
      ))}
      <Media />

    </div>
  )
}

export default LeftBanner