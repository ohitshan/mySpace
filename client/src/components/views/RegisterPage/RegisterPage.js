import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [PasswordConfirm, setPasswordConfirm] = useState('');



  const emailHandler = (e) => { setEmail(e.currentTarget.value) };
  const nameHandler = (e) => { setName(e.currentTarget.value) };
  const passwordHandler = (e) => { setPassword(e.currentTarget.value) };
  const passwordConfirmHandler = (e) => { setPasswordConfirm(e.currentTarget.value) };

  const onSubmit = (values) => {

    let body = {
      name: Name,
      email: Email,
      password: Password,
      passwordConfirm: PasswordConfirm,
    }

    dispatch(registerUser(body))
      .then(response => {
        if (response.payload.success) {
          navigate('/login');
        } else {
          alert(response.payload.err.keyValue.email + "// is already exist")
        }
      })

  }



  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <Form
        name="basic"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onSubmit}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          tooltip="What is your name?"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input onChange={nameHandler} value={Name} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not vaild Email'
            },
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input onChange={emailHandler} value={Email} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              min: 6,
              message: 'Please input longer password!',
            }
          ]}
        >
          <Input.Password onChange={passwordHandler} value={Password} />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="passwordConfirm"
          rules={[
            {
              required: true,
              message: 'Please input your Confirm password!',
            },
            {
              min: 6,
              message: 'Please input longer password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password onChange={passwordConfirmHandler} value={PasswordConfirm} />
        </Form.Item>


        <Form.Item
          wrapperCol={{
            offset: 10,
            span: 16,
          }}
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
        >
          <Checkbox>
            Will listen my word Well?!
            {/* <a href="">agreement</a> */}
          </Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 10,
            span: 16,
          }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>

  )
}

export default RegisterPage;
