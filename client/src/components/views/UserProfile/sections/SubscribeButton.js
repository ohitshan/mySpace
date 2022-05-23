import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function SubscribeButton(props) {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const [Subscribed, setSubscribed] = useState(false);
  const [SubscribeNumber, setSubscribeNumber] = useState(0);

  useEffect(() => {
    let subscribeVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom
    }

    axios.post('/api/subscribe/subscribeNumber', subscribeVariable)
      .then(response => {
        console.log(response.data)
        if (response.data.success) {
          setSubscribeNumber(response.data.subscribeNumber)
        }
      })

    axios.post('/api/subscribe/subscribed', subscribeVariable)
      .then(response => {
        console.log(response.data)
        if (response.data.success) {
          setSubscribed(response.data.subscribed)
        }
      })
  }, [props])

  const onSubscribe = () => {
    if (!user.userData.isAuth) {
      navigate('/login');
      return
    }
    let subscribeVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom
    }
    alert('구독하기')
    axios.post('/api/subscribe/subscribe', subscribeVariable)
      .then(response => {
        console.log(response.data)
        if (response.data.success) {
          setSubscribed(true)
          setSubscribeNumber(prev => prev + 1)
        }
      })


  }
  const onUnSubscribe = () => {
    if (!user.userData.isAuth) {
      navigate('/login');
      return
    }
    let subscribeVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom
    }
    axios.post('/api/subscribe/unsubscribe', subscribeVariable)
      .then(response => {
        console.log(response.data)
        if (response.data.success) {
          setSubscribed(false)
          setSubscribeNumber(prev => prev - 1)
        }
      })
  }

  if (user.userData&&user.userData.isAuth) {
    return (
      <div>{SubscribeNumber}Subscriber
        {Subscribed ? <Button onClick={onUnSubscribe}>Subscribed</Button>
          : <Button onClick={onSubscribe}>Subscribe</Button>
        }
      </div>
    )
  } else {
    return (
      <div>{SubscribeNumber}Subscriber<Button onClick={onSubscribe}>Subscribe</Button></div>
    )
  }
}

export default SubscribeButton;
