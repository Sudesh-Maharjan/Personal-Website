import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import { API_URL, IMG_URL } from "../../Config";
// import axios from "axios";
import TrainningCard from "./TrainningCard";

// const Trainnings = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/introduction/personal-info`);
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1, transition: { duration: 0.5 } }}
//       className="flex flex-col w-full gap-10 lgl:flex-row lgl:gap-20"
//     >
//       <div>
//         <div className="flex flex-col gap-4 py-6 lgl:py-12 font-titleFont">
//           <p className="text-sm text-designColor tracking-[4px]">1998 - 2010</p>
//           <h2 className="text-3xl font-bold md:text-4xl">Trainnings</h2>
//         </div>
//         <div className="mt-6 lgl:mt-14 w-full h-auto border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
//         {
//             data && data?.map((d) => (
//               <>
//                 {
//                   d && d?.training?.map((t, i) => (
//                     <>
//               <TrainningCard
//               key={i}
//               title={t.title}
//               location={t.institution}
//               subTitle={t.year}
//             />
//              </>
//                   ))}
//               </>
//             ))
//           }
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// export default Trainnings

const Trainnings = ({ trainings }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="flex flex-col w-full gap-10 lgl:flex-row lgl:gap-20"
    >
      <div>
        <div className="flex flex-col gap-4 py-6 lgl:py-12 font-titleFont">
          <p className="text-sm text-designColor tracking-[4px]">1998 - 2010</p>
          <h2 className="text-3xl font-bold md:text-4xl">Trainings</h2>
        </div>
        <div className="flex">
          {trainings && trainings.map((t, i) => (
        <div key={i} className="border-l-[6px] border-l-black border-opacity-30 flex gap-10 ">
            <TrainningCard
              title={t.title}
              location={t.institution}
              subTitle={t.year}
              // resumeCardImg={`${IMG_URL}/${item.gallery[0].photo}`} 
              // des={t.description}
            />
        </div>
          ))}
          </div>
      </div>
    </motion.div>
  );
}

export default Trainnings;
