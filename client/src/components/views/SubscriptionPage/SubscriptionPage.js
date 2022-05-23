import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Card, Col, Row, Avatar, Empty } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import ImageSlider from "../../utils/ImageSlider";

const { Meta } = Card;

function SubscriptionPage() {
  const user = useSelector((state) => state.user);
  const userid = localStorage.getItem("userId");
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    let body = {
      userFrom: userid,
    };
    axios.post("/api/products/getSubscription", body).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setPosts(response.data.products);
      }
    });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: "1400px", width: "100%" }}>
        {Posts.length > 0 ? (
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
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  <Meta
                    avatar={
                      <Link to={`/news/user/${post.writer._id}`}>
                        <Avatar
                          src={
                            post.writer.image ||
                            "https://joeschmoe.io/api/v1/random"
                          }
                        />
                      </Link>
                    }
                    title={post.title}
                    description={post.description}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty
            style={{ marginTop: "300px" }}
            description="Follow Some User"
          />
        )}
      </div>
    </div>
  );
}

export default SubscriptionPage;
