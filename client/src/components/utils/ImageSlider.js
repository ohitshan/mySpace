import React from 'react'
import { Carousel } from 'antd';


function ImageSlider(props) {

  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, i) => (
          <div key={i}>
            <img
              style={{ width: '100%', maxHeight: '200px' }}
              src={`http://localhost:5000/${image}`} />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default ImageSlider