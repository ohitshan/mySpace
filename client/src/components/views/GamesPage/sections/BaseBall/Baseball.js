import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Typography, Statistic } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
const { Title } = Typography;

function Baseball() {
  const user = useSelector(state => state.user);

  const [PickedNumber, setPickedNumber] = useState([]);
  const [value, setValue] = useState('');
  const [Result, setResult] = useState('');
  const [Tries, setTries] = useState([]);
  const [Clickable, setClickable] = useState(true)
  const [Score, setScore] = useState(0);
  const [Ranking,setRanking] = useState([]);


  useEffect(() => {
    randomdigit()

    let body = {
      game: 'baseball'
    }

    axios.post('api/score/getScore', body)
      .then(response => {
        if(response.data.success){
          setRanking(response.data.score)

        }
      })


  }, [])
  console.log(PickedNumber)
  const randomdigit = () => {
    const candidate = Array(10).fill().map((num, i) => i);
    let pick = []
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * candidate.length)
      pick.push(parseInt(candidate.splice(randomIndex, 1)))
    }
    setPickedNumber(pick)
  }

  const textHandler = (e) => {
    setValue(e.target.value)
  }

  const onClick = () => {
    let ball = '0';
    let strike = '0';
    if (!Clickable) return
    if (value.length < 4) {
      alert('4자리수를 입력하시오')
      setValue('')
      return
    }

    if (new Set(value).size !== 4) {
      alert('중복되는 숫자')
      setValue('')
      return
    }

    if (Tries.includes(value)) {
      alert('이미 시도한 숫자입니다.')
      setValue('')
      return
    }

    if (PickedNumber.join('') === value) {
      setResult('HOMERUN')
      setClickable(false)
      setScore((10 - Tries.length) * 10)
      let body = {
        userId: user.userData._id,
        game: 'baseball',
        score: (10 - Tries.length) * 10
        // win: 1
      }
      axios.post('/api/score/recordScore', body)
        .then(response => console.log(response.data))
      return
    }
    for (let i = 0; i < 4; i++) {
      if (value.includes(PickedNumber[i])) {
        if (PickedNumber.join('')[i] === value[i]) {
          strike++
        } else {
          ball++
        }
      }
    }
    setResult(ball + '볼' + strike + '스트라이크')
    setTries([...Tries, value + '는' + ball + '볼' + strike + '스트라이크'])
    setValue('')
    console.log(Tries.length)
    if (Tries.length === 9) {
      setValue(PickedNumber)
      setClickable(false)
      alert(`실패 정답은${PickedNumber}`)
      return
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', flexDirection: 'column' }}>
      <Title style={{ color: '#5b8c00' }}>Baseball Game</Title>
      <Title level={5}>10회 안에 숫자 4개의 숫자를 맞추시오</Title>
      <Form
        onFinish={onClick} style={{ display: 'flex' }}
      >
        <Input
          maxLength={4}
          placeholder="숫자를 입력하시오"
          onChange={textHandler}
          value={value}
        />
        <Button type="primary">submit</Button>
      </Form>
      <br />
      <Title>{Result}</Title>
      {Score !== 0 && <Title>{Score}점</Title>}
      {Tries.map((item, i) =>
        <div key={i}>{item}</div>
      )}
      <br />
      <ol>
        {Ranking.map((score) => (
          <li key={score._id}>
            {score.userId ? score.userId.name:'비회원'}/{score.score}점
          </li>))}
      </ol>
    </div>
  )
}

export default Baseball;
