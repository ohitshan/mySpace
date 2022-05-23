import React, { useEffect, useRef, useState } from 'react'
import { Form, Button, Input, Typography, Divider } from 'antd';
const { Title } = Typography;

const rspCoordi = {
  rock: '-350px 0px',
  paper: '-610px -20px',
  scissor: '-70px -0px'
}
const score = {
  rock: 1,
  paper: 0,
  scissor: -1
}
function RPS() {

  const [imgCoordi, setimgCoordi] = useState(rspCoordi.rock);
  const [Win, setWin] = useState(0);
  const [Result, setResult] = useState('');
  const [Clickable, setClickable] = useState(true);
  const intervalRef = useRef()

  const ComputerChoice = (imgCoordi) => (
    Object.entries(rspCoordi).find((v) => {
      return v[1] === imgCoordi
    })[0]
  )

  useEffect(() => {
    intervalRef.current = setInterval(changeHand, 10)
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [imgCoordi])

  const changeHand = () => {
    if (imgCoordi === rspCoordi.rock) {
      setimgCoordi(rspCoordi.scissor)
    } else if (imgCoordi === rspCoordi.scissor) {
      setimgCoordi(rspCoordi.paper)
    } else if (imgCoordi === rspCoordi.paper) {
      setimgCoordi(rspCoordi.rock)
    }
  }

  const onClick = (choice) => {
    if (!Clickable) return
    setClickable(false)
    clearInterval(intervalRef.current)
    let myScore = score[choice]
    let comScore = score[ComputerChoice(imgCoordi)]
    console.log(myScore - comScore)
    if (myScore - comScore === 0) {
      setResult('무승부')
    } else if (myScore - comScore === 2 || myScore - comScore === -1) {
      setWin(prev => prev + 1)
      setResult('승리')
    } else if (myScore - comScore === 1 || myScore - comScore === -2) {
      setResult('패배')
    }

    setTimeout(() => {
      intervalRef.current = setInterval(changeHand, 10)
      setClickable(true)
    }, 3000)
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Title style={{color:'green'}}>Rock Scissor Paper</Title>
      <div className='menu' style={{ width: '300px', height: '350px', background: `url(./rps.png) ${imgCoordi}` }}></div>
      <br/>
      <div style={{width:'300px',display:'flex',justifyContent:'space-between'}}>
        <Button style={{color:'red'}} onClick={() => onClick('rock')}>바위</Button>
        <Button onClick={() => onClick('scissor')}>가위</Button>
        <Button onClick={() => onClick('paper')}>보</Button>
      </div>
      <br/>
      <div>{Result}/{Win}승</div>
    </div>
  )
}

export default RPS

