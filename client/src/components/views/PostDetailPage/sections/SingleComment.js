import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import { Form, Input, Button } from 'antd';

import moment from 'moment';
import { Link } from 'react-router-dom';
const { TextArea } = Input;

function SingleComment(props) {
  const [Content, setContent] = useState();
  const [CommentInfo, setCommentInfo] = useState([]);
  const [Reply, setReply] = useState(false);

  useEffect(() => {
    setCommentInfo(props.commentInfo)
    console.log(CommentInfo)
  }, []);

  const onSubmit = (e) => {

    let body = {
      userId: localStorage.getItem('userId'),
      postId: props.postId,
      responseTo: props.commentInfo._id,
      content: Content
    }

    axios.post('/api/comment/comment', body)
      .then(response => {
        if (response.data.success) {
          setContent('')
          console.log(response.data)
        }
      })

    window.location.reload();


  }

  const onContent = (e) => setContent(e.currentTarget.value);

  const onClick = () => {
    setReply(!Reply)
    // sendReplyState()
  }
  const sendReplyState = () => {
    setReply(!Reply)
    props.getReplyState(Reply)
  }

  return (
    <div>
      {CommentInfo.userId &&
        <Comment
          actions={[<span onClick={onClick} key="comment-basic-reply-to">Reply to</span>]}
          author={CommentInfo.userId.name}
          avatar={<Avatar src={CommentInfo.userId.image || "https://joeschmoe.io/api/v1/random"} alt="Han Solo" />}
          content={
            <p>
              {CommentInfo.content}
            </p>
          }
          datetime={
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment().fromNow()}</span>
            </Tooltip>
          }
        />
      }
      {Reply &&
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
      }
    </div>
  )
}

export default SingleComment;
