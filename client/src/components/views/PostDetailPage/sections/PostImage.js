import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites } from '../../../../_actions/user_action';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostImage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user)
  const [Images, setImages] = useState([]);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      let images = [];

      props.detail.images.map(item => {
        images.push({
          original: `http://localhost:5000/${item}`,
          thumbnail: `http://localhost:5000/${item}`
        })
      })

      setImages(images);
    }
    user.userData && user.userData.isAuth && user.userData.favorites.forEach((post) => {
      if (props.detail._id === post.id) {
        setAdded(!added)
      }
    })

  }, [props.detail])

  const clickHandler = () => {
    if (!user.userData.isAuth) {
      alert('you need to login')
      if (window.confirm('want to login?')) {
        navigate('/login')
      }
      return
    }
    dispatch(addToFavorites(props.detail._id))
    setAdded(!added)
  }

  return (
    <div>
      {props.detail.filePath ?
        <video style={{ width: "100%" }} src={`http://localhost:5000/${props.detail.filePath}`} controls />
        :
        <ImageGallery items={Images} />
      }
      <br />
      {added ?
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button size="large" shape='round' type='danger' onClick={clickHandler}>Added</Button>
        </div>
        : <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button size="large" shape='round' onClick={clickHandler}>Add to Favorites</Button>
        </div>


      }
    </div>
  )
}

export default PostImage;
