import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Typography, Statistic } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { Title } = Typography;



function TicTacToe() {
  const user = useSelector(state => state.user);
  const [Turn, setTurn] = useState('o')
  const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']])
  const [Candi, setCandi] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8])
  const [Clickable, setClickable] = useState(true);
  const [Result, setResult] = useState('');
  const [Ranking, setRanking] = useState([]);

  useEffect(() => {
    let body = {
      game: 'tictactoe'
    }

    axios.post('api/score/getWin', body)
      .then(response => {
        if (response.data.success) {
          console.log(response.data)
          let top5 = response.data.score
          setRanking(top5)
        }
      })
  }, [Result])

  const onreplay = () => {
    setClickable(true);
    setResult('');
    setTableData([['', '', ''], ['', '', ''], ['', '', '']])
    setCandi([0, 1, 2, 3, 4, 5, 6, 7, 8])
  }

  const win = (turn) => {
    alert(`${turn} win`)
    setClickable(false)
    if (turn === 'o') {
      setResult('승리하셨습니다.')
      let body = {
        userId: user.userData._id,
        game: 'tictactoe',
        win: 1
      }
      axios.post('/api/score/recordScore', body)
        .then(response => console.log(response.data))
    }
  }

  const checkwin = (ri, ci, turn) => {
    if (tableData[0][ci] === turn && tableData[1][ci] === turn && tableData[2][ci] === turn) {
      win(turn)
      return true
    } else if (tableData[ri][0] === turn && tableData[ri][1] === turn && tableData[ri][2] === turn) {
      win(turn)
      return true
    } else if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win(turn)
      return true
    } else if (tableData[2][0] === turn && tableData[1][1] === turn && tableData[0][2] === turn) {
      win(turn)
      return true
    }
    const draw = tableData.flat().every((cell) => cell)
    if (draw) {
      alert('비김')
      setResult('비겼습니다.')
      return true
    }

  }

  const onClick = (e) => {
    if (e.target.textContent) return;
    if (!Clickable) return
    const ri = e.target.parentNode.rowIndex;
    const ci = e.target.cellIndex;
    const TableData = [...tableData]
    TableData[ri][ci] = Turn
    setTableData(TableData)
    setClickable(false)
    if (checkwin(ri, ci, 'o')) return
    setTimeout(() => {
      setClickable(true)
      const candidate = [...Candi]
      const click = ri * 3 + ci
      candidate.splice(candidate.indexOf(click), 1)
      const random = Math.floor(Math.random() * candidate.length)
      let picked = candidate.splice(random, 1)
      let newri = Math.floor(picked / 3)
      let newci = picked % 3
      TableData[newri][newci] = 'x'
      setTableData(TableData)
      checkwin(newri, newci, 'x')
      console.log(tableData, Turn)
      console.log(candidate)
      console.log(tableData)
      setCandi(candidate)
    }, 1000)
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Title style={{ color: '#5b8c00' }}>Tic Tac Toe</Title>
      <Title level={5}>당신은 O입니다</Title>
      <table>
        <tbody>
          {Array(tableData.length).fill().map((row, i) => (
            <tr key={i}>
              {Array(tableData[i].length).fill().map((cell, j) => (
                <td
                  key={j}
                  style={{
                    border: "1px solid black", width: '150px',
                    height: '150px', textAlign: 'center',
                    fontSize: '100px', transform: 'translateY(-10%)'
                  }}
                  onClick={onClick}
                >{tableData[i][j]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>{Result}</div>
      {Result ? <Button onClick={onreplay}>다시하기</Button> : null}
      <br />
      <ol>
        {Ranking.map((score) => (
          <li key={score._id}>
            {score.userId ? score.userId.name:'비회원'}/{score.win}승
          </li>))}
      </ol>
    </div>
  )

}

export default TicTacToe;

// let TableData = Array(3).fill().map((row) => (
//   Array(3).fill().map((cell) => ''
//   )
// ))
// const [Turn, setTurn] = useState('x');
// const [tableData, setTableData] = useState(TableData);
// const [Clickable, setClickable] = useState(true);



// useEffect(() => {
// }, [])

// const win = () => {
//   setClickable(false)
//   setTimeout(() => {
//     alert(`${Turn}player win`)
//   }, 500)
//   return
// }
// const checkwin = (ri, ci) => {
//   if (tableData[ri][0] === Turn && tableData[ri][1] === Turn && tableData[ri][2] === Turn) {
//     win()
//   } else if (tableData[0][ci] === Turn && tableData[1][ci] === Turn && tableData[2][ci] === Turn) {
//     win()
//   } else if (tableData[0][0] === Turn && tableData[1][1] === Turn && tableData[2][2] === Turn) {
//     win()
//   } else if (tableData[0][2] === Turn && tableData[1][1] === Turn && tableData[2][0] === Turn) {
//     win()
//   }
//   const draw = tableData.flat().every((cell) => cell)
//   if (draw) {
//     alert('비김')
//   }
//   if (Turn === 'x') {
//     setTurn('o')
//   } else {
//     setTurn('x')
//   }
// }

// const tdClick = (e) => {
//   if (!Clickable) return
//   if (e.target.textContent) return

//   e.target.textContent = Turn;
//   let ri = e.target.parentNode.rowIndex;
//   let ci = e.target.cellIndex;
//   tableData[ri][ci] = Turn
//   checkwin(ri, ci)

// }

// const drawTable = () => {
//   return (
//     Array(tableData.length).fill().map((row, i) => (
//       <tr key={i}>
//         {Array(tableData[i].length).fill().map((cell, j) =>
//           <td
//             style={{
//               border: '1px solid black', width: '160px', height: '160px',
//               textAlign: 'center', fontSize: '90px', transform: 'translateY(-10%)'
//             }}
//             key={j}
//             onClick={tdClick}
//           >
//             {tableData[i][j]}
//           </td>
//         )}
//       </tr>
//     ))
//   )
// }
// return (
//   <div>
//     <table style={{
//       display: 'flex', justifyContent: 'center',
//       alignItems: 'center', height: '80vh'
//     }}>
//       <tbody>
//         {drawTable()}
//       </tbody>
//     </table>
//   </div>