import { createContext, useState,useContext } from "react"
import { UserContext } from './UserContext.js';

export const wordsContext = createContext()


const WordsListContextProvider = ({ children }) => {
 /* ==============================================================================================
== //!    INITIAL STATES
===============================================================================================*/

  const [allWordsList, setAllWordsList] = useState([]);
  const [greenList, setGreenList] = useState([]);
  const [yellowList, setYellowList] = useState([]);
  const [redList, setRedList] = useState([]);
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [quizQuestions, setQuizquestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showTodoUpdate, setShowTodoUpdate] = useState(false);

  const {profileInfo,user2, getProfileInfo} = useContext(UserContext)

  const [inputValue, setInputValue] = useState({
    id: null,
    word: "",
    wordMeaning: "",
    wordSecondMeaning: "",
    wordNote: "",
    wordCategory: ""
  })

  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState({
    id: null,
    task: "",
    date: "",
    time: ""
  })

  //BASE URL
  const BASE_URL = "http://localhost:3302"

/* ==============================================================================================
== //!    WORDS  -GET -ADD  -DELETE 
===============================================================================================*/

  //GET ALL DATAS==========================================================
  const getWordsList = async (pId) => {
    try {
      const response = await fetch(`${BASE_URL}/words/${pId}`);
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


  //ADD NEW WORD===============================================================
  const handleNewWord = async () => {
    if (inputValue.word.length === 0 && inputValue.wordMeaning.length === 0 && inputValue.wordSecondMeaning.length === 0 && inputValue.wordNote.length === 0) {
      alert("En azindan ilk bölümü doldurun")
    } else {
      try {
        getProfileInfo()
        const response = await fetch(`${BASE_URL}/words`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...inputValue, userId:profileInfo?.id}),
        });
        console.log(response)
        getWordsList()
        if (!response.ok) {
          throw new Error("Failed to create post");
        }
        setInputValue({
          word: "",
          wordMeaning: "",
          wordSecondMeaning: "",
          wordNote: "",
          wordCategory: "",
          userId:profileInfo.id
        })
      } catch (error) {
        console.error(error);
      }

    }
  };

  //DELETE WORD  ==================================================
  const handleDelete = async (pId) => {
    try {
      await fetch(`${BASE_URL}/words/${pId}`, {
        method: "DELETE"
      })
      getWordsList()
    } catch (error) {
      console.log(error);
    }
  }

/* ==============================================================================================
== //!    UPDATE WORDS
===============================================================================================*/

//Edit tiklandiginda forma eski bilgiler gelir
  const handleEdit = async (pPost) => {
    setShow(true)
    setShowUpdate(true)
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
  const handleCancel = async () => {
    setShowUpdate(false)
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
    setShowUpdate(false)
    getWordsList()


    setInputValue({
      id: null,
      word: "",
      wordMeaning: "",
      wordSecondMeaning: "",
      wordNote: "",
      wordCategory: ""
    })
  }

/*==============================================================================================
== //!    PRACTICE PAGE
===============================================================================================*/

  //OPEN - CLOSE MODELS IN PRACTICE PAGES
  const handleModalOpen = (content) => {
    setModalContent(content);
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

/* ==============================================================================================
== //!    LIST CHANGES   -EDIT -DELETE
===============================================================================================*/

  //Change the List of Word
  const handleEditList = async (pListName, pId) => {
    try {
      const response = await fetch(`${BASE_URL}/wordtolist/addList`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pListName, pId }),
      });
      if (response.ok) {
        console.log('Kelime listeye eklendi');
        getWordsList()
      } else {
        console.error('Hata:1', response.statusText);
      }
    } catch (error) {
      console.error('Hata:2', error);
    }
  }

  //DELETE the List of Word
  const handleDeleteList = async (pId) => {
    try {
      const response = await fetch(`${BASE_URL}/wordtolist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pId}),
      });
      if (response.ok) {
        console.log('Kelime listeden silindi');
        getWordsList()
      } else {
        console.error('Hata:1', response.statusText);
      }
    } catch (error) {
      console.error('Hata:2', error);
    }
  }

/*==============================================================================================
== //!    QUIZ INFORMATIONS
===============================================================================================*/

  //GET QUIZ QUESTIONS=================================================
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

/* ==============================================================================================
== //!     ASIDE WORDS
===============================================================================================*/

const [greenAsideList, setGreenAsideList] = useState([]);
const [yellowAsideList, setYellowAsideList] = useState([]);
const [redAsideList, setRedAsideList] = useState([]);


  //GET Aside  Words===================================================
  
  const getAsideWordList = async (pId) => {
    try {
      const response = await fetch(`${BASE_URL}/asideWords/${pId}`);
      const dataAside = await response.json();
      const dataAsideGreen = dataAside?.filter((word) => word.wordCategory === "success")
      const dataAsideYellow = dataAside?.filter((word) => word.wordCategory === "warning")
      const dataAsideRed = dataAside?.filter((word) => word.wordCategory === "danger")

      console.log(dataAside)
      setGreenAsideList(dataAsideGreen)
      setYellowAsideList(dataAsideYellow)
      setRedAsideList(dataAsideRed)
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch posts")
    }
  };

/* ==============================================================================================
== //!   EXAMPLE SENTENCES 
===============================================================================================*/

  //GET SELECTED SENTENCES
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

/* ==============================================================================================
== //!    TODO LIST - ADD - DELETE  - EDIT
===============================================================================================*/

//GET ALL TODOS   ========================================================
const getTodoList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/todos`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    const listArr = Object.entries(data);
    setTodoList(listArr)
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch posts")
  }
};


//ADD NEW TODO   ===========================================================
const currentDate = new Date().toISOString().slice(0, 10);
const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const handleNewTodo = async () => {
  if (todoValue.task === "" || todoValue.date === "" || todoValue.time === "") {
    alert("Please fill in the entire form ")
  } else if (todoValue.date < currentDate || (todoValue.date === currentDate && todoValue.time < currentTime)){
    alert("Please select a current date and time!")
  } else {
    try {
      getProfileInfo()
      console.log(profileInfo?.id)
      const response = await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...todoValue, userId:profileInfo?.id}),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      setTodoValue({
        task: "",
        date: "",
        time: "",
        userId:profileInfo.id
      })
    } catch (error) {
      console.error(error);
    }
    getTodoList()
  }
};

//DELETE TODO  ==================================================
const handleTodoDelete = async (pId) => {
  try {
    await fetch(`${BASE_URL}/todos/${pId}`, {
      method: "DELETE"
    })
  } catch (error) {
    console.log(error);
  }
  getTodoList()
}

//UPDATE TODO  ====================================================
  //Edit tiklandiginda forma eski bilgiler gelir
  const handleTodoEdit = async (pTodo) => {
    setShowTodoUpdate(true)
    
    setTodoValue({
      id: pTodo.id,
      task: pTodo.task,
      date: pTodo.date.slice(0,10),
      time: pTodo.time,
    })
  }

  //FORMU SIFIRLA
  const handleTodoCancel = async () => {
    setShowTodoUpdate(false)
    setTodoValue({
      task: "",
      date: "",
      time: "",
    })
  }

  //Gerekli degisikliklerden sonra yeni bilgiler DB ye kaydedilir.
  const handleTodoUpdate = async () => {
    try {
      await fetch(`${BASE_URL}/todos/${todoValue.id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoValue)
        
      })
      console.log(todoValue)
    } catch (error) {
      console.log(error)
    }
    getTodoList()
    setShowTodoUpdate(false)
    setTodoValue({
      id:null,
      task: "",
      date: "",
      time: "",
    })
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
      showModal, modalContent, handleEditList, handleDeleteList,
      handleCancel,
      getQuizQuestions, quizQuestions, setQuizquestions,
      searchTerm, setSearchTerm, searchResults, setSearchResults, getSearchedSentences,
      todoValue, setTodoValue, todoList, setTodoList, getTodoList, handleNewTodo,
      handleTodoDelete,handleTodoEdit,handleTodoCancel,handleTodoUpdate,showTodoUpdate, setShowTodoUpdate,showUpdate,
      getAsideWordList,greenAsideList,yellowAsideList,redAsideList

    }}>
      {children}
    </wordsContext.Provider>

  )
}

export default WordsListContextProvider
