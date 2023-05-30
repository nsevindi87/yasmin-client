import { createContext, useState } from "react"

export const wordsContext = createContext()


const WordsListContextProvider = ({ children }) => {
  //INITIAL STATES
  const [allWordsList, setAllWordsList] = useState([]);
  const [greenList, setGreenList] = useState([]);
  const [yellowList, setYellowList] = useState([]);
  const [redList, setRedList] = useState([]);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [quizQuestions, setQuizquestions] = useState([]);

  const [inputValue, setInputValue] = useState({
    id: null,
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

  //DELETE WORD  =====================================================================================================
  const handleDelete = async (pId) => {
    try {
      await fetch(`${BASE_URL}/words/${pId}`, {
        method: "DELETE"
      })
    } catch (error) {
      console.log(error);
    }
  }

  //UPDATE WORD  ==================================================================================================
  //Edit tiklandiginda forma eski bilgiler gelir
  const handleEdit = async (pPost) => {
    setShow(true)
    setInputValue({
      id: pPost.id,
      word: pPost.word,
      wordMeaning: pPost.wordMeaning,
      wordSecondMeaning: pPost.wordSecondMeaning,
      wordNote: pPost.wordNote,
      wordCategory: pPost.wordCategory
    })
  }

  //FORMU SIFIRLA
  const handleCancel = async()=>{
    setInputValue({
      word: "",
      wordMeaning: "",
      wordSecondMeaning: "",
      wordNote: "",
      wordCategory: ""
    })
  }
  //Acilir sayfayi kapatir
  const handleClose = () => setShow(false)

  //Gerekli degisikliklerden sonra yeni bilgiler DB ye kaydedilir.
  const handleUpdate = async () => {
    try {
      await fetch(`${BASE_URL}/words/${inputValue.id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValue)
      })
    } catch (error) {
      console.log(error)
    }
    setShow(false)
    setInputValue({
      id: null,
      word: "",
      wordMeaning: "",
      wordSecondMeaning: "",
      wordNote: "",
      wordCategory: ""
    })
  }


  //OPEN - CLOSE MODELS IN PRACTICE PAGES
  const handleModalOpen = (content) => {
    setModalContent(content);
    setShowModal(true);
};
const handleModalClose = () => {
    setShowModal(false);
};


//Change the List of Word
const handleEditList = async (pListName, pId)=>{
  try {
    const response = await fetch(`${BASE_URL}/wordtolist` , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pListName, pId }),
    });

    if (response.ok) {
      console.log('Kelime listeye eklendi');
    } else {
      console.error('Hata:1', response.statusText);
    }
  } catch (error) {
    console.error('Hata:2', error);
  }
  
}

//DELETE the List of Word
const handleDeleteList = async(pId)=>{
  try {
    const response = await fetch(`${BASE_URL}/delwordfromlist` , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pId }),
    });

    if (response.ok) {
      console.log('Kelime listeden silindi');
    } else {
      console.error('Hata:1', response.statusText);
    }
  } catch (error) {
    console.error('Hata:2', error);
  }
}

 //GET QUIZ QUESTIONS=====================================================================================================
 const getQuizQuestions = async () => {
  try {
    const response = await fetch(`${BASE_URL}/quizquestions`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    const listArr = Object.entries(data);
    setQuizquestions(listArr)
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch posts")
  }
};

 //GET Aside  Words=====================================================================================================
const [greenWord, setGreenWord] = useState([])
const [yellowWord, setYellowWord] = useState([])
const [redWord, setRedWord] = useState([])

 const getAsideWords = async () => {
  try {
    const response = await fetch(`${BASE_URL}/words`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    const dataGreen = data.filter((word) => word.wordCategory === "success")
    const dataYellow = data.filter((word) => word.wordCategory === "warning")
    const dataRed = data.filter((word) => word.wordCategory === "danger")

    const greenArr = Object.entries(dataGreen);
    const yellowArr = Object.entries(dataYellow);
    const redArr = Object.entries(dataRed);

    const greenRandom = greenArr[Math.floor(Math.random() * greenArr.length)];
    const yellowRandom = yellowArr[Math.floor(Math.random() * yellowArr.length)];
    const redRandom = redArr[Math.floor(Math.random() * redArr.length)];

    setGreenWord(greenRandom)
    setYellowWord(yellowRandom)
    setRedWord(redRandom)
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch posts")
  }
};

//GET SELECTED SENTENCES
const [searchTerm, setSearchTerm] = useState('');
const [searchResults, setSearchResults] = useState([]);

const getSearchedSentences = async (pSearchTerm) => {
  try {
    const response = await fetch(`${BASE_URL}/findExample?filter=${pSearchTerm}`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    const searchedArr = Object.entries(data);
    setSearchResults(searchedArr)

  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch posts")
  }
};


//!
const data = [
  { english: "Nathan" },
  { english: "Jack" },
  { english: "John" },
]
//!
const createLib = async () => {
    try {
      const response = await fetch(`${BASE_URL}/createlib`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.error(error);
    }
  }





  return (
    <wordsContext.Provider value={{
      getWordsList, allWordsList, setAllWordsList,
      greenList, setGreenList,
      yellowList, setYellowList,
      redList, setRedList,
      inputValue, setInputValue,
      handleDelete, handleNewWord,
      handleEdit, handleUpdate, show, setShow,
      handleClose, handleModalOpen, handleModalClose,
      showModal,modalContent,handleEditList,handleDeleteList,
      handleCancel,
      getQuizQuestions,quizQuestions, setQuizquestions, 
      getAsideWords, greenWord,yellowWord,redWord,
      searchTerm, setSearchTerm, searchResults, setSearchResults,getSearchedSentences,
      createLib
      
    }}>
      {children}
    </wordsContext.Provider>

  )
}

export default WordsListContextProvider
