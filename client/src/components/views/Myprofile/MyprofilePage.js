import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Col, Row, Avatar, Image } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import ImageSlider from "../../utils/ImageSlider";
import { Link } from "react-router-dom";
import axios from "axios";
import EditPostPage from "../EditPostPage/EditPostPage";
const { Meta } = Card;

function MyprofilePage() {
  const user = useSelector((state) => state.user);
  const userid = localStorage.getItem("userId");

  const [Posts, setPosts] = useState([]);
  const [Edit, setEdit] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");

  useEffect(() => {
    let body = {
      id: userid,
    };
    axios.post("/api/products/myPosts", body).then((response) => {
      setPosts(response.data.posts);
    });
  }, []);

  // let variable = {
  //   email: Email
  // }

  // useEffect(() => {
  //   if (user.userData) {
  //     setEmail(user.userData.email)
  //   }

  //   axios.post('/api/products/myPosts', variable)
  //     .then(response => {
  //       console.log(response.data)
  //       if (response.data.success) {
  //         setPosts(response.data.posts)
  //       }
  //     })
  // }, [user.userData]);

  const deleteHandler = (post) => {
    let currentPost = Posts.indexOf(post);
    let postInfo = Posts[currentPost];

    if (!window.confirm("정말로????지울거야??")) return;

    let body = {
      _id: postInfo._id,
    };

    axios.post("/api/products/deletePost", body).then((response) => {
      if (response.data.success) {
        alert("success to delete");
        window.location.reload();
      } else {
        alert("fail to delete");
      }
    });
  };

  const editPost = (post) => {
    setEdit(!Edit);

    const currentPost = Posts.indexOf(post);
    let postInfo = Posts[currentPost];
    setSelectedPost(postInfo._id);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: "1400px", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {user.userData && (
            <Image
              width={200}
              src={user.userData.image || "https://joeschmoe.io/api/v1/random"}
            />
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {user.userData && (
            <div>
              {user.userData.name}
              <br />
              {user.userData.introduction}
            </div>
          )}
        </div>

        <hr />

        <div>{Edit && <EditPostPage postId={selectedPost} />}</div>

        <Row gutter={[32, 16]}>
          {Posts.map((post, i) => (
            <Col key={i} lg={6} md={8} xs={24}>
              <Card
                key={i}
                style={{
                  width: 350,
                  margin: "10px 10px",
                  position: "relative",
                }}
                cover={
                  post.filePath ? (
                    <Link to={`/news/post/${post._id}`}>
                      <video
                        style={{ width: 350, height: 200 }}
                        src={`http://localhost:5000/${post.filePath}`}
                        controls
                      />
                    </Link>
                  ) : (
                    <Link to={`/news/post/${post._id}`}>
                      <ImageSlider images={post.images} />
                    </Link>
                  )
                }
                actions={[
                  <EditOutlined key="edit" onClick={() => editPost(post)} />,
                  <EllipsisOutlined
                    key="ellipsis"
                    onClick={() => deleteHandler(post)}
                  />,
                ]}
              >
                <Meta
                  avatar={
                    <Avatar
                      src={
                        post.writer.image ||
                        "https://joeschmoe.io/api/v1/random"
                      }
                    />
                  }
                  title={post.title}
                  description={post.description}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default MyprofilePage;
