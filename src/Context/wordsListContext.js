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
  const [showUpdateText, setShowUpdateText] = useState(false);
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

  const [textNewInputValue, setTextNewInputValue] = useState({
    title: "",
    english: "",
    german: "",
    turkish: ""
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
  == //!    WORDS  --------------------------------------------------------------------
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
  == //!    PRACTICE PAGE --------------------------------------------------------------------
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
  == //!    LIST CHANGES  --------------------------------------------------------------------
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
  == //!    TEXT REVIEWS --------------------------------------------------------------------
  ===============================================================================================*/

  const [texts, setTexts] = useState([])

  //GET TEXTS  =================================================
  const getTextReviews = async () => {
    try {
      const response = await fetch(`${BASE_URL}/textReview`);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      const listArr = Object.entries(data);
      setTexts(listArr)
      return data
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch posts")
    }
  };


  
  //GET TEXT BY ID to render
  const [text, setText] = useState([]);
  const getTextById = async (pId) => {
    try {
      const response = await fetch(`${BASE_URL}/textreview/${pId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }
      const data = await response.json();
      setText(data);

    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch post");
    }
  };
 /*==============================================================================================
  == //! PERSONAL TEXT REVIEWS================= --------------------------------------------------------------------
  ===============================================================================================*/

  //GET ALL DATAS By USER ID==========================================================

  const [personalTexts, setPersonalTexts] = useState([])

  const getTextsListByUserId = async (pId) => {
    try {
      const response = await fetch(`${BASE_URL}/textreview/personal/${pId}`);
      const data = await response.json();
      const listArr = Object.entries(data);
      setPersonalTexts(listArr)
      console.log(personalTexts)
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch posts")
    }
  };


  //GET Personal TEXT BY ID to render
  const [personalText, setPersonalText] = useState([]);
  const getpersonalTextById = async (pId) => {
    try {
      const response = await fetch(`${BASE_URL}/textreview/personal/text/${pId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }
      const data = await response.json();
      setPersonalText(data);
      console.log(personalText)

    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch post");
    }
  };


  //ADD NEW Personal TEXT
  const handleNewText = async () => {
    if (textNewInputValue.title.length === 0) {
      alert("Please fill out the title!")
    } else {
      try {
        const response = await fetch(`${BASE_URL}/textreview/personal`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...textNewInputValue, userId: profileInfo?.id }),
        });
        if (!response.ok) {
          throw new Error("Failed to create post");
        }
        getTextsListByUserId(profileInfo?.id)
        setTextNewInputValue({
          title: "",
          english: "",
          german: "",
          turkish: ""
        })
      } catch (error) {
        console.error(error);
      }

    }
  };

    //TEXT FORMU SIFIRLA
    const handleTextCancel = async () => {
      setTextNewInputValue({
        title: "",
        english: "",
        german: "",
        turkish: ""
      })
    }
   
//!UPDATE ISLEMLERI==========
    const handleTextClose = () =>{
      setTextModalShow(!textModalShow)
      setTextNewInputValue({
        title: "",
        english: "",
        german: "",
        turkish: ""
      })
    }
    
    const [textModalShow, setTextModalShow] = useState(false);

    const handleTextEdit = async (pPost) => {
      setTextModalShow(true)
        setTextNewInputValue({
         id: pPost.id,
         title: pPost.title,
         english: pPost.english,
         german: pPost.german,
         turkish: pPost.turkish
       })
    }
  
    //GUNCEL TEXT GONDER
    const handleTextUpdate = async () => {
      try {
        await fetch(`${BASE_URL}/textreview/personal/text/${textNewInputValue.id}`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(textNewInputValue)
        })
      } catch (error) {
        console.log(error)
      }
      setTextModalShow(false)
      getTextsListByUserId(profileInfo?.id)
      setTextNewInputValue({
        title: "",
        english: "",
        german: "",
        turkish: ""
      })
    }

    
    
    
    const handleTextDelete = async (pId) => {
      try {
        await fetch(`${BASE_URL}/textreview/personal/text/${pId}`, {
          method: "DELETE"
        })
        getTextsListByUserId(profileInfo.id)
      } catch (error) {
        console.log(error);
      }
    }

  /*==============================================================================================
  == //!    ADD TEXT in ADMIN PANEL --------------------------------------------------------------------
  ===============================================================================================*/

  //ADD NEW ADMIN TEXT
  const [newTextForAdmin, setNewTextForAdmin] = useState({
    title: "",
    english: "",
    german: "",
    turkish: ""
  })

  const handleNewAdminText = async () => {
    if (newTextForAdmin.title.length === 0) {
      alert("Please fill out the title!")
    } else {
      try {
        const response = await fetch(`${BASE_URL}/textreview`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTextForAdmin),
        });
        if (!response.ok) {
          throw new Error("Failed to create post");
        }
        getTextReviews()
        setNewTextForAdmin({
          title: "",
          english: "",
          german: "",
          turkish: ""
        })
      } catch (error) {
        console.error(error);
      }

    }
  };

 //ADMIN TEXT FORMU SIFIRLA
 const handleAdminTextCancel = async () => {
  setShowUpdateText(false)
  setShowTextForm(false)
  setNewTextForAdmin({
    title: "",
    english: "",
    german: "",
    turkish: ""
  })
}


//!UPDATE ISLEMLERI
const [showTextForm, setShowTextForm] = useState(false);

const handleAdminTextEdit = async (pPost) => {
  setShowUpdateText(true)
  setNewTextForAdmin({
    id: pPost.id,
    title: pPost.title,
    english: pPost.english,
    german: pPost.german,
    turkish: pPost.turkish,
  })
  setShowTextForm(true)
}

//GUNCEL ADMIN TEXT GONDER
const handleAdminTextUpdate = async () => {
  try {
    await fetch(`${BASE_URL}/textreview/${newTextForAdmin.id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTextForAdmin)
    })
  } catch (error) {
    console.log(error)
  }
  setShowUpdateText(false)
  getTextReviews()
  setNewTextForAdmin({
    title: "",
    english: "",
    german: "",
    turkish: ""
  })
}



  //DELETE TEXT  ==================================================
  const handleAdminTextDelete = async (pId) => {
    try {
      await fetch(`${BASE_URL}/textreview/${pId}`, {
        method: "DELETE"
      })
      getTextReviews()
    } catch (error) {
      console.log(error);
    }
  }


  /*==============================================================================================
  == //!    QUIZ QUESTIONS --------------------------------------------------------------------
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

  const [showForm, setShowForm] = useState(false);

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
        setShowForm(false)
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
    setShowForm(false)
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
    setShowForm(true)
    setQuizNewInputValue({
      id: pPost.id,
      question_text: pPost.question_text,
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
    setShowForm(false)
    setQuizNewInputValue({
      question_text: "",
      options: "",
      correct_word: "",
      english_example: "",
      german_example: ""
    })
  }


  /*==============================================================================================
  == //!    QUIZ STATISTICS --------------------------------------------------------------------
  ===============================================================================================*/

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
  == //!     ASIDE WORDS --------------------------------------------------------------------
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
  == //!   EXAMPLE SENTENCES --------------------------------------------------------------------
  ===============================================================================================*/

  //GET SELECTED SENTENCES
  const getSearchedSentencesEnTr = async (pSearchTerm) => {
    try {
      const response = await fetch(`${BASE_URL}/findEnTrExample?filter=${pSearchTerm}`);
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

  //GET SELECTED SENTENCES
  const getSearchedSentencesEnGe = async (pSearchTerm) => {
    try {
      const response = await fetch(`${BASE_URL}/findEnGeExample?filter=${pSearchTerm}`);
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

  //GET SELECTED SENTENCES
  const getSearchedSentencesGeTr = async (pSearchTerm) => {
    try {
      const response = await fetch(`${BASE_URL}/findGeTrExample?filter=${pSearchTerm}`);
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
  == //!    TODO LIST --------------------------------------------------------------------
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


  /* ==============================================================================================
  == //!    CONTACT PAGE --------------------------------------------------------------------
  ===============================================================================================*/


  //CONTACT PAGE SEND NEW MESSAGE
  const [contactInputValue, setContactInputValue] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [showContactToast, setShowContactToast] = useState(false);


  const handleNewMail = async () => {
    if (contactInputValue.name.length === 0 && contactInputValue.email.length === 0 && contactInputValue.message.length === 0) {
      alert("Please fill out the form")
    } else {
      try {
        const response = await fetch(`${BASE_URL}/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactInputValue),
        });
        setShowContactToast(true);
        if (!response.ok) {
          throw new Error("Failed to create post");
        }
        setContactInputValue({
          name: "",
          email: "",
          message: ""
        })
      } catch (error) {
        console.error(error);
      }
    }
  };

  //CONTACT FORM CANCEL
  const handleContactCancel = () => {
    setContactInputValue({
      name: "",
      email: "",
      message: ""
    })
  }

  const [contactMails, setContactMails] = useState([])

  //DELETE WORD  ==================================================
  const getAllContactMails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/contact`);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      const mailsArr = Object.entries(data);
      setContactMails(mailsArr)
      return data
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch posts")
    }
  };

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
      handleQuestionEdit, handleQuestionUpdate, showUpdateQuiz, setShowUpdateQuiz,
      searchTerm, setSearchTerm, searchResults, setSearchResults,
      getSearchedSentencesEnTr, getSearchedSentencesEnGe, getSearchedSentencesGeTr,
      todoValue, setTodoValue, todoList, setTodoList, getTodoList, handleNewTodo,
      handleTodoDelete, handleTodoEdit, handleTodoCancel, handleTodoUpdate, showTodoUpdate, setShowTodoUpdate, showUpdate,
      getAsideWordList, greenAsideList, yellowAsideList, redAsideList,
      getQuizStatistics, quizStatistics, setQuizStatistics,
      getFiveQuizStatistics, fiveStatistics, setFiveStatistics,
      contactInputValue, setContactInputValue, handleNewMail, handleContactCancel,
      getAllContactMails, contactMails, setContactMails,
      showContactToast, setShowContactToast,
      getTextReviews, texts, setTexts, getTextById, text,
      getTextsListByUserId, personalTexts, setPersonalTexts, getpersonalTextById, personalText, setPersonalText,
      textNewInputValue, setTextNewInputValue, handleNewText,handleTextCancel,
      handleTextUpdate,handleTextClose,handleTextEdit,textModalShow, setTextModalShow,handleTextDelete,
      handleNewAdminText,newTextForAdmin, setNewTextForAdmin,handleAdminTextCancel,
      handleAdminTextEdit,showUpdateText, setShowUpdateText,handleAdminTextDelete,
      handleAdminTextUpdate,showTextForm, setShowTextForm,showForm, setShowForm

    }}>
      {children}
    </wordsContext.Provider>

  )
}

export default WordsListContextProvider
