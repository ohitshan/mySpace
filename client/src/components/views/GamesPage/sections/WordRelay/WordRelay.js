import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Typography, Statistic } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';

const { Title } = Typography;
const { Countdown } = Statistic;

function WordRelay() {
  const user = useSelector(state => state.user);
  console.log(user)

  const [value, setValue] = useState('');
  const [Words, setWords] = useState([]);
  const [Firstword, setFirstword] = useState('');
  const [Score, setScore] = useState('0');
  const [deadline, setDeadline] = useState('0')
  const [tryAgain, setTryAgain] = useState(false);
  const [Ranking, setRanking] = useState([]);

  useEffect(() => {
    let Startwords = ['바위', '하나', '가위', '두식', '김치'];
    let random = Math.floor(Math.random() * Startwords.length)
    setFirstword(Startwords[random])

    let body = {
      game: 'wordrelay'
    }

    axios.post('api/score/getScore', body)
      .then(response => {
        if (response.data.success) {
          console.log(response.data)
          let top5 = response.data.score
          setRanking(top5)
        }
      })

  }, [user.userData])

  const textHandler = (e) => {
    setValue(e.target.value)
  };

  const onClick = () => {
    setValue('')
    if (Firstword[Firstword.length - 1] === value[0]) {
      if (Words.includes(value + '-')) {
        alert('이미 나왔던 단어입니다.')
        return
      }
      setWords([...Words, value + '-'])
      setFirstword(value)
      setDeadline(Date.now() + 1000 * 5)
    }

  };

  const onFinish = () => {
    setScore(Words.length * 10)
    setTryAgain(true)
    if (!user.userData.isAuth) {
      alert('점수기록을 위해 로그인하시겠습니까?')
    }
    let body = {
      userId: user.userData._id,
      game: 'wordrelay',
      score: Words.length * 10
    }
    axios.post('/api/score/recordScore', body)
      .then(response => {
        if (response.data.success) {
          console.log(response.data)
        } else {
          alert('fail to save')
        }
      })
    // axios.post('/api/users/score', body)
    //   .then(response => console.log(response.data))
  }

  const onTry = () => {
    setWords([])
    setTryAgain(false)
    setScore('0')
    setDeadline(Date.now() + 1000 * 5)
  }

  const onStart = () => {
    setDeadline(Date.now() + 1000 * 7)
  }

  return (
    <div>
      <div
        style={{ textAlign: 'center' }}
      >
        <Title style={{ color: '#5b8c00' }}>WORD RELAY!~!~!~</Title>
        <Countdown
          title="Countdown"
          value={deadline}
          onFinish={onFinish}
        />

        <Title level={2}>제시어 :{Firstword}</Title>
        <Title level={5}>제한시간 내에 최대한 많이 성공하시오</Title>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Form onFinish={onClick} style={{ display: 'flex' }}>
          <Input
            placeholder="단어를 입력하시오"
            onChange={textHandler}
            value={value}
          />
          <Button type="primary">submit</Button>
        </Form>
      </div>
      <div style={{ textAlign: 'center' }}>
        {Words}
        <br />
        <br />
      </div>
      {tryAgain ?
        <div style={{ textAlign: 'center' }}>
          <h2>{Score}점</h2>
          <Button onClick={onTry}>다시하기</Button>
        </div>
        : <div style={{ textAlign: 'center' }}>
          <Button onClick={onStart}>시작하기</Button>
        </div>
      }
      <br />
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

        <div>점수 순위</div>
        <ol style={{paddingLeft:'0'}}>
          {Ranking.map((score) => (
            <li key={score._id}>
              {score.userId ? score.userId.name:'비회원'}/{score.score}
            </li>
          ))}
        </ol>
      </div>
    </div>

  )
}

export default WordRelay;
