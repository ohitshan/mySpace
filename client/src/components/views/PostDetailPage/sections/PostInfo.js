import React, { useEffect, useState } from 'react';
import { List, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import Comment from './Comment';
function PostDetail(props) {

  const [Post, setPost] = useState({});
  const [Image, setImage] = useState('');
  const [Name, setName] = useState('');
  const [UserId, setUserId] = useState('');

  useEffect(() => {
    if (props.detail.writer) {
      let images = props.detail.writer.image;
      let name = props.detail.writer.name;
      let id = props.detail.writer._id;
      setName(name);
      setImage(images);
      setUserId(id);
    }
    setPost(props.detail)
  }, [props.detail]);
  console.log(12, Post)

  let data = [
    {
      title: Name,
    },
  ];




  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Link to={`/news/user/${UserId}`}><Avatar src={Image|| "https://joeschmoe.io/api/v1/random"} />{item.title}</Link>}
              title={Post.title}
              description={Post.description}
            />
          </List.Item>
        )}
      />
      <Comment postId={Post._id}/>
    </div>
  );

}

export default PostDetail;
