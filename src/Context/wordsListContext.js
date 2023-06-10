import { createContext, useState, useContext } from "react"
import { UserContext } from './UserContext.js';

export const wordsContext = createContext()


const WordsListContextProvider = ({ children }) => {
  /* ==============================================================================================
 == //!    INITIAL STATES
 ===============================================================================================*/

  const [allWordsList, setAllWordsList] = useState([]);
  const [allWordsList2, setAllWordsList2] = useState([]);
  const [greenList, setGreenList] = useState([]);
  const [yellowList, setYellowList] = useState([]);
  const [redList, setRedList] = useState([]);
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showUpdateQuiz, setShowUpdateQuiz] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [quizQuestions, setQuizquestions] = useState([]);
  const [allQuizQuestions, setAllQuizquestions] = useState([]);
  const [quizStatistics, setQuizStatistics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showTodoUpdate, setShowTodoUpdate] = useState(false);
  const [fiveStatistics, setFiveStatistics] = useState([])

  const { profileInfo, getProfileInfo } = useContext(UserContext)

  const [inputValue, setInputValue] = useState({
    id: null,
    word: "",
    wordMeaning: "",
    wordSecondMeaning: "",
    wordNote: "",
    wordCategory: ""
  })

  const [quizNewInputValue, setQuizNewInputValue] = useState({
    question_text: "",
    options: "",
    correct_word: "",
    english_example: "",
    german_example: ""
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

  //GET ALL DATAS ==========================================================
  const getAllWords = async () => {
    try {
      const response = await fetch(`${BASE_URL}/words`);
      const data = await response.json();
      setAllWordsList2(data)
      return data
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch posts")
    }
  };

  //GET ALL DATAS By ID==========================================================
  const getWordsList = async (pId) => {
    try {
      const response = await fetch(`${BASE_URL}/words/${pId}`);
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
        const response = await fetch(`${BASE_URL}/words`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...inputValue, userId: profileInfo?.id }),
        });
        getWordsList(profileInfo.id)
        if (!response.ok) {
          throw new Error("Failed to create post");
        }
        setInputValue({
          word: "",
          wordMeaning: "",
          wordSecondMeaning: "",
          wordNote: "",
          wordCategory: "",
          userId: profileInfo.id
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
      getWordsList(profileInfo.id)
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
    getWordsList(profileInfo.id)


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
        getWordsList(profileInfo.id)
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
        body: JSON.stringify({ pId }),
      });
      if (response.ok) {
        console.log('Kelime listeden silindi');
        getWordsList(profileInfo.id)
      } else {
        console.error('Hata:1', response.statusText);
      }
    } catch (error) {
      console.error('Hata:2', error);
    }
  }

  /*==============================================================================================
  == //!    QUIZ QUESTIONS
  ===============================================================================================*/

  //GET QUIZ QUESTIONS (just 5 questions)=================================================
  const getQuizQuestions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/quizquestions`);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      const listArr = Object.entries(data);
      console.log(data)
      console.log(listArr)
      setQuizquestions(listArr)
      return data
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch posts")
    }
  };
  //GET QUIZ QUESTIONS (All of them) =================================================
  const getAllQuizQuestions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/allquizquestions`);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      const listArr = Object.entries(data);
      setAllQuizquestions(listArr)
      return data
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch posts")
    }
  };

  //ADD NEW QUESTION
  const handleNewQuestion = async () => {
    if (quizNewInputValue.question_text.length === 0 && quizNewInputValue.options.length === 0 && quizNewInputValue.correct_word.length === 0) {
      alert("Please fill out the form correctly!")
    } else {
      try {
        const response = await fetch(`${BASE_URL}/quizquestions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(quizNewInputValue),
        });
        getAllQuizQuestions()
        if (!response.ok) {
          throw new Error("Failed to create post");
        }
        setQuizNewInputValue({
          question_text: "",
          options: "",
          correct_word: "",
          english_example: "",
          german_example: ""
        })
      } catch (error) {
        console.error(error);
      }

    }
  };

  //Soru FORMU SIFIRLA
  const handleQuestionCancel = async () => {
    setShowUpdateQuiz(false)

    setQuizNewInputValue({
      question_text: "",
      options: "",
      correct_word: "",
      english_example: "",
      german_example: ""
    })
  }

  //DELETE QUESTION  ==================================================
  const handleQuestionDelete = async (pId) => {
    try {
      await fetch(`${BASE_URL}/quizquestions/${pId}`, {
        method: "DELETE"
      })
      getAllQuizQuestions()
    } catch (error) {
      console.log(error);
    }
  }

  //UPDATE QUIZ QUESTION   ==================================================
  //Edit tiklandiginda forma eski bilgiler gelir

  const handleQuestionEdit = async (pPost) => {
    setShowUpdateQuiz(true)
    setQuizNewInputValue({
      id: pPost.id,
      question_text: pPost,
      options: pPost.options,
      correct_word: pPost.correct_word,
      english_example: pPost.english_example,
      german_example: pPost.german_example
    })
  }

  const handleQuestionUpdate = async () => {
    try {
      await fetch(`${BASE_URL}/quizquestions/${quizNewInputValue.id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizNewInputValue)
      })
    } catch (error) {
      console.log(error)
    }
    setShowUpdateQuiz(false)
    getAllQuizQuestions()

    setQuizNewInputValue({
      question_text: "",
      options: "",
      correct_word: "",
      english_example: "",
      german_example: ""
    })
  }
  

  //!GET QUIZ STATISTICS
  const getQuizStatistics = async (pId) => {
    try {
      const response = await fetch(`${BASE_URL}/quizstatistics/all/${pId}`);
      const data = await response.json();
      setQuizStatistics(data)
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch posts")
    }
  };

  //Get five statistics
  const getFiveQuizStatistics = async (pId) => {
    try {
      const response = await fetch(`${BASE_URL}/quizstatistics/${pId}`);
      const data = await response.json();
      setFiveStatistics(data)
      console.log(fiveStatistics)
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
  const getTodoList = async (pId) => {
    try {
      const response = await fetch(`${BASE_URL}/todos/${pId}`);
      const data = await response.json();
      setTodoList(data)
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
    } else if (todoValue.date < currentDate || (todoValue.date === currentDate && todoValue.time < currentTime)) {
      alert("Please select a current date and time!")
    } else {
      try {
        const response = await fetch(`${BASE_URL}/todos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...todoValue, userId: profileInfo?.id }),
        });
        if (!response.ok) {
          throw new Error("Failed to create post");
        }
        setTodoValue({
          task: "",
          date: "",
          time: "",
          userId: profileInfo.id
        })
      } catch (error) {
        console.error(error);
      }
      getTodoList(profileInfo.id)
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
    getTodoList(profileInfo.id)
  }

  //UPDATE TODO  ====================================================
  //Edit tiklandiginda forma eski bilgiler gelir
  const handleTodoEdit = async (pTodo) => {
    setShowTodoUpdate(true)

    setTodoValue({
      id: pTodo.id,
      task: pTodo.task,
      date: pTodo.date.slice(0, 10),
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
    if (todoValue.task === "" || todoValue.date === "" || todoValue.time === "") {
      alert("Please fill in the entire form ")
    } else if (todoValue.date < currentDate || (todoValue.date === currentDate && todoValue.time < currentTime)) {
      alert("Please select a current date and time!")
    } else {
      try {
        await fetch(`${BASE_URL}/todos/${todoValue.id}`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todoValue)

        })
      } catch (error) {
        console.log(error)
      }
      getTodoList(profileInfo.id)
      setShowTodoUpdate(false)
      setTodoValue({
        id: null,
        task: "",
        date: "",
        time: "",
      })
    }
  }

  return (
    <wordsContext.Provider value={{
      getWordsList, setAllWordsList,
      allWordsList, greenList, setGreenList,
      yellowList, setYellowList, redList, setRedList,
      getAllWords, allWordsList2, setAllWordsList2,
      inputValue, setInputValue,
      handleDelete, handleNewWord,
      handleEdit, handleUpdate, show, setShow,
      handleClose, handleModalOpen, handleModalClose,
      showModal, modalContent, handleEditList, handleDeleteList, handleCancel,
      getQuizQuestions, quizQuestions, setQuizquestions,
      getAllQuizQuestions, allQuizQuestions, setAllQuizquestions,
      handleNewQuestion, quizNewInputValue, setQuizNewInputValue, handleQuestionCancel,
      handleQuestionDelete, 
      handleQuestionEdit,handleQuestionUpdate,showUpdateQuiz,setShowUpdateQuiz,
      searchTerm, setSearchTerm, searchResults, setSearchResults, getSearchedSentences,
      todoValue, setTodoValue, todoList, setTodoList, getTodoList, handleNewTodo,
      handleTodoDelete, handleTodoEdit, handleTodoCancel, handleTodoUpdate, showTodoUpdate, setShowTodoUpdate, showUpdate,
      getAsideWordList, greenAsideList, yellowAsideList, redAsideList,
      getQuizStatistics, quizStatistics, setQuizStatistics,
      getFiveQuizStatistics, fiveStatistics, setFiveStatistics

    }}>
      {children}
    </wordsContext.Provider>

  )
}

export default WordsListContextProvider
