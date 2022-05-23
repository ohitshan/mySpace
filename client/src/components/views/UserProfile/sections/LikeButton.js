import React, { useEffect, useState } from 'react';
import { LikeOutlined, DislikeOutlined, LikeFilled, DislikeFilled } from '@ant-design/icons'
import { Tooltip, Button } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function LikeButton(props) {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const [LikeNumber, setLikeNumber] = useState(0);
  const [DislikeNumber, setDislikeNumber] = useState(0);
  const [LikeClick, setLikeClick] = useState(false);
  const [DislikeClick, setDislikeClick] = useState(false);

  let body = {
    userId: localStorage.getItem('userId'),
    postId: props.postId
  }

  useEffect(() => {

    axios.post('/api/like/getLikes', body)
      .then(response => {
        if (response.data.success) {
          setLikeNumber(response.data.likes.length)
          // console.log(response.data)

          response.data.likes.map(like => {
            if (like.userId === body.userId) {
              setLikeClick(true)
            }
          })
        }else {
          alert('fail to bring like')
        }
      })

    axios.post('/api/like/getDislikes', body)
      .then(response => {
        if (response.data.success) {
          setDislikeNumber(response.data.dislikes.length)
          // console.log(response.data)

          response.data.dislikes.map(dislike => {
            if (dislike.userId === body.userId) {
              setDislikeClick(true)
            }
          })
        } else {
          alert('fail to bring dislike')
        }
      })

  }, [])


  const onLikeButton = () => {

    if (!user.userData.isAuth) {
      navigate('/login');
      return
    }
    if (!LikeClick) {
      axios.post('/api/like/like', body)
        .then(response => {
          if (response.data.success) {
            setLikeClick(!LikeClick)
            setLikeNumber(prev => prev + 1)
            if (DislikeClick) {
              axios.post('/api/like/undislike', body)
                .then(response => {
                  setDislikeClick(!DislikeClick)
                  setDislikeNumber(prev => prev - 1)
                })
            }
          } else {
            alert('fail to like')
          }
        })
    } else {
      axios.post('/api/like/unlike', body)
        .then(response => {
          if (response.data.success) {
            setLikeClick(!LikeClick)
            setLikeNumber(prev => prev - 1)
          }
        })
    }
  }

  const onDislikeButton = () => {

    if (!user.userData.isAuth) {
      navigate('/login');
      return
    }

    if (!DislikeClick) {
      axios.post('/api/like/dislike', body)
        .then(response => {
          if (response.data.success) {
            setDislikeClick(!DislikeClick)
            setDislikeNumber(prev => prev + 1)
            if (LikeClick) {
              axios.post('/api/like/unlike', body)
                .then(response => {
                  console.log(response.data)
                  setLikeClick(!LikeClick)
                  setLikeNumber(prev => prev - 1)
                })
            }
          }
        })
    } else {
      axios.post('/api/like/undislike', body)
        .then(response => {
          if (response.data.success) {
            setDislikeClick(!DislikeClick)
            setDislikeNumber(prev => prev - 1)
          }
        })
    }
  }

  return (
    <div>
      <Tooltip title="LIKE" color='blue'>
        <Button onClick={onLikeButton} style={{ color: 'blue' }}>
          {LikeNumber}{LikeClick ? <LikeFilled /> : <LikeOutlined />}
        </Button>
      </Tooltip>
      <Tooltip title="DISLIKE" color='blue'>
        <Button onClick={onDislikeButton}>
          {DislikeNumber}{DislikeClick ? <DislikeFilled /> : <DislikeOutlined />}
        </Button>
      </Tooltip>
    </div>

  )
}

export default LikeButton;
