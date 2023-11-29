import React, { useState, useEffect } from 'react';
import { MdOutlineDeleteForever } from "react-icons/md";
import axios from 'axios';
import { API_URL } from '../../../Config';
function AdminPersonalUpdate() {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        address: '',
        title: '',
        personalIntroduction: '',
        profilePic: null,
        words: [],
        email: '',
        fathersName: '',
        mothersName: '',
        grandfather: '',
        grandmother: '',
        spouse: '',
        education: [],
        experience: [],
        hobby: [],
        skills: [],
        showAchievement: true,
        achievement: [],
    });
    useEffect(() => {
        // Fetch the existing data for the user using the ID from the URL parameter
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/introduction/personal-info/655c9b4a97b95227f015787c`
                );
                setFormData(response.data); // Assuming the response contains the user data
            } catch (error) {
                console.error('Error fetching personal info:', error);
            }
        };
        fetchData();
    }, []);
    const removeItem = (index, category) => {
        const updatedData = { ...formData };
        updatedData[category].splice(index, 1);
        setFormData(updatedData);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'personalIntroduction') {
            console.log(formData)
            setFormData((prevData) => ({
                ...prevData,
                personalIntroduction: value,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profilePic: file });
    };
    const addEducation = () => {
        setFormData({
            ...formData,
            education: [
                ...formData.education,
                {
                    degree: '',
                    institution: '',
                    fieldOfStudy: '',
                    graduationYear: '',
                },
            ],
        });
    };
    //   const handleItemChange = (e, field, index) => {
    //     const updatedData = { ...formData };
    //     updatedData[field][index][e.target.name] = e.target.value;
    //     setFormData(updatedData);
    //   };
    const handleHobbyChange = (e, feild, index) => {
        const updatedHobby = [...formData.hobby];
        updatedHobby[index] = {
            ...updatedHobby[index],
            [feild]: e.target.value
        }
        setFormData({ ...formData, hobby: updatedHobby });
    };
    const handleExperienceChange = (e, feild, index) => {
        const updatedExperience = [...formData.experience];
        updatedExperience[index] =
        {
            ...updatedExperience[index],
            [feild]: e.target.value,
        }
        setFormData({ ...formData, experience: updatedExperience });
    };
    const handleSkillsChange = (e, field, index) => {
        const updatedSkills = [...formData.skills];
        updatedSkills[index] = {
            ...updatedSkills[index],
            [field]: e.target.value,
        };
        setFormData({ ...formData, skills: updatedSkills });
    };
    const addSkill = () => {
        setFormData({
            ...formData,
            skills: [...formData.skills, { name: '', percentage: '' }],
        });
    };
    const handleEducationChange = (e, field, index) => {
        const updatedEducation = [...formData.education];
        updatedEducation[index] = {
            ...updatedEducation[index],
            [field]: e.target.value,
        };
        setFormData({
            ...formData,
            education: updatedEducation,
        });
    };
    const addExperience = () => {
        setFormData({
            ...formData,
            experience: [
                ...formData.experience,
                {
                    jobTitle: '',
                    company: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
        });
    };
    const addHobby = () => {
        setFormData({
            ...formData,
            hobby: [
                ...formData.hobby,
                {
                    name: '',
                },
            ],
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataForRequest = new FormData();
        for (const key in formData) {
            if (key === 'words') {
                formData[key].forEach((word, index) => {
                    formDataForRequest.append(`${key}[${index}]`, word);
                });
            } else if (Array.isArray(formData[key])) {
                formData[key].forEach((item, index) => {
                    for (const field in item) {
                        formDataForRequest.append(`${key}[${index}][${field}]`, item[field]);
                    }
                });
            } else {
                formDataForRequest.append(key, formData[key]);
            }
        }
        console.log(formData);
        try {
            await axios.put(
                `${API_URL}/introduction/personal-info/655c9b4a97b95227f015787c`,
                formDataForRequest,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log('Personal info updated.');
            // You can handle success or navigation here
        } catch (error) {
            console.error('Error updating personal info:', error);
        }
    };
    const addWord = () => {
        setFormData({
            ...formData,
            words: [...formData.words, ''], // Add an empty string for a new word
        });
    };
    useEffect(() => {
        console.log('Updated Data:', formData);
    }, [formData]);
    const handleAchievementChange = (e, field, index) => {
        const updatedAchievement = [...formData.achievement];
        updatedAchievement[index] = {
            ...updatedAchievement[index],
            [field]: e.target.value,
        };
        setFormData({ ...formData, achievement: updatedAchievement });
    };
    const addAchievement = () => {
        setFormData({
            ...formData,
            achievement: [
                ...formData.achievement,
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
        });
    };
    const handleTrainingChange = (e, field, index) => {
        const updatedTraining = [...formData.training];
        updatedTraining[index] = {
            ...updatedTraining[index],
            [field]: e.target.value,
        };
        setFormData({ ...formData, training: updatedTraining });
    };
    const addTraining = () => {
        setFormData({
            ...formData,
            training: [
                ...formData.training,
                {
                    title: '',
                    institution: '',
                    year: '',
                },
            ],
        });
    };
    const handleWordsChange = (e, index) => {
        const updatedWords = [...formData.words];
        updatedWords[index] = e.target.value;
        setFormData((prevData) => ({ ...prevData, words: updatedWords }));
    };
    return (
        <>

            <div className="flex justify-center flex-auto p-4">
                <form className='mt-1'>
                    <div className="grid gap-3 mt-8 mb-6 md:grid-cols-2">
                        <div className="">

                            <div className="grid gap-6 mt-8 mb-6 md:grid-cols-2 ">
                                <div>
                                    <label
                                        htmlFor="full_name"
                                        className="formLable">Full name</label>
                                    <input
                                        id="full_name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="formInput "

                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="dob"
                                        className="formLable">Date of Birth</label>
                                    <input
                                        id="dob"
                                        type="date"
                                        name="dob"
                                        value={formData?.dob?.split('T')[0]}
                                        onChange={handleInputChange}
                                        className="formInput "
                                    />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email" className="singleFormLabel">Email address</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="singleFormInput"
                                />
                            </div>
                            <div className="grid gap-6 mt-8 mb-6 md:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="address"
                                        className="formLable">Address</label>
                                    <input
                                        id="address"
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="formInput "
                                        placeholder="Address"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="fathersName"
                                        className="formLable">Father's Name</label>
                                    <input
                                        id="address"
                                        type="text"
                                        name="fathersName"
                                        value={formData.fathersName}
                                        onChange={handleInputChange}
                                        className="formInput "
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="mothersName"
                                        className="formLable">Mothers's Name</label>
                                    <input
                                        id="address"
                                        type="text"
                                        name="mothersName"
                                        value={formData.mothersName}
                                        onChange={handleInputChange}
                                        className="formInput "
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="spouseName"
                                        className="formLable">Spouse's Name</label>
                                    <input
                                        id="spouse"
                                        type="text"
                                        name="spouse"
                                        value={formData.spouse}
                                        onChange={handleInputChange}
                                        className="formInput "
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="grandFathersName"
                                        className="formLable">Grandfather's Name</label>
                                    <input
                                        id="address"
                                        type="text"
                                        name="grandfather"
                                        value={formData.grandfather}
                                        onChange={handleInputChange}
                                        className="formInput "
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="grandMothersName"
                                        className="formLable">GrandMother's Name</label>
                                    <input
                                        id="address"
                                        type="text"
                                        name="grandmother"
                                        value={formData.grandmother}
                                        onChange={handleInputChange}
                                        className="formInput "
                                    />
                                </div>

                                <div >
                                    <label
                                    htmlFor="hobby"
                                    className="formLable">Words:</label>
                                    {formData?.words?.map((word, index) => (
                                        <div className="flex flex-auto gap-1 m-1">
                                            <div key={index}>
                                                <input
                                                    type="text"
                                                    value={word}
                                                    onChange={(e) => handleWordsChange(e, index)}
                                                    placeholder="Word"
                                                    className="formInput "
                                                />
                                            </div>
                                            <button type="button" className='-mt-0 bg-red-600 addButton' onClick={() => removeItem(index, 'words')}>
                                                <MdOutlineDeleteForever />
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" className='bg-green-600 addButton' onClick={addWord}>
                                        Add Word
                                    </button>
                                </div>
                                <div>
                                    <label
                                        htmlFor="hobby"
                                        className="formLable">Hobby</label>
                                    {formData?.hobby?.map((hobby, index) => (
                                        <div className="flex flex-auto gap-1 m-1 ">

                                            <div className="" key={index}>
                                                <input
                                                    id="hobby"
                                                    type="text"
                                                    name={`hobby[${index}][name]`}
                                                    value={hobby.name}
                                                    onChange={(e) => handleHobbyChange(e, 'name', index)}
                                                    className="formInput "
                                                    placeholder="Hobby"

                                                />
                                            </div>
                                            <button type="button" className='-mt-0  bg-red-600 addButton' onClick={() => removeItem(index, 'hobby')}>
                                                <MdOutlineDeleteForever />
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" className='bg-green-600 addButton' onClick={addHobby}>
                                        Add Hobby
                                    </button>
                                </div>
                                <div>
                                    <label
                                        htmlFor="title"
                                        className="formLable">Title</label>
                                    <input
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="formInput "
                                    />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="skill" className="singleFormLabel">Skill</label>
                                {formData?.skills?.map((skill, index) => (

                                    <div className="flex flex-auto gap-1 m-1" key={index}>
                                        <input
                                            id="skillname"
                                            type="text"
                                            name={`skills[${index}][name]`}
                                            value={skill.name}
                                            onChange={(e) => handleSkillsChange(e, 'name', index)}
                                            className="singleFormInput"
                                            placeholder="Skill Name"
                                        />
                                        <input
                                            id="skillpercentage"
                                            type="number"
                                            name={`skills[${index}][percentage]`}
                                            value={skill.percentage}
                                            onChange={(e) => handleSkillsChange(e, 'percentage', index)}
                                            className="singleFormInput"
                                            placeholder="Skill Percentage (%)"
                                        />
                                        <button type="button" className=' bg-red-600 addButton' onClick={() => removeItem(index, 'skills')}>
                                            <MdOutlineDeleteForever />
                                        </button>
                                    </div>
                                ))}
                                <button type="button" className='bg-green-600 addButton' onClick={addSkill}>
                                    Add skill
                                </button>
                            </div>
                        </div>
                        <div className="md:mt-8">

                            <div className="mb-6">
                                <label htmlFor="pinfo"
                                    className="singleFormLabel">Personal Introduction</label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    type="text"
                                    name="personalIntroduction"
                                    value={formData.personalIntroduction}
                                    onChange={handleInputChange}
                                    className="formTextarea"
                                ></textarea>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="education"
                                    className="singleFormLabel">Education</label>
                                {formData?.education?.map((education, index) => (
                                    <div className="" key={index}>
                                        <div className="flex flex-auto gap-1 m-1">
                                            <input
                                                id="degree"
                                                type="text"
                                                name="degree"
                                                value={education.degree}
                                                onChange={(e) => handleEducationChange(e, 'degree', index)}
                                                placeholder="Degree"
                                                className="singleFormInput"

                                            />
                                            <input
                                                id="institution"
                                                type="text"
                                                name="institution"
                                                value={education.institution}
                                                onChange={(e) => handleEducationChange(e, 'institution', index)}
                                                placeholder="Institution"
                                                className="singleFormInput"

                                            />
                                            <input
                                                id="fos"
                                                type="text"
                                                name="fieldOfStudy"
                                                value={education.fieldOfStudy}
                                                onChange={(e) => handleEducationChange(e, 'fieldOfStudy', index)}
                                                className="singleFormInput"
                                                placeholder="Field of Study"
                                            />
                                            <input
                                                id="gradyear"
                                                type="date"
                                                name="graduationYear"
                                                value={education.graduationYear}
                                                onChange={(e) => handleEducationChange(e, 'graduationYear', index)}
                                                className="singleFormInput"

                                            />
                                            <button type="button" className='bg-red-600 addButton' onClick={() => removeItem(index, 'education')}>
                                                <MdOutlineDeleteForever />
                                            </button>
                                        </div>

                                    </div>
                                ))}
                                <button type="button" className='bg-green-600 addButton' onClick={addEducation}>
                                    Add Education
                                </button>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="experience"
                                    className="singleFormLabel">Experience</label>
                                {formData?.experience?.map((experience, index) => (
                                    <div className="" key={index}>
                                        <div className="flex flex-auto gap-1 m-1">
                                            <input
                                                id="jpbtitle"
                                                type="text"
                                                name={`experience[${index}][jobTitle]`}
                                                value={experience.jobTitle}
                                                onChange={(e) => handleExperienceChange(e, 'jobTitle', index)}
                                                placeholder="Job Title"
                                                className="singleFormInput "
                                            />
                                            <input
                                                id="company"
                                                type="text"
                                                name={`experience[${index}][company]`}
                                                value={experience.company}
                                                onChange={(e) => handleExperienceChange(e, 'company', index)}
                                                className="singleFormInput "
                                                placeholder="Company"
                                            />
                                            <input
                                                id="sdate"
                                                type="date"
                                                name={`experience[${index}][startDate]`}
                                                value={experience.startDate.split('T')[0]}
                                                onChange={(e) => handleExperienceChange(e, 'startDate', index)}
                                                placeholder="Start Date"
                                                className="singleFormInput"
                                            />
                                            <input
                                                id="edate"
                                                type="date"
                                                name={`experience[${index}][endDate]`}
                                                value={experience.endDate.split('T')[0]}
                                                onChange={(e) => handleExperienceChange(e, 'endDate', index)}
                                                placeholder="End Date"
                                                className="singleFormInput"
                                            />
                                            <input
                                                id="sdate"
                                                type="text"
                                                name={`experience[${index}][description]`}
                                                value={experience.description}
                                                onChange={(e) => handleExperienceChange(e, "description", index)}
                                                placeholder="Description"
                                                className="singleFormInput"
                                            />
                                            <button type="button" className=' bg-red-600 addButton' onClick={() => removeItem(index, 'experience')}>
                                                <MdOutlineDeleteForever />
                                            </button>
                                        </div>

                                    </div>
                                ))}
                                <button type="button" className='bg-green-600 addButton' onClick={addExperience}>
                                    Add Experience
                                </button>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="training"
                                    className="singleFormLabel">Training</label>
                                {formData?.training?.map((training, index) => (
                                    <div className="" key={index}>
                                        <div className="flex flex-auto gap-1 m-1">
                                            <input
                                                id="training"
                                                type="text"
                                                name={`training[${index}][title]`}
                                                value={training.title}
                                                onChange={(e) => handleTrainingChange(e, 'title', index)}
                                                placeholder="Training Title"
                                                className="singleFormInput "
                                            />
                                            <input
                                                id="institution"
                                                type="text"
                                                name={`training[${index}][institution]`}
                                                value={training.institution}
                                                onChange={(e) => handleTrainingChange(e, 'institution', index)}
                                                placeholder="Institution"
                                                className="singleFormInput "
                                            />
                                            <input
                                                id="sdate"
                                                type="date"
                                                name={`training[${index}][year]`}
                                                value={training.year}
                                                onChange={(e) => handleTrainingChange(e, 'year', index)}
                                                placeholder="Year"
                                                className="singleFormInput"
                                            />

                                            <button type="button" className=' bg-red-600 addButton' onClick={() => removeItem(index, 'training')}>
                                                <MdOutlineDeleteForever />
                                            </button>
                                        </div>

                                    </div>
                                ))}
                                <button type="button" className='bg-green-600 addButton' onClick={addTraining}>
                                    Add Training
                                </button>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="achievement"
                                    className="singleFormLabel">Achievement</label>
                                {formData?.achievement?.map((achievement, index) => (
                                    <div className="" key={index}>
                                        <div className="flex flex-auto gap-1 m-1">
                                            <input
                                                id="trainingtitle"
                                                type="text"
                                                name={`achievement[${index}][title]`}
                                                value={achievement.title}
                                                onChange={(e) => handleAchievementChange(e, 'title', index)}
                                                placeholder="Achievement Title"
                                                className="singleFormInput "
                                            />
                                            <input
                                                id="institution"
                                                type="text"
                                                name={`achievement[${index}][issuer]`}
                                                value={achievement.issuer}
                                                onChange={(e) => handleAchievementChange(e, 'issuer', index)}
                                                placeholder="Issuer"
                                                className="singleFormInput "
                                            />
                                            <input
                                                id="sdate"
                                                type="date"
                                                name={`achievement[${index}][year]`}
                                                value={achievement.year}
                                                onChange={(e) => handleAchievementChange(e, 'year', index)}
                                                placeholder="Year"
                                                className="singleFormInput"
                                            />

                                            <button type="button" className=' bg-red-600 addButton' onClick={() => removeItem(index, 'achievement')}>
                                                <MdOutlineDeleteForever />
                                            </button>
                                        </div>

                                    </div>
                                ))}
                                <button type="button" className='bg-green-600 addButton' onClick={addAchievement}>
                                    Add Achievement
                                </button>
                            </div>
                            <div className="mb-6">

                                <div>
                                    <label
                                        className="singleFormLabel"
                                        htmlFor="file_input">Upload file</label>
                                    <input
                                        className="imgUploadInput"
                                        aria-describedby="file_input_help"
                                        id="file_input"
                                        type="file"
                                        accept=".jpg, .jpeg, .png" // Specify allowed file types
                                        onChange={handleImageUpload} />
                                    <p className="singleFormLabel"
                                        id="file_input_help">Only PNG (no background) (MAX. 800x400px).</p>
                                </div>


                            </div>
                        </div>



                        {/* <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" defaultValue className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                    </div>
                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                </div> */}

                    </div>


                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleSubmit}>Update</button>
                </form>
            </div >
        </>
    );
}
export default AdminPersonalUpdate;