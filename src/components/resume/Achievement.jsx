import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ResumeCard from "./ResumeCard";
import axios from "axios";
import { API_URL } from "../../Config";

const Achievement = () => {
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
  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="flex flex-col w-full gap-10 lgl:flex-row lgl:gap-20"
    >
      <div>
        <div className="flex flex-col gap-4 py-6 lgl:py-12 font-titleFont">
          <p className="text-sm text-designColor tracking-[4px]">1998 - 2010</p>
          <h2 className="text-3xl font-bold md:text-4xl">Company Achievements</h2>
        </div>
        <div className="mt-6 lgl:mt-14 w-full h-auto border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
          {
            data && data?.map((d) => (
              <>
                {
                  d && d?.achievement?.map((a, i) => (
                    <>
                      <ResumeCard
                        key={i}
                        title={capitalizeFirstLetter(a.title)}
                        subTitle={a.year}
                        // resumeCardImg={`${IMG_URL}/${item.gallery[0].photo}`} 
                        des={a.issuer}
                      />
                    </>
                  ))}
              </>
            ))
          }
        </div>
      </div>
    </motion.div>
  );
}

export default Achievement;

