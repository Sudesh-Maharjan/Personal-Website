import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaReacteurope } from "react-icons/fa";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
// import { API_URL } from '../../Config';

// const Education = () => {
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
//                 d && d?.education?.map((ed, i) => (
//                   <VerticalTimelineElement
//                     className="font-bold vertical-timeline-element--work"
//                     date={`${ed.graduationYear}`}
//                     iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
//                     icon={<FaReacteurope />}
//                   >
//                     <h3 className="vertical-timeline-element-title">{ed.degree}</h3>
//                     <h4 className="vertical-timeline-element-subtitle">{ed.institution}</h4>
//                     <p>
//                       {ed.fieldOfStudy}
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
// }

// export default Education
const capitalizeFirstLetter = (str) => {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
};
const Education = ({ education }) => {
  return (
    <div className="container p-10 mt-8 shadow-2xl bg-neutral-600 rounded-xl">
      <VerticalTimeline>
        {education && education.map((ed, i) => (
          <VerticalTimelineElement
            key={i}
            className="font-bold vertical-timeline-element--work"
            date={`${ed.graduationYear}`}
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            icon={<FaReacteurope />}
          >
            <h3 className="vertical-timeline-element-title">{capitalizeFirstLetter(ed.degree)}</h3>
            <h4 className="vertical-timeline-element-subtitle">{capitalizeFirstLetter(ed.institution)}</h4>
            <p>{capitalizeFirstLetter(ed.fieldOfStudy)}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}

export default Education;