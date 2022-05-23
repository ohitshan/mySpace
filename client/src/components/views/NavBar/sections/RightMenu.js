import React from 'react'
import { Menu, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;


function RightMenu(props) {
  const Navigate = useNavigate();
  const user = useSelector(state => state.user);
  const logoutHandler = () => {
    Axios.get('/api/users/logout')
      .then(response => {
        if (response.data.success) {
          Navigate('/login')
        } else {
          alert('fail to logout')
        }
      })
  }

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="signin">
          <Link to="/login">SIGN IN</Link>
        </Menu.Item>
        <Menu.Item key="signup">
          <Link to="/register">SIGN UP</Link>
        </Menu.Item>
      </Menu>
    )
  } else {

    return (
      <Menu mode={props.mode}>

        <Menu.Item key="favorites">
          <Link to="/favorites">
            Favorites
          </Link>
        </Menu.Item>

        <SubMenu key="sub"  title="Uploads">
        <Menu.Item key="videouploads">
          <Link to="/videouploads">VideoUploads</Link>
        </Menu.Item>
        <Menu.Item key="uploads">
          <Link to="/uploads">PictureUploads</Link>
        </Menu.Item>
        </SubMenu>

        <SubMenu key="sub1"  title="Profile">
          <Menu.Item key="myprofile">
            {user.userData &&
              <Link to="/myprofile">
                <img style={{
                  width: "40px", height: "40px", borderRadius: '40px'
                }} src={user.userData.image || "https://joeschmoe.io/api/v1/random"} /> {user.userData.name}
              </Link>
            }
          </Menu.Item>
          <Menu.Item key="profile">
            <Link to="/profile">
              Profile setting
            </Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <a onClick={logoutHandler}>Log out</a>
          </Menu.Item>
        </SubMenu>
        
      </Menu>
    )
  }
}

export default RightMenu;
