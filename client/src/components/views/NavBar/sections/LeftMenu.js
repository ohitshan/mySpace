import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

const { SubMenu } = Menu;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="news">
        <Link to="/news">NEWS</Link>
      </Menu.Item>
      <Menu.Item key="subscription">
        <Link to="/subscription">SUBSCRIPTION</Link>
      </Menu.Item>
      <Menu.Item key="games">
        <Link to="/games">GAMES</Link>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
