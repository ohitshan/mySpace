import React, { useEffect, useState } from "react";
import Axios from "axios";
import ImageSlider from "../../utils/ImageSlider";
import { useSelector } from "react-redux";
import { Card, Col, Row, Avatar, Button } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import EditPostPage from "../EditPostPage/EditPostPage";
import LikeButton from "../UserProfile/sections/LikeButton";
const { Meta } = Card;

function NewsPage() {
  const user = useSelector((state) => state.user);
  const [Posts, setPosts] = useState([]);
  const [Edit, setEdit] = useState(false);
  const [Samewriter, setSamewriter] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostNumber, setPostNumber] = useState(0);

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
  }, []);

  const getProducts = (body) => {
    Axios.post("/api/products/getPosts", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setPosts([...Posts, ...response.data.posts]);
        } else {
          console.log(response.data.posts);
          setPosts(response.data.posts);
        }
        setPostNumber(response.data.postNumber);
      }
    });
  };

  const onSeemore = () => {
    let skip = Skip + Limit;

    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };

    getProducts(body);
    setSkip(skip);
  };

  const deleteHandler = (post) => {
    let currentPost = Posts.indexOf(post);
    let postInfo = Posts[currentPost];

    if (postInfo.writer && user.userData) {
      if (postInfo.writer._id !== user.userData._id) return;
    }
    if (!window.confirm("정말로????지울거야??")) return;

    let body = {
      _id: postInfo._id,
    };

    Axios.post("/api/products/deletePost", body).then((response) => {
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
    if (postInfo.writer && user.userData) {
      if (postInfo.writer._id === user.userData._id) {
        setSamewriter(true);
      }
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: "1400px", width: "100%" }}>
        {Edit && Samewriter && <EditPostPage postId={selectedPost} />}
        <Row gutter={[32, 16]} style={{ width: "100%", padding: "20px" }}>
          {Posts.map((post, i) => (
            <Col key={i} lg={6} md={8} xs={24}>
              <Card
                style={{
                  position: "relative",
                }}
                cover={
                  post.filePath ? (
                    <Link
                      to={`/news/post/${post?._id}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "200px",
                        border: "1px solid #D9D9D9",
                      }}
                    >
                      <video
                        style={{
                          width: "100%",
                          maxHeight: "200px",
                        }}
                        src={`http://localhost:5000/${post.filePath}`}
                        controls
                      />
                    </Link>
                  ) : (
                    <Link to={`/news/post/${post?._id}`}>
                      <ImageSlider images={post.images} />
                    </Link>
                  )
                }
                actions={[
                  <EditOutlined key="edit" onClick={() => editPost(post)} />,
                  <EllipsisOutlined
                    onClick={() => deleteHandler(post)}
                    key="ellipsis"
                  />,
                ]}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Link to={`/news/user/${post.writer?._id}`}>
                    <Avatar
                      src={
                        post?.writer?.image ||
                        "https://joeschmoe.io/api/v1/random"
                      }
                    />
                  </Link>
                  <LikeButton postId={post?._id} />
                </div>
                <Meta title={post?.title} description={post?.description} />
              </Card>
            </Col>
          ))}
        </Row>
        <br />

        {PostNumber >= Limit && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={onSeemore} type="primary" shape="round">
              See More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsPage;
