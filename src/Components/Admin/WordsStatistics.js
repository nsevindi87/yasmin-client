import React, { useContext, useState, useEffect,useCallback } from 'react';
import { wordsContext } from "../../Context/wordsListContext.js";
import { UserContext } from '../../Context/UserContext.js';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import {  PieChart, Pie, Sector } from "recharts";


const WordsStatistics = () => {

  const { getAllWords, allWordsList2, setAllWordsList2 } = useContext(wordsContext)
  const { getAllUsers, allUsers, setAllUsers } = useContext(UserContext)
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [userWordsNumbers, setUserWordsNumbers] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(true);

  const greenWordNum = allWordsList2.filter((word) => word.wordCategory === 'success').length;
  const yellowWordNum = allWordsList2.filter((word) => word.wordCategory === 'warning').length;
  const redWordNum = allWordsList2.filter((word) => word.wordCategory === 'danger').length;

  const data = [
    { name: "All of Words", value: Number(allWordsList2.length) },
    { name: "Green List", value: Number(greenWordNum) },
    { name: "Yellow Words", value: Number(yellowWordNum) },
    { name: "Red Words", value: Number(redWordNum) },
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



  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllUsers();
        const datalar = await getAllWords();
        setDataLoaded(false);

        // Kullanıcı ID arrayi
        const userIDs = allUsers.map((user) => user.id);

        const updatedUserWordsNumbers = userIDs.map((userID) => {

          const userWordsListArr = datalar.filter((word) => word.userId === userID);
          const totalWordNum = userWordsListArr.length;
          const greenWordNum = userWordsListArr.filter((word) => word.wordCategory === 'success').length;
          const yellowWordNum = userWordsListArr.filter((word) => word.wordCategory === 'warning').length;
          const redWordNum = userWordsListArr.filter((word) => word.wordCategory === 'danger').length;

          return {
            userID,
            total: totalWordNum,
            green: greenWordNum,
            yellow: yellowWordNum,
            red: redWordNum,
          };
        });

        return setUserWordsNumbers(updatedUserWordsNumbers)
      } catch (error) {
        console.log(error);
      }
    };

    if (dataLoaded) {
      fetchData();
    }

  }, [dataLoaded, allUsers, allWordsList2]);

  return (
    <Container>
      <Row className='mt-5' >
      <Button variant='warning' className='py-4 mb-2 text-center' >Words Statistics</Button>
        <Col>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr className='text-center'>
                <th>#</th>
                <th>User Name</th>
                <th>User E-mail</th>
                <th>Total Words</th>
                <th>Green List</th>
                <th>Yellow List </th>
                <th>Red List </th>
              </tr>
            </thead>
            <tbody>
              {userWordsNumbers?.map((user, value) => (
                <tr key={value} className='text-center'>
                  <td>{value + 1}</td>
                  <td>{allUsers[value].firstName}</td>
                  <td>{allUsers[value].email}</td>
                  <td>{user.total}</td>
                  <td>{user.green}</td>
                  <td>{user.yellow}</td>
                  <td>{user.red}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <hr></hr>
      <Row className='d-flex justify-content-center'>
      <Button variant='warning' className='py-4 mt-3 mb-2 text-center' >The Ratio of All Words In The List</Button>

        <Col lg="10" className='border border-4 shadow mb-3 d-flex flex-column justify-content-center ' >
          <div>
          <PieChart width={700} height={400}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx={300}
              cy={200}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            />
          </PieChart>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default WordsStatistics