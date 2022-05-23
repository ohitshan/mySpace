import React, { useEffect, useState } from 'react'
import { Form, Button, Input, Typography, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../Lotto/lotto.css'
const { Title } = Typography;


function Lotto() {
  const [Numbers, setNumbers] = useState([]);
  const [Bonus, setBonus] = useState([]);
  const [showBonus, setShowBonus] = useState(false);
  useEffect(() => {
    // balls()
  }, [])

  const balls = () => {
    let candidate = Array(45).fill().map((ball, i) => i + 1)
    let picked = [];
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        let random = Math.floor(Math.random() * candidate.length)
        picked.push(Number(candidate.splice(random, 1)))
        setNumbers([...picked])
      }, 1000 + i * 1000)
    }
    let random = Math.floor(Math.random() * candidate.length)
    setBonus(Number(candidate.splice(random, 1)))
  }
  console.log(Numbers, Bonus)
  const onClick = () => {
    setShowBonus(false)
    setNumbers([])
    setBonus([])
    balls()
  }

  const bonusClick = () => {
    setShowBonus(true)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Title style={{ color: 'orange' }}>로또 추첨기</Title>
      <Button onClick={onClick}>추첨하기</Button>
      <div style={{ display: 'flex', height: '140px' }}>
        {Numbers.map((num, i) => (
          <div key={i} style={{ margin: '20px 20px' }}>
            <div className='ball'>{num}</div>
          </div>
        ))}
      </div>
      <Button onClick={bonusClick}>보너스 번호 뽑기</Button>
      <div style={{ display: 'flex', margin: '20px 20px' }}>
        {showBonus &&
          <div className='ball'>{Bonus}</div>
        }
      </div>
      {showBonus &&
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',fontSize:'40px'}}>
          <Divider>당첨번호</Divider>
          <div style={{ display: 'flex', height: '140px' }} >
            {Numbers.sort((a, b) => a - b).map((num, i) => (
              <div key={i} style={{ margin: '20px 20px' }}>
                <div className='ball'>{num}</div>
              </div>
            ))}
          </div>
          <PlusOutlined />
          <div style={{margin: '20px 20px'}} className='ball'>{Bonus}</div>
        </div>
      }
    </div>
  )
}

export default Lotto