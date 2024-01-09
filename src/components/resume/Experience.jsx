import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaReacteurope } from "react-icons/fa";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
// import { API_URL } from "../../Config";

// const Experience = () => {
//   const customDateColorClass = "text-white";
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/introduction/personal-info`);
//         setData(response.data)
//       } catch (error) {
//         console.log("Error fetching data", error);
//       }
//     };
//     fetchData();
//   }, []);
//   return (
//     <div className="container p-10 mt-8 shadow-2xl bg-neutral-600 rounded-xl">
//       <VerticalTimeline>
//         {
//           data && data?.map((d) => (

//             <>

//               {
//                 d && d?.experience?.map((e, i) => (
//                   <VerticalTimelineElement
//                     className="vertical-timeline-element--work font-poppins"
//                     date={`${e.startDate}-${e.endDate}`}
//                     dateClassName={customDateColorClass} 
//                     iconStyle={{ background: "#525252", color: "#fff" }}
//                     icon={<FaReacteurope />}
//                   >
//                     <h3 className="font-bold vertical-timeline-element-title">{e.jobTitle}</h3>
//                     <h4 className="vertical-timeline-element-subtitle">
//                       {e.company}
//                     </h4>
//                     <p>
//                       {e.description}
//                     </p>
//                   </VerticalTimelineElement>
//                 ))
//               }
//             </>
//           ))
//         }

//       </VerticalTimeline>
//     </div>
//   );
// };

// export default Experience;
const capitalizeFirstLetter = (str) => {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
};

const Experience = ({ experience }) => {
  const customDateColorClass = "text-white";

  return (
    <div className="container p-10 mt-8 shadow-2xl bg-neutral-600 rounded-xl">
      <VerticalTimeline>
        {experience && experience.map((e, i) => (
          <VerticalTimelineElement
            key={i}
            className="vertical-timeline-element--work font-poppins"
            date={`${e.startDate}-${e.endDate}`}
            dateClassName={customDateColorClass}
            iconStyle={{ background: "#525252", color: "#fff" }}
            icon={<FaReacteurope />}
          >
            <h3 className="font-bold vertical-timeline-element-title">{capitalizeFirstLetter(e.jobTitle)}</h3>
            <h4 className="vertical-timeline-element-subtitle">
              {capitalizeFirstLetter(e.company)}
            </h4>
            <p>
              {capitalizeFirstLetter(e.description)}
            </p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Experience;