import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiDeleteBin6Line } from 'react-icons/ri';
import 'sweetalert2/dist/sweetalert2.min.css';
import { FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../../../Config';
function AdminPersonalUpdate() {
    const { id } = useParams()
    console.log(id)
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
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/introduction/personal-info/1`
                );
                const userData = response.data;
                if (userData.length === 0) {
                    // If no data is available, set a flag in the state
                    setFormData({ ...formData, noDataAvailable: true });
                } else {
                    const wordsArray = Array.isArray(userData[0].words) ? userData[0].words : [];
                    setFormData({
                        ...userData[0],
                        words: wordsArray,
                        noDataAvailable: false, // Set the flag to false when data is available
                    });
                }
            } catch (error) {
                console.error('Error fetching personal info:', error);
            }
        };
        const fetchData1 = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/introduction/personal-info');
                const userData = response.data;

                if (userData.length === 0) {
                    // If no data is available, set a flag in the state
                    setFormData({ ...formData, noDataAvailable: true });
                } else {
                    const wordsArray = Array.isArray(userData[0].words) ? userData[0].words : [];
                    setFormData({
                        ...userData[0],
                        words: wordsArray,
                        noDataAvailable: false, // Set the flag to false when data is available
                    });
                }
            } catch (error) {
                console.error('Error fetching personal info:', error);
            }
        };
        fetchData1();

        fetchData();
    }, []);
    const removeItem = (index, category) => {
        setFormData((prevData) => {
            const updatedData = { ...prevData };
            const categoryData = updatedData[category];
            if (categoryData.length === 1) {
                updatedData[category] = [];
            } else {
                updatedData[category] = categoryData.filter((_, i) => i !== index);
            }
            return updatedData;
        });
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
        try {
            const response = await axios.put(
                `${API_URL}/introduction/personal-info/1`,
                formDataForRequest,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('API Response:', response.data);
            setFormData(response.data);
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Update Successful',
            //     text: 'Your personal information has been updated!',
            // });

            console.log('Personal info updated.');
        } catch (error) {
            console.error('Error updating personal info:', error);
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Update Failed',
            //     text: 'An error occurred while updating your personal information. Please try again.',
            // });
        }
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
    const addWord = () => {
        setFormData({
            ...formData,
            words: [...formData.words, ''],
        });
    };
    return (
        <>
            <div className="flex justify-center flex-auto p-14 md:p-4">
                {formData.noDataAvailable ? (
                    <Link to='/admin/addinfo' >

                        <button
                            className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-600"
                            onClick={() => console.log('Add button clicked')}>
                            Add
                        </button>
                    </Link>
                ) : (
                    <form className='mt-1' onSubmit={handleSubmit}>
                        <div className="grid gap-3 mt-8 mb-6 md:grid-cols-2">
                            <div className="">
                                <div className="grid gap-6 mt-8 mb-6 md:grid-cols-2 ">
                                    <div className=''>
                                        <label className="formLable" >Name:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="formInput "
                                            reqired
                                        />
                                    </div>
                                    <div className="">
                                        <label className="formLable">Date of Birth:</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData?.dob?.split('T')[0]}
                                            onChange={handleInputChange}
                                            className="formInput "
                                            required
                                        />
                                    </div>

                                </div>
                                <div>
                                    <label className="formLable">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="singleFormInput"
                                        required
                                    />
                                </div>
                                <div className="">
                                    <label className="formLable">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="formInput "
                                    />
                                </div>
                                <div className="grid gap-6 mt-8 mb-6 md:grid-cols-2 ">
                                    <div>
                                        <label className="formLable">Father's Name:</label>
                                        <input
                                            type="text"
                                            name="fathersName"
                                            value={formData.fathersName}
                                            onChange={handleInputChange}
                                            className="formInput "
                                        />
                                    </div>
                                    <div>
                                        <label className="formLable">Mother's Name:</label>
                                        <input
                                            type="text"
                                            name="mothersName"
                                            value={formData.mothersName}
                                            onChange={handleInputChange}
                                            className="formInput "
                                        />
                                    </div>
                                    <div>
                                        <label className="formLable">Grandfather:</label>
                                        <input
                                            type="text"
                                            name="grandfather"
                                            value={formData.grandfather}
                                            onChange={handleInputChange}
                                            className="formInput "
                                        />
                                    </div>
                                    <div>
                                        <label className="formLable">Grandmother:</label>
                                        <input
                                            type="text"
                                            name="grandmother"
                                            value={formData.grandmother}
                                            onChange={handleInputChange}
                                            className="formInput "
                                        />
                                    </div>

                                </div>
                                <div className="">
                                    <label className="formLable">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="formInput "
                                    />
                                </div>
                                <div className="grid gap-6 mt-8 mb-6 md:grid-cols-2 ">
                                    <div className="">
                                        <label className="formLable">Words:</label>
                                        {formData?.words?.map((word, index) => (
                                            <div className="flex flex-auto gap-1 m-1" key={index}>
                                                <input
                                                    type="text"
                                                    value={word}
                                                    onChange={(e) => handleWordsChange(e, index)}
                                                    placeholder="Word"
                                                    className="formInput "
                                                />
                                                <button className='delete' type="button" onClick={() => removeItem(index, 'words')}>
                                                    <RiDeleteBin6Line />
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" className='plus' onClick={addWord}>
                                            <FaPlus />
                                        </button>
                                    </div>
                                    <div className=''>
                                        <label className="formLable">Hobby:</label>
                                        {formData?.hobby?.map((hobby, index) => (
                                            <div className="flex flex-auto gap-1 m-1" key={index}>
                                                <input
                                                    type="text"
                                                    name={`hobby[${index}][name]`}
                                                    value={hobby.name}
                                                    onChange={(e) => handleHobbyChange(e, 'name', index)}
                                                    placeholder="Name"
                                                    className="formInput "
                                                />
                                                <button className='delete' type="button" onClick={() => removeItem(index, 'hobby')}>
                                                    <RiDeleteBin6Line />
                                                </button>
                                            </div>
                                        ))}
                                        <button className='plus' type="button" onClick={addHobby}>
                                            <FaPlus />
                                        </button>
                                    </div>
                                </div>
                                <div className=''>
                                    <label className="formLable">Profile Picture:</label>
                                    <input
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={handleImageUpload}
                                        className="imgUploadInput"
                                    />
                                    <p className="singleFormLabel"
                                        id="file_input_help">Only PNG (no background) (MAX. 800x400px).</p>
                                </div>
                            </div>

                            <div className=''>



                                <div>
                                    <label className="formLable">Personal Introduction</label>
                                    <textarea
                                        rows="4"
                                        type="text"
                                        name="personalIntroduction"
                                        value={formData.personalIntroduction}
                                        onChange={handleInputChange}
                                        className="formTextarea"
                                    >
                                    </textarea>

                                </div>
                                <div>
                                    <label className="formLable">Education:</label>
                                    {formData?.education?.map((education, index) => (
                                        <div className="flex flex-auto gap-1 m-1" key={index}>
                                            <input
                                                type="text"
                                                name="degree"
                                                value={education.degree}
                                                onChange={(e) => handleEducationChange(e, 'degree', index)}
                                                placeholder="Degree"
                                                className="singleFormInput"
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="institution"
                                                value={education.institution}
                                                onChange={(e) => handleEducationChange(e, 'institution', index)}
                                                placeholder="Institution"
                                                className="singleFormInput"
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="fieldOfStudy"
                                                value={education.fieldOfStudy}
                                                onChange={(e) => handleEducationChange(e, 'fieldOfStudy', index)}
                                                placeholder="Field of Study"
                                                className="singleFormInput"
                                                required
                                            />
                                            <input
                                                type="number"
                                                name="graduationYear"
                                                value={education.graduationYear}
                                                onChange={(e) => handleEducationChange(e, 'graduationYear', index)}
                                                placeholder="Graduation Year"
                                                className="singleFormInput"
                                                required
                                            />
                                            <button className='delete' type="button" onClick={() => removeItem(index, 'education')}>
                                                <RiDeleteBin6Line />
                                            </button>
                                        </div>
                                    ))}
                                    <button className='plus' type="button" onClick={addEducation}>
                                        <FaPlus />
                                    </button>
                                </div>
                                <div className="">
                                    <label className="formLable">Training:</label>
                                    {formData?.training?.map((training, index) => (
                                        <div className='flex flex-auto gap-1 m-1' key={index}>
                                            <input
                                                type="text"
                                                name={`training[${index}][title]`}
                                                value={training.title}
                                                onChange={(e) => handleTrainingChange(e, 'title', index)}
                                                placeholder="Training Title"
                                                className="singleFormInput "
                                                required
                                            />
                                            <input
                                                type="text"
                                                name={`training[${index}][institution]`}
                                                value={training.institution}
                                                onChange={(e) => handleTrainingChange(e, 'institution', index)}
                                                placeholder="Institution"
                                                className="singleFormInput "
                                                required
                                            />
                                            <input
                                                type="number"
                                                name={`training[${index}][year]`}
                                                value={training.year}
                                                onChange={(e) => handleTrainingChange(e, 'year', index)}
                                                placeholder="Year"
                                                className="singleFormInput "
                                                required
                                            />
                                            <button className='delete' type="button" onClick={() => removeItem(index, 'training')}>
                                                <RiDeleteBin6Line />
                                            </button>
                                        </div>
                                    ))}
                                    <button className='plus' type="button" onClick={addTraining}>
                                        <FaPlus />
                                    </button>
                                </div>
                                <div className=''>
                                    <label className="formLable">Achievement:</label>
                                    {formData?.achievement?.map((achievement, index) => (
                                        <div className='flex flex-auto gap-1 m-1' key={index}>
                                            <input
                                                type="text"
                                                name={`achievement[${index}][title]`}
                                                value={achievement.title}
                                                onChange={(e) => handleAchievementChange(e, 'title', index)}
                                                placeholder="Achievement Title"
                                                className="singleFormInput "
                                                required
                                            />
                                            <input
                                                type="text"
                                                name={`achievement[${index}][issuer]`}
                                                value={achievement.issuer}
                                                onChange={(e) => handleAchievementChange(e, 'issuer', index)}
                                                placeholder="Issuer"
                                                className="singleFormInput "
                                                required
                                            />
                                            <input
                                                type="number"
                                                name={`achievement[${index}][year]`}
                                                value={achievement.year}
                                                onChange={(e) => handleAchievementChange(e, 'year', index)}
                                                placeholder="Year"
                                                className="singleFormInput "
                                                required
                                            />
                                            <button className='delete' type="button" onClick={() => removeItem(index, 'achievement')}>
                                                <RiDeleteBin6Line />
                                            </button>
                                        </div>
                                    ))}
                                    <button className='plus' type="button" onClick={addAchievement}>
                                        <FaPlus />
                                    </button>
                                    <br /><br />
                                </div>
                                <div className="">
                                    <label className="formLable">Experience:</label>
                                    {formData?.experience?.map((experience, index) => (
                                        <div className="flex flex-auto gap-1 m-1" key={index}>
                                            <input
                                                type="text"
                                                name={`experience[${index}][jobTitle]`}
                                                value={experience.jobTitle}
                                                onChange={(e) => handleExperienceChange(e, 'jobTitle', index)}
                                                placeholder="Job Title"
                                                className="singleFormInput "
                                                required
                                            />
                                            <input
                                                type="text"
                                                name={`experience[${index}][company]`}
                                                value={experience.company}
                                                onChange={(e) => handleExperienceChange(e, 'company', index)}
                                                placeholder="Company"
                                                className="singleFormInput "
                                                required
                                            />
                                            <input
                                                type="date"
                                                name={`experience[${index}][startDate]`}
                                                value={experience.startDate?.split('T')[0]}
                                                onChange={(e) => handleExperienceChange(e, 'startDate', index)}
                                                placeholder="Start Date"
                                                className="singleFormInput "
                                                required
                                            />
                                            <input
                                                type="date"
                                                name={`experience[${index}][endDate]`}
                                                value={experience.endDate?.split('T')[0]}
                                                onChange={(e) => handleExperienceChange(e, 'endDate', index)}
                                                placeholder="End Date"
                                                className="singleFormInput "
                                            />
                                            <input
                                                type="text"
                                                name={`experience[${index}][description]`}
                                                value={experience.description}
                                                onChange={(e) => handleExperienceChange(e, "description", index)}
                                                placeholder="Description"
                                                className="singleFormInput "
                                                required
                                            />
                                            <button className='delete' type="button" onClick={() => removeItem(index, 'experience')}>
                                                <RiDeleteBin6Line />
                                            </button>
                                        </div>
                                    ))}
                                    <button className='plus' type="button" onClick={addExperience}>
                                        <FaPlus />
                                    </button>
                                </div>
                                <div className="">
                                    <label className="formLable">Skills:</label>
                                    {formData?.skills?.map((skill, index) => (
                                        <div className="flex flex-auto gap-1 m-1" key={index}>

                                            <input
                                                type="text"
                                                name={`skills[${index}][name]`}
                                                value={skill.name}
                                                onChange={(e) => handleSkillsChange(e, 'name', index)}
                                                placeholder="Skill Name"
                                                className="formInput "
                                                required
                                            />
                                            <input
                                                type="number"
                                                name={`skills[${index}][percentage]`}
                                                value={skill.percentage}
                                                onChange={(e) => handleSkillsChange(e, 'percentage', index)}
                                                placeholder="Skill Percentage"
                                                className="formInput "
                                                required
                                            />
                                            <button className='delete' type="button" onClick={() => removeItem(index, 'skills')}>
                                                <RiDeleteBin6Line />
                                            </button>
                                        </div>
                                    ))}
                                    <button className='plus' type="button" onClick={addSkill}>
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className=" flex flex-auto justify-center">
                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type="submit">Update</button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}
export default AdminPersonalUpdate;
