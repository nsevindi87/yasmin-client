import { createContext, useState } from "react"

export const wordsContext = createContext()


const WordsListContextProvider = ({ children }) => {
  //INITIAL STATES
  const [allWordsList, setAllWordsList] = useState([]);
  const [greenList, setGreenList] = useState([]);
  const [yellowList, setYellowList] = useState([]);
  const [redList, setRedList] = useState([]);
  const [typing, setTyping] = useState(false);

  const [inputValue, setInputValue] = useState({
    word: "",
    wordMeaning: "",
    wordSecondMeaning: "",
    wordNote: "",
    wordCategory: ""
  })

  //BASE URL
  const BASE_URL = "http://localhost:3302"

  //GET ALL DATAS=====================================================================================================
  const getWordsList = async () => {
    try {
      const response = await fetch(`${BASE_URL}/words`);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      const dataGreen = data.filter((word) => word.wordCategory === "success")
      const dataYellow = data.filter((word) => word.wordCategory === "warning")
      const dataRed = data.filter((word) => word.wordCategory === "danger")
      setAllWordsList(data)
      setGreenList(dataGreen)
      setYellowList(dataYellow)
      setRedList(dataRed)
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch posts")
    }
  };


  //ADD NEW WORD=====================================================================================================
  const handleNewWord = async () => {
    if (inputValue.word.length === 0 && inputValue.wordMeaning.length === 0 && inputValue.wordSecondMeaning.length === 0 && inputValue.wordNote.length === 0) {
      alert("Lütfen en az bir bölümü doldurun")
    } else {
      try {
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
        setInputValue({
          word: "",
          wordMeaning: "",
          wordSecondMeaning: "",
          wordNote: "",
          wordCategory: ""
        })
      } catch (error) {
        console.error(error);
      }

    }
  };





  //DELETE WORD
  const handleDelete = async (pId, pList) => {
    try {
      const response = await fetch(`${BASE_URL}/words/${pList}/${pId}`, {
        method: "DELETE"
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <wordsContext.Provider value={{
      typing, setTyping,
      getWordsList, allWordsList, setAllWordsList,
      greenList, setGreenList,
      yellowList, setYellowList,
      redList, setRedList,
      inputValue, setInputValue,
      handleDelete, handleNewWord
    }}>
      {children}
    </wordsContext.Provider>

  )
}

export default WordsListContextProvider
