import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import PostInfo from './sections/PostInfo';
import PostImage from './sections/PostImage';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'antd';

function PostDetailPage(props) {
  const { postId } = useParams();
  console.log(postId)

  const [Post, setPost] = useState({});
  useEffect(() => {
    Axios.get(`/api/products/post_by_id?id=${postId}&type=single`)
      .then(response => {
        console.log(response.data[0])
        setPost(response.data[0])
      })
      .catch(err => alert(err))
  }, []);

  return (
    <div style={{ width: '100%', padding: '3rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>{Post.title}</h1>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          <PostImage detail={Post} />
        </Col>
        <Col lg={12} sm={24}>
          <PostInfo detail={Post} />
        </Col>
      </Row>

    </div>
  )
}

export default PostDetailPage;
