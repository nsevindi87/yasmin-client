import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from '../../Context/UserContext.js';
import { wordsContext } from "../../Context/wordsListContext.js";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, PieChart, Pie, Sector } from "recharts";
import { all } from 'axios';



const Profile = () => {
  const { profileInfo, getProfileInfo } = useContext(UserContext)
  const { getQuizStatistics, quizStatistics, getFiveQuizStatistics, fiveStatistics,getWordsList, greenList, yellowList,redList, allWordsList } = useContext(wordsContext)
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

  //FORMAT CREATEDAT DATE AND TIME
  const formattedData = fiveStatistics.map(item => {
    const date = new Date(item.createdAt);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return { ...item, createdAt: `${formattedDate} - ${formattedTime}` };
  });

  //DATA for five statistics
  const getChartData = () => {
    const firstData = formattedData[0];
    const secondData = formattedData[1];
    const thirdData = formattedData[2];
    const fourthData = formattedData[3];
    const fifthData = formattedData[4];

    const data = [
      {
        name: firstData?.createdAt,
        Total: firstData?.correctAnswers + firstData?.wrongAnswers,
        Correct: firstData?.correctAnswers,
        Wrong: firstData?.wrongAnswers,

      },
      {
        name: secondData?.createdAt,
        Total: secondData?.correctAnswers + secondData?.wrongAnswers,
        Correct: secondData?.correctAnswers,
        Wrong: secondData?.wrongAnswers,
      },
      {
        name: thirdData?.createdAt,
        Total: thirdData?.correctAnswers + thirdData?.wrongAnswers,
        Correct: thirdData?.correctAnswers,
        Wrong: thirdData?.wrongAnswers,
      },
      {
        name: fourthData?.createdAt,
        Total: fourthData?.correctAnswers + fourthData?.wrongAnswers,
        Correct: fourthData?.correctAnswers,
        Wrong: fourthData?.wrongAnswers,
      },
      {
        name: fifthData?.createdAt,
        Total: fifthData?.correctAnswers + fifthData?.wrongAnswers,
        Correct: fifthData?.correctAnswers,
        Wrong: fifthData?.wrongAnswers,
      },
    ];

    return data
  }
  const chartData = getChartData();



  //!TOTAL STATISTICS
  const data = [
    { name: "Total Questions", value: Number(quizStatistics.totalQuestions) },
    { name: "Wrong Answers", value: Number(quizStatistics.totalWrongAnswers) },
    { name: "Correct Answers", value: Number(quizStatistics.totalCorrectAnswers) }
  ];

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill="red"
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill="orange"
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`Total ${value}`}</text>
        {/* <text
          x={ex + (cos >= 0 ? 1 : -1) * 15}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text> */}
      </g>
    );
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );


  //!WORDS  STATISTICS
  const dataWords = [
    { name: "Green List", value: Number(greenList.length) },
    { name: "Red List", value: Number(redList.length) },
    { name: "Yellow List", value: Number(yellowList.length) },
    { name: "All of Word List", value: Number(allWordsList.length) }
  ];

  const renderActiveShape2 = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill="red"
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill="orange"
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`Total ${value}`}</text>
        {/* <text
          x={ex + (cos >= 0 ? 1 : -1) * 15}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text> */}
      </g>
    );
  };

  const [activeIndex2, setActiveIndex2] = useState(0);

  const onPieEnter2 = useCallback(
    (_, index) => {
      setActiveIndex2(index);
    },
    [setActiveIndex2]
  );


  //!USEEFFECT
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getProfileInfo();
        await getQuizStatistics(profileData.id);
        await getFiveQuizStatistics(profileData.id);
        await getWordsList(profileData.id)
        console.log(greenList)
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
    <div className='ms-4'>
      {isAuthenticated &&
        <div>
          <h1 className='text-center'>Hoşgeldin {profileInfo?.firstName}</h1>
          <img src={user?.picture} alt="user_picture" className='rounded' />
          <h1>{profileInfo?.id}</h1>
          <h1>{user?.sex}</h1>
          <h1>Total Questions: {quizStatistics.totalQuestions}</h1>
          <h1>Correct Answers: {quizStatistics.totalCorrectAnswers}</h1>
          <h1>Wrong Answers: {quizStatistics.totalWrongAnswers}</h1>
          <h1>Score: {quizStatistics.totalQuestions * 10} / {quizStatistics.totalScore}</h1>
        </div>
      }

      <div className='d-flex text-center '>
        {/* QUIZ GRAPHICS */}
        <div className='border border-4 shadow'>
          <h1>Quiz Istatistics</h1>
          <PieChart width={500} height={400}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx={230}
              cy={200}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            />
          </PieChart>
        </div>

        {/* WORDS GRAPHICS */}
        <div className='border border-4 ms-3 shadow'>
          <h1>Words Istatistics</h1>
          <PieChart width={500} height={400}>
            <Pie
              activeIndex={activeIndex2}
              activeShape={renderActiveShape2}
              data={dataWords}
              cx={230}
              cy={200}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter2}
            />
          </PieChart>
        </div>
      </div>
      <div className='border border-4 shadow m-5'>
        <h1 className='text-center'>Quiz Individuel Statistics</h1>
      <BarChart
        width={900}
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
    </div>
  )
}

export default Profile