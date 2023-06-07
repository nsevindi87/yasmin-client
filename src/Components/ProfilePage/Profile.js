import React, { useContext, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from '../../Context/UserContext.js';
import { wordsContext } from "../../Context/wordsListContext.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from "recharts";
const data = [
  {
    name: "Page 744",
    uv: 13,
    pv: 3,
    amt:4
  }
];

const renderCustomizedLabel = (props) => {
  const { x, y, width, value } = props;
  const radius = 10;

  return (
    <g>

      <text
        x={x + width / 2}
        y={y - radius}
        fill="black"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value.split(" ")[1]}
      </text>
    </g>
  );
};

const Profile = () => {
  const { profileInfo, getProfileInfo } = useContext(UserContext)
  const { getQuizStatistics, quizStatistics, setQuizStatistics } = useContext(wordsContext)

  const { user, isAuthenticated, isLoading } = useAuth0();





  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getProfileInfo();
        await getQuizStatistics(profileData.id);
      } catch (error) {
        // Hata yönetimi
      }
    };
    fetchData();
  }, [])

  if (isLoading) {
    return <div>Page is loading...</div>

  }


  return (
    <div>
      {isAuthenticated &&
        <div>
          <img src={user?.picture} alt="user_picture" />
          <h1>{profileInfo?.firstName}</h1>
          <h1>{profileInfo?.id}</h1>
          <h1>{user?.email}</h1>
          <h1>Total Questions: {quizStatistics.totalQuestions}</h1>
          <h1>Correct Answers: {quizStatistics.totalCorrectAnswers}</h1>
          <h1>Wrong Answers: {quizStatistics.totalWrongAnswers}</h1>
          <h1>Score: {quizStatistics.totalQuestions * 10} / {quizStatistics.totalScore}</h1>
        </div>
      }
      <BarChart
        width={1000}
        height={500}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <LabelList dataKey="name" content={renderCustomizedLabel} />
        <Bar dataKey="pv" fill="#8884d8" minPointSize={5} />
        <Bar dataKey="uv" fill="#82ca9d" minPointSize={10} />
      </BarChart>
    </div>
  )
}

export default Profile