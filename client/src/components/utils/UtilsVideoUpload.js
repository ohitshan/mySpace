import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { AiOutlinePlus } from "react-icons/ai";
import axios from 'axios';

function UtilsVideoUpload(props) {

  const [Videopath, setVideopath] = useState('');
  const [ThumbnailPath, setThumbnailPath] = useState('');
  const [Duration, setDuration] = useState('');
  

  const dropHandler = (files) => {

    let formData = new FormData();

    const config = {
      header: { 'content-type': 'multipart/form-data' }
    }

    formData.append("file", files[0])

    axios.post('/api/videos/uploadVideos', formData, config)
      .then(response => {
        if (response.data.filesave) {
          console.log(response.data.filePath)

          let variable = {
            filepath: response.data.filePath,
            fileName: response.data.fileName
          }

          setVideopath(response.data.filePath);
          props.videoPathFunction(response.data.filePath)
          
          axios.post('/api/videos/thumbnail', variable)
            .then(response => {
              if (response.data.success) {
                setThumbnailPath(response.data.filepath);
                setDuration(response.data.fileDuration);
                props.videoupdateFunction([response.data.filepath,response.data.fileDuration])
              }
            })
        } else {
          alert('tl')
        }
      })
  }

  const deleteHandler = (video) => {
    setVideopath('');
    setThumbnailPath('');
    setDuration('');
    props.videoupdateFunction([])
    props.videoPathFunction('')
  };

  return (
    <div style={{ display: 'flex'  }}>
      <Dropzone
        onDrop={dropHandler}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: '300px', height: '240px',
                border: '1px solid lightgray',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center'
              }}
              {...getRootProps()}>
              <input {...getInputProps()} />
              <AiOutlinePlus style={{ fontSize: '3rem' }} />
            </div>
          </section>
        )}
      </Dropzone>
      {ThumbnailPath &&
        <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll',justifyContent:'center' }}>
          <div onClick={deleteHandler}>
            <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
              src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail"
            />
          </div>
        </div>
      }
    </div>
  )
}

export default UtilsVideoUpload
