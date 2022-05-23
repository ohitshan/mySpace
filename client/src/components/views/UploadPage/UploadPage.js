import React, { useState } from 'react'
import { Typography, Button, Form, message, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import UtilsPostUpload from '../../utils/UtilsPostUpload';
import { useNavigate } from 'react-router-dom';
import { postProduct } from '../../../_actions/product_action'
const { Title } = Typography

function UploadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user)

  const [Images,setImages] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [Description, setDescription] = useState('');
  const postTitleChange = (e) => { setPostTitle(e.currentTarget.value) };
  const descriptionChange = (e) => { setDescription(e.currentTarget.value) };

  const updateImage = (newImage) => {
    setImages(newImage)
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let body = {
      writer:user.userData._id,
      title: postTitle,
      description: Description,
      images:Images
    }

    dispatch(postProduct(body))
    .then(response => {
      if (response.payload.success) {
        navigate('/news');
      } else {
        alert("fail to post")
      }
    })


  }

  return (

    <div style={{ maxWidth: '700px', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <Title>Upload Post</Title>
      </div>

      <Form onSubmit={onSubmit}>

        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <UtilsPostUpload profileFunction={updateImage} />
        </div>

        <br />
        <br />

        <label>Title</label>
        <Input onChange={postTitleChange} value={postTitle} />
        <label>Description</label>
        <Input onChange={descriptionChange} value={Description} />

        <br />
        <br />

        <Button size='large' onClick={onSubmit}>
          Post
        </Button>
      </Form>
    </div>
  )


}

export default UploadPage
