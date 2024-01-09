import React, { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../../Config';

const AdminPersonal = () => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        address: '',
        title: '',
        personalIntroduction: '',
        profilePic: null,
        words: [''],
        email: '',
        fathersName: '',
        mothersName: '',
        grandfather: '',
        grandmother: '',
        spouse: '',
        education: [{}],
        experience: [{}],
        hobby: [{}],
        skills: [{}]
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profilePic: file });
    };
    const addWords = () => {
        setFormData({
            ...formData,
            words: [...formData.words, ''],
        });
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
    const handleWordsChange = (e, index) => {
        const updatedWords = [...formData.words];
        updatedWords[index] = e.target.value;
        setFormData({ ...formData, words: updatedWords });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataForRequest = new FormData();
        for (const key in formData) {
            if (Array.isArray(formData[key])) {
                formData[key].forEach((item, index) => {
                    for (const field in item) {
                        formDataForRequest.append(`${key}[${index}][${field}]`, item[field]);
                    }
                });
            } else {
                formDataForRequest.append(key, formData[key]);
            }
        }
        console.log(formData)
        try {
            // Send a request to your API to create a new personal information entry
            await axios.post(`${API_URL}/introduction/personal-info`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Personal info created.');
            // You can handle success or navigation here
        } catch (error) {
            console.error('Error creating personal info:', error);
        }
    }
    return (
        <>

            <div className="flex flex-auto justify-center p-4">
                <form className='mt-1'>
                    <div className="grid gap-3 mb-6 mt-8 md:grid-cols-2">
                        <div className="">

                            <div className="grid gap-6 mb-6 mt-8 md:grid-cols-2 ">
                                <div>
                                    <label
                                        htmlFor="full_name"
                                        className="formLable">Full name</label>
                                    <input
                                        type="text"
                                        id="full_name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="formInput "
                                        placeholder="John"
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
                                        value={formData.dob}
                                        onChange={handleInputChange}
                                        className="formInput "
                                        placeholder=""
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
                                    placeholder="john.doe@company.com"
                                />
                            </div>
                            <div className="grid gap-6 mb-6 mt-8 md:grid-cols-2 jus">
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
                                        htmlFor="title"
                                        className="formLable">Title</label>
                                    <input
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="formInput "
                                        placeholder="Title"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="words"
                                        className="formLable">Words</label>
                                    {formData.words.map((word, index) => (
                                        <div className="" key={index}>

                                            <input
                                                id="word"
                                                type="text"
                                                name={`words[${index}]`}
                                                value={word}
                                                onChange={(e) => handleWordsChange(e, index)}
                                                className="formInput "
                                                placeholder="Full Stack developer"
                                            />
                                        </div>
                                    ))}

                                    <button type="button" className='addButton' onClick={addWords}>
                                        Add Word
                                    </button>
                                </div>
                                <div>
                                    <label
                                        htmlFor="hobby"
                                        className="formLable">Hobby</label>
                                    {formData.hobby.map((hobby, index) => (
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
                                    ))}
                                    <button type="button" className='addButton' onClick={addHobby}>
                                        Add Hobby
                                    </button>
                                </div>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="skill" className="singleFormLabel">Skill</label>
                                {formData.skills.map((skill, index) => (
                                    <div className="flex flex-auto" key={index}>
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
                                    </div>
                                ))}
                                <button type="button" className='addButton' onClick={addSkill}>
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
                                    className="formTextarea"
                                    placeholder="Personal Introduction..."></textarea>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="education"
                                    className="singleFormLabel">Education</label>
                                {formData.education.map((education, index) => (
                                    <div className="" key={index}>
                                        <div className="flex flex-auto">
                                            <input
                                                id="degree"
                                                type="text"
                                                name="degree"
                                                value={education.degree}
                                                onChange={(e) => handleEducationChange(e, 'degree', index)}
                                                className="singleFormInput "
                                                placeholder="Degree"
                                            />
                                            <input
                                                id="institution"
                                                type="text"
                                                name="institution"
                                                value={education.institution}
                                                onChange={(e) => handleEducationChange(e, 'institution', index)}
                                                className="singleFormInput "
                                                placeholder="Institution"
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
                                                placeholder="Graduation Year"
                                            />
                                        </div>

                                    </div>
                                ))}
                                <button type="button" className='addButton' onClick={addEducation}>
                                    Add Education
                                </button>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="experience"
                                    className="singleFormLabel">Experience</label>
                                {formData.experience.map((experience, index) => (
                                    <div className="" key={index}>
                                        <div className="flex flex-auto">
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
                                                value={experience.startDate}
                                                onChange={(e) => handleExperienceChange(e, 'startDate', index)}
                                                className="singleFormInput"
                                                placeholder="Start Date"
                                            />
                                            <input
                                                id="edate"
                                                type="date"
                                                name={`experience[${index}][endDate]`}
                                                value={experience.endDate}
                                                onChange={(e) => handleExperienceChange(e, 'endDate', index)}
                                                className="singleFormInput"
                                                placeholder="End Date"
                                            />
                                            <input
                                                id="sdate"
                                                type="text"
                                                name={`experience[${index}][description]`}
                                                value={experience.description}
                                                onChange={(e) => handleExperienceChange(e, "description", index)}
                                                className="singleFormInput"
                                                placeholder="Description"
                                            />
                                        </div>

                                    </div>
                                ))}
                                <button type="button" className='addButton' onClick={addExperience}>
                                    Add Education
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
                        onClick={handleSubmit}>Submit</button>
                </form>
            </div >
        </>

    )
}

export default AdminPersonal
