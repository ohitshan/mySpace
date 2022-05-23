import React, { useEffect, useState } from "react";
import { Card, Col, Row, Avatar, Empty } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getFavorites } from "../../../_actions/user_action";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import ImageSlider from "../../utils/ImageSlider";

const { Meta } = Card;

function FavoritesPage() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [FavLists, setFavLists] = useState([]);

  useEffect(() => {
    let myFavorites = [];
    if (user.userData && user.userData.favorites) {
      if (user.userData.favorites.length > 0) {
        user.userData.favorites.forEach((fav) => {
          myFavorites.push(fav.id);
        });

        dispatch(getFavorites(myFavorites)).then((response) =>
          setFavLists(response.payload)
        );
        console.log(FavLists);
      }
    }
  }, [user.userData && user.userData.favorites]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: "1400px", width: "100%" }}>
        {FavLists.length > 0 ? (
          <Row gutter={[32, 16]}>
            {FavLists.map((post, i) => (
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
          <Empty style={{ marginTop: "300px" }} description="ADD FAVORITES" />
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
