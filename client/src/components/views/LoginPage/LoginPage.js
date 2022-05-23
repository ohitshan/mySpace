import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_action';

const { Title } = Typography;

function LoginPage() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const emailhandler = (e) => { setEmail(e.currentTarget.value) };
  const passwordhandler = (e) => { setPassword(e.currentTarget.value) };

  const onSubmit = () => {

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
      .then(response => {
        if (response.payload.loginSuccess) {
          window.localStorage.setItem('userId', response.payload.userId);
          Navigate('/')
        } else {
          alert('fail to login');
        }
      })
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: "100vh", width: "100%", flexDirection: "column"
    }}>
      <Title level={2}>LOG IN</Title>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        onFinish={onSubmit}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input onChange={emailhandler} value={Email} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password onChange={passwordhandler} value={Password} />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit"
            onSubmit={onSubmit}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginPage
