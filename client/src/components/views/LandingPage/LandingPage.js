import React from "react";
import { Typography, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const { Title } = Typography;

function LandingPage() {
  const user = useSelector((state) => state.user);
  const Navigate = useNavigate();
  console.log(user);
  const onClick = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        Navigate("/login");
      } else {
        alert("fail to logout");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Title level={1}>연습페이지~~</Title>
      {user.userData && user.userData.isAuth && (
        <Button onClick={onClick}>LOG out</Button>
      )}
    </div>
  );
}

export default LandingPage;
