import React, { useContext, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from '../../Context/UserContext.js';
import { wordsContext } from "../../Context/wordsListContext.js";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from "recharts";



const Profile = () => {
  const { profileInfo, getProfileInfo } = useContext(UserContext)
  const { getQuizStatistics, quizStatistics, setQuizStatistics, getFiveQuizStatistics, fiveStatistics, setFiveStatistics } = useContext(wordsContext)
  const { user, isAuthenticated, isLoading } = useAuth0();

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

  const formattedData = fiveStatistics.map(item => {
    const date = new Date(item.createdAt);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return { ...item, createdAt: `${formattedDate} - ${formattedTime}` };
  });

  const getChartData = () => {
    const firstData = formattedData[0];
    const secondData = formattedData[1];
    const thirdData = formattedData[2];
    const fourthData = formattedData[3];
    const fifthData = formattedData[4];

    const data = [
      {
        name: firstData?.createdAt,
        Total: firstData?.correctAnswers +firstData?.wrongAnswers,
        Correct: firstData?.correctAnswers,
        Wrong: firstData?.wrongAnswers,
        
      },
      {
        name: secondData?.createdAt,
        Total: secondData?.correctAnswers +firstData?.wrongAnswers,
        Correct: secondData?.correctAnswers,
        Wrong: secondData?.wrongAnswers,
      },
      {
        name: thirdData?.createdAt,
        Total: thirdData?.correctAnswers +firstData?.wrongAnswers,
        Correct: thirdData?.correctAnswers,
        Wrong: thirdData?.wrongAnswers,
      },
      {
        name: fourthData?.createdAt,
        Total: fourthData?.correctAnswers +firstData?.wrongAnswers,
        Correct: fourthData?.correctAnswers,
        Wrong: fourthData?.wrongAnswers,
      },
      {
        name: fifthData?.createdAt,
        Total: fifthData?.correctAnswers +firstData?.wrongAnswers,
        Correct: fifthData?.correctAnswers,
        Wrong: fifthData?.wrongAnswers,
      },
    ];

    return data
  }

  const chartData = getChartData();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getProfileInfo();
        await getQuizStatistics(profileData.id);
        await getFiveQuizStatistics(profileData.id);
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
          <h1 className='text-center'>Hoşgeldin {profileInfo?.firstName}</h1>
          <img src={user?.picture} alt="user_picture" />
          <h1>{profileInfo?.id}</h1>
          <h1>{user?.sex}</h1>
          <h1>Total Questions: {quizStatistics.totalQuestions}</h1>
          <h1>Correct Answers: {quizStatistics.totalCorrectAnswers}</h1>
          <h1>Wrong Answers: {quizStatistics.totalWrongAnswers}</h1>
          <h1>Score: {quizStatistics.totalQuestions * 10} / {quizStatistics.totalScore}</h1>

          <h1>{fiveStatistics.map((x) => (
            <h2>{x.questions}</h2>
          ))}</h1>
        </div>
      }
      <BarChart
        width={1000}
        height={500}
        data={chartData}
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
        <Bar dataKey="Total" fill="#9c89b8" minPointSize={5} />
        <Bar dataKey="Correct" fill="#77bfa3" minPointSize={5} />
        <Bar dataKey="Wrong" fill="#ffbcaa" minPointSize={10} />
      </BarChart>
    </div>
  )
}

export default Profile