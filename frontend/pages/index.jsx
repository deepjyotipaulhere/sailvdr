import React, { Component } from 'react'
import { PageHeader, Form, Input, Button, Checkbox, Grid, Row, Col } from 'antd';
import Axios from 'axios';
import url from '../global'
import { KeyOutlined, UserOutlined } from '@ant-design/icons'
import Router from 'next/router'



export default class index extends Component {
  state = {
    username: '',
    password: '',
    loading: false
  }
  onFinish = (values) => {
    console.log(values);
    this.setState({ loading: true })
    Axios.post(url + "/login", {
      username: values.username,
      password: values.password
    }).then(response => {
      console.log(response.data);
      document.cookie = `auth=${response.data}`
      Router.push("/home")
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      this.setState({ loading: false })
    })
  }
  render() {
    return (
      <div>

        {/* <Grid> */}
        <Row>
          <Col span={10}></Col>
          <Col span={4}>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              style={{ marginTop: '30vh' }}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                {/* <label>Username</label> */}
                <Input prefix={<UserOutlined />} placeholder="Enter Username" value={this.state.username} onInput={e => this.setState({ username: e.target.value })} />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                {/* <label>Password</label> */}

                <Input.Password prefix={<KeyOutlined />} placeholder="Enter Password" value={this.state.password} onInput={e => this.setState({ password: e.target.value })} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={this.state.loading} block>
                  Submit
                  </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={10}></Col>
        </Row>
        {/* </Grid> */}


      </div>
    )
  }
}
