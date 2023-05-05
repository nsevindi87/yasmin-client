import {createContext, useState} from "react"

export const wordsContext = createContext()


const WordsListContextProvider = ({children}) => {
  //INITIAL STATES
  const [allWordsList, setAllWordsList] = useState([]);
  const [greenList, setGreenList] = useState([]);
  const [yellowList, setYellowList] = useState([]);
  const [redList, setRedList] = useState([]);
  const [typing,setTyping] = useState(false);

  const [inputValue, setInputValue] = useState({
    firstValue: "",
    secondValue: "",
    thirdValue: "",
    note: "",
    listGroup: ""
})

//BASE URL
const BASE_URL = "http://localhost:8000"

//GET ALL DATAS=====================================
const getWordsList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/words`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    setAllWordsList(data)
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch posts")
  }
};

//GET GREEN DATAS=====================================
const getGreenList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/words/success`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    setGreenList(data)
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch posts")
  }
};

//GET YELLOW DATAS=====================================
const getYellowList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/words/warning`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    setYellowList(data)
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch posts")
  }
};

//GET RED DATAS=====================================
const getRedList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/words/danger`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    setRedList(data)
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch posts")
  }
};

//ADD NEW WORD=====================================
const handleNewWord = async () => {
  try {
    console.log(inputValue)
    
    const response = await fetch(`${BASE_URL}/words`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputValue),
    });
    console.log(response)
    if (!response.ok) {
      throw new Error("Failed to create post");
    }
    const data = await response.json();
    console.log(data)
  } catch (error) {
    console.error(error);
  }
  setInputValue({
    firstValue: "",
    secondValue: "",
    thirdValue: "",
    note: "",
    listGroup: ""
  })
};



//DELETE WORD
const handleDelete = async(pId, pList) =>{
  try {
      const response = await fetch(`${BASE_URL}/words/${pList}/${pId}`,{
      method:"DELETE"})
  } catch (error) {
      console.log(error);
  }   
}

  return (
      <wordsContext.Provider value={{
        typing, setTyping,
        getWordsList, allWordsList, setAllWordsList,
        getGreenList, greenList, setGreenList,
        yellowList, setYellowList,getYellowList,
        getRedList, redList, setRedList,
        inputValue, setInputValue,
        handleDelete,handleNewWord
        }}>
        {children}
      </wordsContext.Provider>
      
  )
}

export default WordsListContextProvider
