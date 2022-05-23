import React, { useEffect, useState, useRef } from 'react'
import { Form, Button, Input, Typography, Divider } from 'antd';
import '../Game2048/Game2048.css'
const { Title } = Typography;


function Game2048() {
  const [TableData, setTableData] = useState(
    Array(4).fill().map((row, i) => (
      Array(4).fill().map((cell, j) => (''))
    ))
  );
  const [Records, setRecords] = useState([]);
  const record = useRef(0)
  useEffect(() => {
    put2()
  }, [])



  const put2 = () => {
    const emptyCells = [];
    let tabledata = [...TableData];
    tabledata.forEach((row, i) => (
      row.forEach((cell, j) => {
        if (!cell) {
          emptyCells.push([i, j])
        }
      })
    ))
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    tabledata[randomCell[0]][randomCell[1]] = 2;
    setTableData(tabledata)
  }

  const key = (event) => {
    let tabledata = [...TableData];
    let newData = [[], [], [], []];
    console.log(record)
    switch (event.key) {
      case "ArrowLeft":
        console.log(tabledata)
        record.current = tabledata
        tabledata.forEach((row, i) => {
          row.forEach((cell, j) => {
            if (cell) {
              const currentRow = newData[i]
              const prevData = currentRow[currentRow.length - 1]
              if (prevData === cell) {
                currentRow[currentRow.length - 1] *= -2
              } else {
                newData[i].push(cell)
              }
            }
          })
        })
        tabledata.forEach((row, i) => {
          tabledata[i].forEach((cell, j) => {
            tabledata[i][j] = Math.abs(newData[i][j] || '')
          })
        })
        setTableData(tabledata)
        break;
      case "ArrowRight":
        tabledata.forEach((row, i) => {
          row.forEach((cell, j) => {
            if (row[3 - j]) {
              const currentRow = newData[i]
              const prevData = currentRow[currentRow.length - 1]
              if (prevData === row[3 - j]) {
                currentRow[currentRow.length - 1] *= -2;
              } else {
                newData[i].push(row[3 - j])
              }
            }
          })
        })
        tabledata.forEach((row, i) => {
          tabledata[i].forEach((cell, j) => {
            tabledata[i][3 - j] = Math.abs(newData[i][j] || '')
          })
        })
        setTableData(tabledata)
        break;
      case "ArrowUp":
        tabledata.forEach((row, i) => {
          row.forEach((cell, j) => {
            if (cell) {
              const currentRow = newData[j]
              const prevData = currentRow[currentRow.length - 1]
              if (prevData === cell) {
                currentRow[currentRow.length - 1] *= -2
              } else {
                newData[j].push(cell)
              }
            }
          })
        })
        tabledata.forEach((cell, i) => {
          tabledata[i].forEach((row, j) => {
            tabledata[j][i] = Math.abs(newData[i][j] || '')
          })
        })
        setTableData(tabledata)
        break;
      case "ArrowDown":
        tabledata.forEach((row, i) => {
          row.forEach((cell, j) => {
            if (tabledata[3 - i][j]) {
              const currentRow = newData[j]
              const prevData = currentRow[currentRow.length - 1]
              if (prevData === tabledata[3 - i][j]) {
                currentRow[currentRow.length - 1] *= -2
              } else {
                newData[j].push(tabledata[3 - i][j])
              }
            }
          })
        })
        tabledata.forEach((cell, i) => {
          tabledata[i].forEach((row, j) => {
            tabledata[3 - j][i] = Math.abs(newData[i][j] || '')
          })
        })
        setTableData(tabledata)
        break;
    }
    console.log(tabledata.flat())
    if (tabledata.flat().includes('2048')) {
      alert('성공하셨습니다')
    } else if (!tabledata.flat().includes(0)) {
      alert('실패ㅠ')
    } else {
      put2()
    }
    setRecords([...Records, record.current])
  }
  console.log(Records)
  const tableStyle = (data) => {
    switch (data) {
      case 2:
        return {
          background: '#eee4da',
          color: '#776e65'
        }
      case 4:
        return {
          background: '#eee1c9',
          color: '#776e65'
        }
    }
  }

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Title style={{ marginBottom: '0px', color: 'green' }}>Game 2048</Title>
      <Title level={5}>방향키를 눌러 2048을 만드시오.<br />시작을 위해 표를 클릭하시오</Title>
      <br />
      <table
        onKeyDown={key}
        tabIndex='0'
      >
        <tbody>
          {Array(TableData.length).fill().map((row, i) => (
            <tr key={i}>
              {Array(TableData[0].length).fill().map((cell, j) => (
                <td
                  key={j}
                  style={tableStyle(TableData[i][j])}>
                  {TableData[i][j] || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Game2048