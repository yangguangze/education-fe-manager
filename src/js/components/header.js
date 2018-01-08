import React, {Component} from 'react';
import {Row, Col, Menu, Icon, Tabs, message, Form, Input, Button, Checkbox, Modal} from 'antd';
import {Route, BrowserRouter, Link } from 'react-router-dom';
import {request} from '../util'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

let url = "http://localhost:3000";



class PCHeader extends Component {

    constructor() {
        super();
        this.state = {
            action: 'login',
            modalVisible: false,
            hasLogined: false
        }
    }

    logout() {
        this.setState({
            hasLogined: false
        });
    }

    setModalVisible(value){
        this.setState({
            modalVisible: value
        });
    }

    handleSubmit(e){
        e.preventDefault();

        let myFetchOptions = {
            method: 'GET'
        };

        let formData = this.props.form.getFieldsValue();
        console.info('this.props.form', this.props.form.getFieldsValue());

        request(url, formData)
            .then(response=>{
                console.info('response', response);
            })
            .catch(err=> {})
            .then();

        /*
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
            + "&r_userName=" + formData.r_userName
            + "&r_password=" + formData.r_password
            + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions).
        then(response=>response.json()).then(json=>{
            this.setState({
                userid: json.UserId
            });
        });
        if(this.state.action === 'login'){
            this.setState({
                hasLogined: true
            });
        }
        */
        this.setModalVisible(false);
    }


    handleClick() {
        this.setModalVisible(true);
    }

    callback(key){
        this.setState({
            action: key
        })
    }

    renderModal() {
        let {getFieldDecorator} = this.props.form;

        return (
            <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
                   onCancel={()=> this.setModalVisible(false)}  cancelText="取消"
                   onOk={() => this.setModalVisible(false)} okText="关闭"
            >
                <Tabs type="card" onChange={this.callback.bind(this)}>
                    <TabPane tab={"登录"} key="login">
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label={"账户"}>
                                {getFieldDecorator('userName')(<Input placeholder={"请输入您的账号"}/>)}
                            </FormItem>
                            <FormItem label={"密码"}>
                                {getFieldDecorator('password')(<Input type="password" placeholder={"请输入您的密码"}/>)}
                            </FormItem>
                            <Button type="primary" htmlType="submit">登录</Button>
                        </Form>
                    </TabPane>

                    <TabPane tab={"注册"} key="register">
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label={"账户"}>
                                {getFieldDecorator('userName')(<Input placeholder={"请输入您的账号"}/>)}
                            </FormItem>
                            <FormItem label={"密码"}>
                                {getFieldDecorator('password')(<Input type="password" placeholder={"请输入您的密码"}/>)}
                            </FormItem>
                            <FormItem label={"确认密码"}>
                                {getFieldDecorator('confirmPassword')(<Input type="password" placeholder={"请再次输入您的账号"}/>)}
                            </FormItem>
                            <Button type="primary" htmlType="submit">注册</Button>
                        </Form>
                    </TabPane>
                </Tabs>
            </Modal>
        );
    }


    render() {
        const userShow = this.state.hasLogined ?
            <Menu.Item class="register" key="logout">
                <Button type="primary" htmlType="button" class="register">
                    root
                </Button>
                <Button type="ghost" onClick={this.logout.bind(this)}  htmlType="button" class="register">
                    退出
                </Button>
            </Menu.Item>
            :
            <Menu.Item key="register" class="register">
                <Icon type="appstore" />
                注册/登录
            </Menu.Item>;

        return (
            <header>
                <Row>
                    <Col span={6}>

                    </Col>
                    <Col span={15}>
                        <Menu mode="horizontal" selectedKeys = {this.state.current}>
                            <Menu.Item key="top">
                                <Icon type="appstore" /> 增加
                            </Menu.Item>
                            <Menu.Item type="shehui">
                                <Icon type="appstore" /> 删除
                            </Menu.Item>
                            <Menu.Item type="guonei">
                                <Icon type="appstore" /> 删除
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={3}>
                        <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={this.state.current}>
                            {userShow}
                        </Menu>
                    </Col>
                    <Col span={1}>

                    </Col>
                </Row>
                {this.renderModal()}
            </header>
        );
    }
}

export default PCHeader = Form.create()(PCHeader);