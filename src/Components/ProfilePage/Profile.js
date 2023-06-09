import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from '../../Context/UserContext.js';
import { wordsContext } from "../../Context/wordsListContext.js";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, PieChart, Pie, Sector } from "recharts";
import { Container, Row, Col,Spinner } from 'react-bootstrap';


const Profile = () => {
  const { profileInfo, getProfileInfo } = useContext(UserContext)
  const { getQuizStatistics, quizStatistics, getFiveQuizStatistics, fiveStatistics, getWordsList, greenList, yellowList, redList, allWordsList } = useContext(wordsContext)
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

  //!FIVE QUIZ STATISTICS
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

  //!QUIZ STATISTICS
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
      value,name
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
        >{`${name} ${value}`}</text>
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
      value,
      name
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
        >{`${name} ${value}`}</text>
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
    return <h1>Page is loading
       <Spinner animation="grow" size="sm" />
       <Spinner animation="grow" size="sm" />
       <Spinner animation="grow" size="sm" />
    </h1>

  }


  return (
    <div className='ms-4'>
      {isAuthenticated &&
        <Container>
          <h1 className='text-center mt-3 shadow'>Welcome {profileInfo?.firstName}</h1>
          <hr></hr>
          <h3 className='text-center mt-4 shadow '>Personal Informations</h3>
          <hr></hr>


          <Row className='shadow'>
            <Col md={3}>
              <div className="profile-picture d-flex justify-content-center">
                <img src={user?.picture} className="rounded" alt="Profile Picture" />
              </div>
              <div className="profile-info">
                <h4 className='text-center'>{profileInfo?.role}</h4>
                <h4>{profileInfo?.email}</h4>
              </div>
            </Col>
            <Col md={1} />
            <Col md={8}>
              <div className="personal-info">
                <div className="personal-info-details">
                  <p></p>
                  <p><strong>Ad:</strong> {profileInfo?.firstName}</p>
                  <p><strong>Soyad:</strong> {profileInfo?.lastName}</p>
                  <p><strong>Adres:</strong> - </p>
                  <p><strong>Doğum Tarihi:</strong> {profileInfo?.birthday}</p>
                </div>
              </div>
            </Col>
            <Row className="my-2">
              <Col>&nbsp;</Col>
            </Row>
          </Row>
          <hr></hr>
        </Container>
      }
      <h3 className='text-center my-4 shadow'>Statistics</h3>
      <hr></hr>
      <Row className='d-flex justify-content-center text-center '>
        {/* QUIZ GRAPHICS */}
        <Col md={6} sm={10} className='border border-4 shadow my-1'>
          <h1>Quiz Statistics</h1>
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
        </Col>
        {/* WORDS GRAPHICS */}
        <Col md={6} sm={10} className='border border-4 shadow my-1'>
          <h1>Words Statistics</h1>
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
        </Col>
      </Row>

      <Row className='border border-4 shadow m-5'>
        <Col>

          <h1 className='text-center'>Individual Quiz Statistics</h1>
          <ResponsiveContainer width="100%" height={500}>

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
          </ResponsiveContainer>

        </Col>
      </Row>
    </div>
  )
}

export default Profile