import axios from 'axios';
import { Form, Input, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';



function ReplyComment(props) {
  const [CommentLists, setCommentLists] = useState([]);
  const [seemore, setSeemore] = useState(false)


  useEffect(() => {

    let body = {
      postId: props.postId,
      responseTo: props.commentInfo._id
    }

    axios.post('/api/comment/getReplyComments', body)
      .then(response => {
        console.log(response.data)
        setCommentLists(response.data.comments)
      })

  }, [props])


  const onClick = () => {
    setSeemore(!seemore)
  }


  return (
    <div style={{ marginLeft: '50px' }}>
      {CommentLists.length > 0 &&
        <div>
          <span style={{ cursor: 'pointer',color:"gray" }} onClick={onClick}>see more comment({CommentLists.length})</span>
        </div>
      }
      {seemore && CommentLists.map((comment, i) => (
        <div key={i}>
          <SingleComment postId={props.postId} commentInfo={comment} />
          <ReplyComment postId={props.postId} userId={comment.userId._id} commentInfo={comment} />
        </div>
      ))}

    </div>
  )
}

export default ReplyComment;
