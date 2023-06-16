import React, { useContext, useEffect,useState } from 'react';
import { wordsContext } from "../../Context/wordsListContext";
import { UserContext } from '../../Context/UserContext.js';


const PersonalTexts = () => {
    const { getWordsList, allWordsList, handleDelete, handleEdit, handleClose, show, setInputValue, inputValue, handleUpdate,
      handleEditList,handleDeleteList,getQuizQuestions } = useContext(wordsContext)
    
    const {profileInfo,getProfileInfo} = useContext(UserContext)

    const [personalTexts,setPersonalTexts] = useState([])

      //GET ALL DATAS By ID==========================================================
  const getTextsList = async (pId) => {
    try {
  const BASE_URL = "http://localhost:3302"

      const response = await fetch(`${BASE_URL}/textreview/personaltexts/${pId}`);
      const data = await response.json();
      setPersonalTexts(data)
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch posts")
    }
  };

  useEffect(()=>{
    const fetchData = async () => {
        try {
          const profileData = await getProfileInfo();
          await getTextsList(profileData.id);
        } catch (error) {
          //HATA MESAJI
        }
      };
      fetchData();
      console.log(personalTexts)
  },[])

  return (
    <div>
        <h1>Personal Texts</h1>
        {personalTexts?.map((text,value)=>(
        <p>{text.title}</p>
    ))}</div>
  )
}

export default PersonalTexts