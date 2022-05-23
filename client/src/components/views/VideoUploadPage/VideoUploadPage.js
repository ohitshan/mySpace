import React, { useState } from 'react'
import { Typography, Button, Form, message, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import UtilsVideoUpload from '../../utils/UtilsVideoUpload';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const { Title } = Typography

function VideoUploadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user)

  const [VideoPath,setVideoPath] = useState('');
  const [Thumbnail,setThumbnail] = useState('')
  const [Duration,setDuration] = useState('')
  const [VideoTitle, setVideoTitle] = useState('');
  const [Description, setDescription] = useState('');
  const videoTitleChange = (e) => { setVideoTitle(e.currentTarget.value) };
  const descriptionChange = (e) => { setDescription(e.currentTarget.value) };

  const updateInfo = (videoInfo) => {
    setThumbnail(videoInfo[0])
    setDuration(videoInfo[1])
  };
  
  const videoPathInfo = (videoInfo) => {
    setVideoPath(videoInfo)
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let body = {
      writer:user.userData._id,
      title: VideoTitle,
      description: Description,
      filePath:VideoPath,
      thumbnail:Thumbnail,
      duration:Duration
    }

    axios.post('/api/videos/saveVideo',body)
    .then(response=>{
      if(response.data.success){
        message.success('success uploading')

        setTimeout(()=>{
          navigate('/news')
        },1000)
      }
    })

  }

  return (

    <div style={{ maxWidth: '700px', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <Title>Upload Videos</Title>
      </div>

      <Form onSubmit={onSubmit}>

        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <UtilsVideoUpload videoupdateFunction={updateInfo} videoPathFunction={videoPathInfo} />
        </div>

        <br />
        <br />

        <label>Title</label>
        <Input onChange={videoTitleChange} value={VideoTitle} />
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

export default VideoUploadPage;
