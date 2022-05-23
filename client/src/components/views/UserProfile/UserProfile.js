import Axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Avatar, Image } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import ImageSlider from "../../utils/ImageSlider";
import SubscribeButton from "./sections/SubscribeButton";
import LikeButton from "./sections/LikeButton";
const { Meta } = Card;

function UserProfile() {
  const { userId } = useParams();
  const [UserPosts, setUserPosts] = useState([]);
  const [Writer, setWriter] = useState([]);

  useEffect(() => {
    Axios.get(`/api/products/user_by_id?id=${userId}&type=single`).then(
      (response) => {
        setUserPosts(response.data);
        // if (response.data) {
        setWriter(response.data[0].writer);
        // }
      }
    );
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: "1400px", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <Image
              width={200}
              src={Writer.image || "https://joeschmoe.io/api/v1/random"}
            />
            <div>
              {Writer.name}
              <br />
              {Writer.introduction}
              <br />
            </div>
            <SubscribeButton
              userTo={Writer._id}
              userFrom={localStorage.getItem("userId")}
            />
          </div>
        </div>

        <hr />
        <Row gutter={[32, 16]}>
          {UserPosts.map((post, i) => (
            <Col key={i} lg={6} sm={24}>
              <Card
                key={i}
                style={{
                  width: 350,
                  margin: "10px 10px",
                  position: "relative",
                }}
                cover={
                  post.filePath ? (
                    <Link
                      to={`/news/post/${post._id}`}
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
                    <Link to={`/news/post/${post._id}`}>
                      <ImageSlider images={post.images} />
                    </Link>
                  )
                }
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Avatar
                    src={
                      post.writer.image || "https://joeschmoe.io/api/v1/random"
                    }
                  />
                  <LikeButton postId={post._id} />
                </div>
                <Meta title={post.title} description={post.description} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default UserProfile;
