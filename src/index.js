import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react"
import 'bootstrap/dist/css/bootstrap.css';
import "./index.css"
import {
  createHashRouter,
  RouterProvider
} from "react-router-dom";
import Home from './Components/MainPage/Home';
import About from './Components/About Page/About';
import Contact from './Components/Contact Page/Contact';
import Profile from './Components/ProfilePage/Profile';
import FindEnTrExample from './Components/FindExample/FindEnTrExample.js';
import FindEnGeExample from './Components/FindExample/FindEnGeExample.js';
import FindGeTrExample from './Components/FindExample/FindGeTrExample.js';
import AddWord from './Components/AddWordPage/AddWord';
import Todo from "./Components/ToDoPage/ToDoMain"
import AllList from './Components/Lists/AllList';
import YellowList from './Components/Lists/YellowList';
import GreenList from './Components/Lists/GreenList';
import RedList from './Components/Lists/RedList';
import Practice from "./Components/PracticePages/Practice";
import PracticeGreenList from "./Components/PracticePages/PracticeGreenList.js"
import PracticeYellowList from "./Components/PracticePages/PracticeYellowList.js"
import PracticeRedList from "./Components/PracticePages/PracticeRedList.js"
import QuizPage from "./Components/QuizPage/QuizPage.js";
import WelcomePage from './Components/WelcomePage.js';
import Admin from './Components/Admin/Admin.js';
import ProtectedRoute from "./Components/ProtectedRoute.js"
import TextReview from "./Components/TextReview/TextReview.js"
import Text from "./Components/TextReview/Text.js"
import EnglishTexts from './Components/TextReview/EnglishTexts';
import GermanTexts from './Components/TextReview/GermanTexts';
import TurkishTexts from './Components/TextReview/TurkishTexts';




const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "about",
        element:
          <About />
      },
      {
        path: "contact",
        element:
          <Contact />
      },
      {
        path: "welcome",
        element:
          <WelcomePage />
      },
      {
        path: "profile",
        element:
          <Profile />
      },
      {
        path: "findExample",
        element: <ProtectedRoute>
          <FindEnTrExample />
        </ProtectedRoute>
      },
      {
        path: "findEnTrExample",
        element: <ProtectedRoute>
          <FindEnTrExample />
        </ProtectedRoute>
      },
      {
        path: "findEnGeExample",
        element: <ProtectedRoute>
          <FindEnGeExample />
        </ProtectedRoute>
      },
      {
        path: "findGeTrExample",
        element: <ProtectedRoute>
          <FindGeTrExample />
        </ProtectedRoute>
      },
      {
        path: "addword",
        element:
          <AddWord />
      },
      {
        path: "todo",
        element:
          <Todo />
      },
      {
        path: "alllist",
        element:
          <AllList />
      },
      {
        path: "yellowlist",
        element:
          <YellowList />
      },
      {
        path: "greenlist",
        element:
          <GreenList />
      },
      {
        path: "redlist",
        element:
          <RedList />
      },
      {
        path: "practice",
        element:
          <Practice />
      },
      {
        path: "practice-greenList",
        element:
          <PracticeGreenList />
      },
      {
        path: "practice-yellowList",
        element:
          <PracticeYellowList />
      },
      {
        path: "practice-redList",
        element:
          <PracticeRedList />
      },
      {
        path: "quiz",
        element: <ProtectedRoute>
          <QuizPage />
        </ProtectedRoute>
      },
      {
        path: "admin",
        element:
          <Admin />
      },
      {
        path: "textreview",
        element:
          <TextReview />
      },{
        path:"textreview/english",
        element:<EnglishTexts/>      
      },{
        path:"textreview/german",
        element:<GermanTexts/>      
      },{
        path:"textreview/turkce",
        element:<TurkishTexts/>      
      },{
        path:"textreview/english/:id",
        element:<TextEng/>      
      },{
        path:"textreview/german/:id",
        element:<TextGer/>      
      },{
        path:"textreview/turkish/:id",
        element:<TextTr/>      
      }
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);