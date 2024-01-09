import React, { useState, useEffect } from 'react';
import axios from 'axios';
function AddIntro() {
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
          `http://localhost:5000/api/introduction/personal-info/6565813dd84083b9e92849ad`
        );
         // Assuming the response.data contains the user data
      const userData = response.data;
      // Ensure words is an array, if not set it to an empty array
      const wordsArray = Array.isArray(userData.words) ? userData.words : [];
      setFormData({
        ...userData,
        words: wordsArray,
      });// Assuming the response contains the user data
      } catch (error) {
        console.error('Error fetching personal info:', error);
      }
    };
    fetchData();
  }, []);
  const removeItem = (index, category) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData };
      const categoryData = updatedData[category];
      // Check if there's only one item in the array
      if (categoryData.length === 1) {
        updatedData[category] = [];
      } else {
        // Remove the item at the specified index
        updatedData[category] = categoryData.filter((_, i) => i !== index);
      }
      return updatedData;
    });
  };
  // const removeItem = (index, category) => {
  //   setFormData((prevData) => {
  //     const updatedData = { ...prevData };
  //     const categoryData = updatedData[category];
  //     // Check if there's only one item in the array
  //     if (categoryData.length === 1) {
  //       updatedData[category] = [];
  //     } else {
  //       // Remove the item at the specified index
  //       updatedData[category] = categoryData.filter((_, i) => i !== index);
  //     }
  //     return updatedData;
  //   });
  // };
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
  const handleHobbyChange = (e,feild, index) => {
    const updatedHobby = [...formData.hobby];
    updatedHobby[index] = {
        ...updatedHobby[index],
        [feild]:e.target.value
    }
    setFormData({ ...formData, hobby: updatedHobby });
  };
  const handleExperienceChange = (e,feild, index) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index] =
    {
...updatedExperience[index],
[feild]:e.target.value,
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
    // Handle words separately
    formData.words.forEach((word, index) => {
      formDataForRequest.append(`words[${index}]`, word);
    });
    // Iterate over other formData fields
    for (const key in formData) {
      if (key !== 'words' && Array.isArray(formData[key])) {
        formData[key].forEach((item, index) => {
          for (const field in item) {
            formDataForRequest.append(`${key}[${index}][${field}]`, item[field]);
          }
        });
      } else {
        formDataForRequest.append(key, formData[key]);
      }
    }
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formDataForRequest = new FormData();
  //   // Iterate over formData instead of formDataForRequest
  //   for (const key in formData) {
  //     if (Array.isArray(formData.words)) {
  //       formData.words.forEach((word, index) => {
  //         formDataForRequest.append(`words[${index}]`, word);
  //       });
  //     }
  //      else if (Array.isArray(formData[key])) {
  //       formData[key].forEach((item, index) => {
  //         for (const field in item) {
  //           formDataForRequest.append(`${key}[${index}][${field}]`, item[field]);
  //         }
  //       });
  //       formData.words.forEach((word, index) => {
  //         formDataForRequest.append(`words[${index}]`, word);
  //       });
  //     } else {
  //       formDataForRequest.append(key, formData[key]);
  //     }
  //   }
    try {
      const response = await axios.put(
        'http://localhost:5000/api/introduction/personal-info/6565813dd84083b9e92849ad',
        formDataForRequest,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('API Response:', response.data);
      setFormData(response.data); // Update the local state with the response data
      console.log('Personal info updated.');
      // You can handle success or navigation here
    } catch (error) {
      console.error('Error updating personal info:', error);
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
      words: [...formData.words, ''], // Add an empty string for a new word
    });
  };
return (
    <div>
      <h2>Add Personal Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData?.dob?.split('T')[0]}
            onChange={handleInputChange}
          />
           <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
           <div>
          <label>Personal Introduction</label>
          <input
            type="text"
            name="personalIntroduction"
            value={formData.personalIntroduction}
            onChange={handleInputChange}
          /> <br/>
           <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
           <div></div>
        </div>
        </div>
        </div>
        <div>
        <div>
        <label>Father's Name:</label>
        <input
          type="text"
          name="fathersName"
          value={formData.fathersName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Mother's Name:</label>
        <input
          type="text"
          name="mothersName"
          value={formData.mothersName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Grandfather:</label>
        <input
          type="text"
          name="grandfather"
          value={formData.grandfather}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Grandmother:</label>
        <input
          type="text"
          name="grandmother"
          value={formData.grandmother}
          onChange={handleInputChange}
        />
      </div>
  <pre>{JSON.stringify(formData?.words)}</pre>
  <label>Words:</label>
{formData?.words?.map((word, index) => (
  <div key={index}>
    <input
      type="text"
      value={word}
      onChange={(e) => handleWordsChange(e, index)}
      placeholder="Word"
    />
    <button type="button" onClick={() => removeItem(index, 'words')}>
      Remove
    </button>
  </div>
))}
<button type="button" onClick={addWord}>
  Add Word
</button>
  <label>Education:</label>
  <pre>{JSON.stringify(formData?.education)}</pre>
  {formData?.education?.map((education, index) => (
    <div key={index}>
      <input
        type="text"
        name="degree"
        value={education.degree}
        onChange={(e) => handleEducationChange(e, 'degree', index)}
        placeholder="Degree"
      />
      <input
        type="text"
        name="institution"
        value={education.institution}
        onChange={(e) => handleEducationChange(e, 'institution', index)}
        placeholder="Institution"
      />
      <input
        type="text"
        name="fieldOfStudy"
        value={education.fieldOfStudy}
        onChange={(e) => handleEducationChange(e, 'fieldOfStudy', index)}
        placeholder="Field of Study"
      />
      <input
        type="number"
        name="graduationYear"
        value={education.graduationYear}
        onChange={(e) => handleEducationChange(e, 'graduationYear', index)}
        placeholder="Graduation Year"
      />
      <button type="button" onClick={() => removeItem(index, 'education')}>
          Remove
        </button>
    </div>
  ))}
  <button type="button" onClick={addEducation}>
    Add Education
  </button>
</div>
        <label>Experience:</label>
        {formData?.experience?.map((experience, index) => (
          <div key={index}>
            <input
              type="text"
              name={`experience[${index}][jobTitle]`}
              value={experience.jobTitle}
              onChange={(e) => handleExperienceChange(e,'jobTitle', index)}
              placeholder="Job Title"
            />
            <input
              type="text"
              name={`experience[${index}][company]`}
              value={experience.company}
              onChange={(e) => handleExperienceChange(e,'company', index)}
              placeholder="Company"
            />
            <input
              type="date"
              name={`experience[${index}][startDate]`}
              value={experience.startDate?.split('T')[0]}
              onChange={(e) => handleExperienceChange(e,'startDate', index)}
              placeholder="Start Date"
            />
            <input
              type="date"
              name={`experience[${index}][endDate]`}
              value={experience.endDate?.split('T')[0]}
              onChange={(e) => handleExperienceChange(e,'endDate', index)}
              placeholder="End Date"
            />
            <input
              type="text"
              name={`experience[${index}][description]`}
              value={experience.description}
              onChange={(e) => handleExperienceChange(e,"description", index)}
              placeholder="Description"
            />
           <button type="button" onClick={() => removeItem(index, 'experience')}>
          Remove
        </button>
      </div>
        ))}
        <button type="button" onClick={addExperience}>
          Add Experience
        </button>
        <div>
        <label>Achievement:</label>
      {formData?.achievement?.map((achievement, index) => (
        <div key={index}>
          <input
            type="text"
            name={`achievement[${index}][title]`}
            value={achievement.title}
            onChange={(e) => handleAchievementChange(e, 'title', index)}
            placeholder="Achievement Title"
          />
          <input
            type="text"
            name={`achievement[${index}][issuer]`}
            value={achievement.issuer}
            onChange={(e) => handleAchievementChange(e, 'issuer', index)}
            placeholder="Issuer"
          />
          <input
            type="number"
            name={`achievement[${index}][year]`}
            value={achievement.year}
            onChange={(e) => handleAchievementChange(e, 'year', index)}
            placeholder="Year"
          />
          <button type="button" onClick={() => removeItem(index, 'achievement')}>
          Remove
        </button>
        </div>
      ))}
      <button type="button" onClick={addAchievement}>
        Add Achievement
      </button>
      <br/>
      <label>Training:</label>
      {formData?.training?.map((training, index) => (
        <div key={index}>
          <input
            type="text"
            name={`training[${index}][title]`}
            value={training.title}
            onChange={(e) => handleTrainingChange(e, 'title', index)}
            placeholder="Training Title"
          />
          <input
            type="text"
            name={`training[${index}][institution]`}
            value={training.institution}
            onChange={(e) => handleTrainingChange(e, 'institution', index)}
            placeholder="Institution"
          />
          <input
            type="number"
            name={`training[${index}][year]`}
            value={training.year}
            onChange={(e) => handleTrainingChange(e, 'year', index)}
            placeholder="Year"
          />
           <button type="button" onClick={() => removeItem(index, 'training')}>
          Remove
        </button>
        </div>
      ))}
      <button type="button" onClick={addTraining}>
        Add Training
      </button>
      <br/>
        <label>Skills:</label>
{formData?.skills?.map((skill, index) => (
  <div key={index}>
    <input
      type="text"
      name={`skills[${index}][name]`}
      value={skill.name}
      onChange={(e) => handleSkillsChange(e, 'name', index)}
      placeholder="Skill Name"
    />
    <input
      type="number"
      name={`skills[${index}][percentage]`}
      value={skill.percentage}
      onChange={(e) => handleSkillsChange(e, 'percentage', index)}
      placeholder="Skill Percentage"
    />
   <button type="button" onClick={() => removeItem(index, 'skills')}>
          Remove
        </button>
      </div>
))}
<button type="button" onClick={addSkill}>
  Add Skill
</button>
        </div>
        <div>
  <label>Hobby:</label>
  <pre>{JSON.stringify(formData?.hobby)}</pre>
  {formData?.hobby?.map((hobby, index) => (
    <div key={index}>
      <input
        type="text"
        name={`hobby[${index}][name]`}
        value={hobby.name}
        onChange={(e) => handleHobbyChange(e, 'name', index)}
        placeholder="Name"
      />
      <button type="button" onClick={() => removeItem(index, 'hobby')}>
        Remove
      </button>
    </div>
  ))}
  <button type="button" onClick={addHobby}>
    Add Hobby
  </button>
</div>
        <div>
          <label>Profile Picture:</label>
          <input
            type="file"
            accept=".jpg, .jpeg, .png" // Specify allowed file types
            onChange={handleImageUpload}
          />
        </div>
        <button type="submit">Add</button>
        <input type="reset" name="" id="" />
      </form>
    </div>
  );
}
export default AddIntro;