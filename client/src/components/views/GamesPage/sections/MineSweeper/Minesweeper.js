import React, { useState, memo, useEffect } from 'react';
import '../MineSweeper/Minesweeper.css'
import { Form, Button, Input, Typography, Divider } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
const { Title } = Typography;


function Minesweeper() {
  const user = useSelector(state => state.user);

  const [tableData, setTableData] = useState([]);
  const [Row, setRow] = useState(10);
  const [Cell, setCell] = useState(10);
  const [Mine, setMine] = useState(20);
  const [Start, setStart] = useState(false);
  const [Finish, setFinish] = useState(false);
  const [Record, setRecord] = useState(false);
  const [Gamelevel, setGamelevel] = useState('')
  const [Time, setTime] = useState(0);
  const [TimeCount, setTimeCount] = useState('')
  const [EasyRanking, setEasyRanking] = useState([]);
  const [MediumRanking, setMediumRanking] = useState([]);
  const [HardRanking, setHardRanking] = useState([]);


  const code = {
    NORMAL: -1,
    MINE: -4,
    MINE_QUESTION: -5,
    MINE_FLAG: -6,
    QUESTION: -2,
    FLAG: -3,
    OPENED: 0,
    Clicked_MINE: -7
  }

  useEffect(() => {
    let lists = [{ game: 'minesweepereasy' }, { game: 'minesweepermedium' }, { game: 'minesweeperhard' }]

    axios.post('api/score/getTime', lists[0])
      .then(response => {
        if (response.data.success) {
          console.log(response.data.time)
          let top5 = response.data.time
          setEasyRanking(top5)
        }
      })
    axios.post('api/score/getTime', lists[1])
      .then(response => {
        if (response.data.success) {
          console.log(response.data.time)
          let top5 = response.data.time
          setMediumRanking(top5)
        }
      })
    axios.post('api/score/getTime', lists[2])
      .then(response => {
        if (response.data.success) {
          console.log(response.data.time)
          let top5 = response.data.time
          setHardRanking(top5)
        }
      })
    plantMine()
  }, [Start, Row, Cell, Mine, Record])

  const plantMine = () => {
    if (!Start) return
    timer()
    let row = parseInt(Row);
    let cell = parseInt(Cell);
    let mine = parseInt(Mine);

    let TableData = Array(row).fill().map(row => (
      Array(cell).fill().map(cell => code.NORMAL)
    ))

    const candidate = Array(row * cell).fill().map((mine, i) => i)
    let mineList = [];
    for (let i = 0; i < mine; i++) {
      let random = Math.floor(Math.random() * candidate.length)
      mineList.push(parseInt(candidate.splice(random, 1)))
    }


    for (let i = 0; i < mineList.length; i++) {
      const ri = Math.floor(mineList[i] / row)
      const ci = mineList[i] % row
      TableData[ri][ci] = code.MINE
    }

    setTableData(TableData)
  }

  const onRightClick = (e) => {
    e.preventDefault()
    const ri = e.target.parentNode.rowIndex;
    const ci = e.target.cellIndex;
    const TableData = [...tableData];
    if (TableData[ri][ci] === code.NORMAL) {
      e.target.textContent = '?'
      e.target.className = 'question'
      TableData[ri][ci] = code.QUESTION
    } else if (TableData[ri][ci] === code.QUESTION) {
      e.target.textContent = '!'
      e.target.className = 'flag'
      TableData[ri][ci] = code.FLAG
    } else if (TableData[ri][ci] === code.FLAG) {
      e.target.textContent = ''
      e.target.className = ''
      TableData[ri][ci] = code.NORMAL
    } else if (TableData[ri][ci] === code.MINE) {
      e.target.textContent = '?'
      e.target.className = 'question'
      TableData[ri][ci] = code.MINE_QUESTION
    } else if (TableData[ri][ci] === code.MINE_QUESTION) {
      e.target.textContent = '!'
      e.target.className = 'flag'
      TableData[ri][ci] = code.MINE_FLAG
    } else if (TableData[ri][ci] === code.MINE_FLAG) {
      e.target.textContent = 'x'
      e.target.className = ''
      TableData[ri][ci] = code.MINE
    }
    setTableData(TableData)
  }

  const countMine = (ri, ci) => {
    let count = 0;
    let mines = [code.MINE, code.MINE_FLAG, code.MINE_QUESTION];
    mines.includes(tableData[ri - 1]?.[ci - 1]) && count++;
    mines.includes(tableData[ri - 1]?.[ci]) && count++;
    mines.includes(tableData[ri - 1]?.[ci + 1]) && count++;
    mines.includes(tableData[ri]?.[ci - 1]) && count++;
    mines.includes(tableData[ri]?.[ci + 1]) && count++;
    mines.includes(tableData[ri + 1]?.[ci - 1]) && count++;
    mines.includes(tableData[ri + 1]?.[ci]) && count++;
    mines.includes(tableData[ri + 1]?.[ci + 1]) && count++;
    return count
  }

  const open = (ri, ci) => {
    const TableData = [...tableData]
    if (tableData[ri]?.[ci] >= code.OPENED) {
      return;
    }
    if (ri < 0 || ri >= tableData.length || ci < 0 || ci >= tableData[0].length) return
    if ([code.OPENED, code.FLAG, code.MINE_FLAG, code.QUESTION, code.MINE_QUESTION].includes(tableData[ri][ci])) return;

    const count = countMine(ri, ci)
    TableData[ri][ci] = count
    setTableData(TableData)
    return count
  }



  const openAround = (ri, ci) => {
    const count = open(ri, ci);
    if (count === 0) {
      openAround(ri - 1, ci - 1);
      openAround(ri - 1, ci);
      openAround(ri - 1, ci + 1);
      openAround(ri, ci - 1);
      openAround(ri, ci + 1);
      openAround(ri + 1, ci - 1);
      openAround(ri + 1, ci);
      openAround(ri + 1, ci + 1);
    }
  }
  const onLeftClick = (e) => {
    if (Finish) return
    const TableData = [...tableData]
    const ri = e.target.parentNode.rowIndex;
    const ci = e.target.cellIndex;
    const cellData = tableData[ri][ci];
    if (cellData === code.NORMAL) {
      openAround(ri, ci)
      //승리확인
      let opened = 0
      tableData.flat().filter(c => {
        if (c >= 0) {
          opened++
        }
      })
      //
      if (opened === Row * Cell - Mine) {
        alert('win')
        setFinish(true)
        clearInterval(TimeCount)
        console.log(Time)
      }
    } else if (cellData === code.MINE) {
      tableData[ri][ci] = code.Clicked_MINE
      setTableData(TableData)
      setFinish(true)
    }

  }
  const TdStyle = (Code) => {
    switch (Code) {
      case code.NORMAL:
      case code.MINE:
        return {
          background: '#444'
        };
      case code.OPENED:
        return {
          background: 'white'
        }
      case code.FLAG:
      case code.MINE_FLAG:
        return {
          background: 'orange'
        }
      case code.MINE_QUESTION:
      case code.QUESTION:
        return {
          background: 'blue'
        }
      case code.Clicked_MINE:
        return {
          background: 'red'
        }
    }
  }

  const TdText = (Code) => {
    switch (Code) {
      case code.MINE:
        return 'x'
      case code.NORMAL:
      case code.OPENED:
        return ''
      case code.FLAG:
      case code.MINE_FLAG:
        return '!'
      case code.QUESTION:
      case code.MINE_QUESTION:
        return '?'

      case code.Clicked_MINE:
        return '💣'
      default:
        return Code
    }
  }

  const onRow = (e) => {
    setRow(e.target.value)
  }
  const onCell = (e) => {
    setCell(e.target.value)
  }
  const onMine = (e) => {
    setMine(e.target.value)
  }

  const onClick = () => {
    setRow(Row)
    setCell(Cell)
    setMine(Mine)
    setStart(true)
  }

  const hard = () => {
    setRow(20)
    setCell(20)
    setMine(150)
    setStart(true)
    setRecord(true)
    setGamelevel('hard')
  }
  const medium = () => {
    setRow(15)
    setCell(15)
    setMine(60)
    setStart(true)
    setRecord(true)
    setGamelevel('medium')
  }
  const easy = () => {
    setRow(10)
    setCell(10)
    setMine(15)
    setStart(true)
    setRecord(true)
    setGamelevel('easy')
  }

  const tryAgain = () => {
    setTableData([])
    setStart(false);
    setFinish(false);
    setTime(0);
    let body = {
      userId: user.userData._id,
      game: `minesweeper${Gamelevel}`,
      time: Time
    }
    {
      Record && user.userData.isAuth &&
        axios.post('api/score/recordScore', body)
          .then(response => {
            if (response.data.success) {
              setRecord(false)
            }
          })
    }
  }

  const timer = () => {
    if (!Start) return
    let timecount = setInterval(() => {
      setTime(prev => prev + 1)
    }, 1000)
    setTimeCount(timecount)

  }

  return (
    <div style={{
      display: "flex", justifyContent: 'center',
      alignItems: 'center', height: 'center', flexDirection: 'column', width: 'auto'
    }}
      className='mine'
    >
      <div>{Time}</div>
      <Title>MINE SWEEPER</Title>
      {!Start ? <Title level={5}>줄,칸,지뢰 갯수를 선택하시오.</Title> :
        <Title level={5}>{`${Mine}개의 지뢰를 찾아내시오`}</Title>}
      {!Start &&
        <Form
          style={{ display: 'flex', width: '700px', alignItems: 'center', justifyContent: 'space-evenly' }}
        >
          <label>Row(줄)</label>
          <Input onChange={onRow} value={Row}></Input>
          <label>Cell(칸)</label>
          <Input onChange={onCell} value={Cell}></Input>
          <label>Mine(지뢰)</label>
          <Input onChange={onMine} value={Mine}></Input>
          <Button onClick={onClick}>입력</Button>
        </Form>}
      <br />
      {!Start && < div style={{ textAlign: 'center' }}>
        <Title level={5}>기록을 위해선 상 중 하 버튼을 눌러주세요</Title>
        <Button onClick={hard}>상</Button>
        <Button onClick={medium}>중</Button>
        <Button onClick={easy}>하</Button>
        <br />
        <Divider>Ranking</Divider>
      </div>}
      {!Start && <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ol>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>상</div>
          {HardRanking.map((rank) => (
            <li key={rank._id}>{rank.userId ? rank.userId.name : '비회원'}/{rank.time}</li>
          ))}
        </ol>
        <ol>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>중</div>
          {MediumRanking.map((rank) => (
            <li key={rank._id}>{rank.userId ? rank.userId.name : '비회원'}/{rank.time}</li>
          ))}
        </ol>
        <ol>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>하</div>
          {EasyRanking.map((rank) => (
            <li key={rank._id}>{rank.userId ? rank.userId.name : '비회원'}/{rank.time}</li>
          ))}
        </ol>
      </div>
      }

      <table>
        <tbody>
          {Array(tableData.length).fill().map((row, i) => (
            <tr key={i}>
              {Array(tableData[i].length).fill().map((cell, j) => (
                <td
                  style={TdStyle(tableData[i][j])}
                  key={j}
                  onContextMenu={onRightClick}
                  onClick={onLeftClick}
                >
                  {/* {tableData[i][j]} */}
                  {TdText(tableData[i][j])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      {Finish ? <Button onClick={tryAgain}>다시하기</Button> : ""}
    </div >
  )
}

export default Minesweeper;

