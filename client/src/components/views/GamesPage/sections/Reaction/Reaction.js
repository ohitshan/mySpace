import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Input, Typography, Statistic } from 'antd';
import '../Reaction/Reaction.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
const { Title } = Typography;


function Reaction() {
  const user = useSelector(state => state.user);

  const [Text, setText] = useState('시작하려면 클릭 하시오.');
  const [Records, setRecords] = useState([]);
  const [Clickable, setClickable] = useState(true);
  const [FinalRecord, setFinalRecord] = useState('');
  const [TryAgain, setTryAgain] = useState(false);
  const [Ranking, setRanking] = useState([]);
  const [TimeRanking, setTimeRanking] = useState([]);
  const startTime = useRef(0);
  const finishTime = useRef(0);

  useEffect(() => {
    let body = {
      game: 'reactiontest'
    }

    axios.post('api/score/getReactionTime', body)
      .then(response => {
        if (response.data.success) {
          console.log(response.data.time)
          let ranking = response.data.time
          console.log(ranking)
          setRanking(response.data.time)
          let time = [];
          ranking.map((info, i) => {
            time.push(info.time)
          })
          setTimeRanking(time)

        }
      })
  }, [])

  console.log(Ranking, TimeRanking)
  const recordfunction = (records) => {
    if (records.length <= 4) {
      setText('준비')
      setTimeout(() => {
        startTime.current = Date.now();
        setText('클릭')
      }, 1000 + Math.random() * 5000)
    } else {
      setClickable(false)
      let final = (records.reduce((a, b) => a + b) / 5)
      setFinalRecord(final)
      setTryAgain(true)

      let body = {
        userId: user.userData._id,
        game: 'reactiontest',
        time: final
      }

      axios.post('/api/score/recordScore', body)
        .then(response => {
          if (response.data.success) {
            console.log(response.data)
          } else {
            alert('fail to save')
          }
        })
    }
  }



  const onClick = () => {
    if (!Clickable) return
    let records = [...Records];

    if (Text === '시작하려면 클릭 하시오.') {

      setText('준비')
      setTimeout(() => {
        startTime.current = Date.now();
        setText('클릭')
      }, 1000 + Math.random() * 5000)

    } else if (Text === '준비') {

      alert('너무 빨리 클릭하셨습니다. ')
      records.push(600)
      setRecords(records)

      recordfunction(records)

    } else if ('클릭') {

      finishTime.current = Date.now();
      let diff = finishTime.current - startTime.current;
      records.push(diff)
      setRecords(records)

      recordfunction(records)

    }

  }

  const boxStyle = (text) => {
    switch (text) {
      case '시작하려면 클릭 하시오.':
        return {
          background: '#E2E2B6'
        }
      case '준비':
        return {
          background: '#FFB46A'
        }
      case '클릭':
        return {
          background: '#9EBD75'
        }
    }
  }

  const tryButton = () => {
    setRecords([])
    setText('시작하려면 클릭 하시오.')
    setClickable(true)
    setFinalRecord('')
    setTryAgain(false)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', }}>
      <br />
      <Title>Reaction Test</Title>
      <Title level={5} style={{ textAlign: 'center' }}>초록색 화면이 되면 누르시오.<br />※ 준비 단계에서 클릭시 패널티가 주어집니다.</Title>
      <div
        className='box'
        onClick={onClick}
        style={boxStyle(Text)}
      >
        {Text}
      </div>
      <div>
        {Records.map((record, i) => <div key={i}>{`${i + 1}번째 ${record}`}</div>)}
      </div>
      <br/>
      {FinalRecord && <div style={{ textAlign: 'center' }}>평균기록:{FinalRecord}<br />{`${Ranking.length}`}명의 최고기록의 평균 {TimeRanking.reduce((a, b) => (a + b) / TimeRanking.length)}</div>}
      {TryAgain && <Button onClick={tryButton}>다시하기</Button>}
    </div>
  )
}

export default Reaction;
