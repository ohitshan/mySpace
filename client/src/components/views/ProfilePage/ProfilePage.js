import React, { useState } from 'react'
import { Typography, Button, Form, message, Input } from 'antd';
import { useSelector } from 'react-redux';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography

function ProfilePage() {
  const Navigate = useNavigate();
  const user = useSelector(state => state.user)

  const [Name, setName] = useState('');
  const [Image, setImage] = useState([]);
  const [Introduction, setIntroduction] = useState('');
  const nameChange = (e) => { setName(e.currentTarget.value) };
  const IntroChange = (e) => { setIntroduction(e.currentTarget.value) };

  const updateImage = (newImage) => {
    setImage(newImage)
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (Image.length < 1 || !Name) {
      alert('이름과 사진을 입력하시오')
      return;
    }

    let body = {
      name: Name,
      image: `http://localhost:5000/${Image}`,
      introduction: Introduction
    }

    Axios.post('/api/users/editProfile', body)
      .then(response => {
        if (response.data.edit) {
          alert('Changed')
          Navigate('/')
        } else {
          alert('실패')
        }
      })
  }

  return (

    <div style={{ maxWidth: '700px', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <Title>Profile Setting</Title>
      </div>

      <Form onSubmit={onSubmit}>

        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <FileUpload profileFunction={updateImage} />
        </div>

        <br />
        <br />

        <label>name</label>
        <Input onChange={nameChange} value={Name} />
        <label>Introduction</label>
        <Input onChange={IntroChange} value={Introduction} />
        <br />
        <br />

        <Button size='large' onClick={onSubmit}>
          Edit
        </Button>
      </Form>
    </div>
  )


}

export default ProfilePage
