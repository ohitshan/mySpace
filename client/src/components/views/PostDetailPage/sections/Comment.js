import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import ReplyComment from './ReplyComment';
import SingleComment from './SingleComment';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const { TextArea } = Input;

function Comment(props) {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const [Content, setContent] = useState();
  const [CommentLists, setCommentLists] = useState([]);

  useEffect(() => {

    let body = {
      postId: props.postId,
    };

    axios.post('/api/comment/getComments', body)
      .then(response => {
        if (response.data.success) {
          console.log(response.data)
          setCommentLists(response.data.comments)
        }
      })
    // console.log(CommentLists)
  }, [props]);

  const onContent = (e) => setContent(e.currentTarget.value);

  const onSubmit = (e) => {

    if (!user.userData.isAuth) {
      navigate('/login')
      return;
    }

    let body = {
      userId: localStorage.getItem('userId'),
      postId: props.postId,
      content: Content
    }

    axios.post('/api/comment/comment', body)
      .then(response => {
        if (response.data.success) {
          setContent('')
        }
      })

    window.location.reload();
  }



  return (
    <div>
      {CommentLists.map((comment, i) => (
        (!comment.responseTo &&
          <div key={i}>
            <SingleComment postId={props.postId} commentInfo={comment} />
            <ReplyComment postId={props.postId} userId={comment.userId._id} commentInfo={comment} />
          </div>
        )
      ))}
      <Form onFinish={onSubmit}>
        <Form.Item>
          <TextArea rows={4} onChange={onContent} value={Content} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Add Comment
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Comment;
