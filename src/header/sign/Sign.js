/**
 * Created by Think on 2017/5/18.
 */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import 'whatwg-fetch';

import Auth from '../../Auth';
import API from '../../API';
import './Sign.css';

export default class Sign extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            tab: true,

            register_phone_number: '',
            register_password: '',

            register_phone_number_error: null,
            register_password_error: null,

            signin_phone_number: '',
            signin_password: '',

            signin_phone_number_error: null,
            signin_password_error: null
        }
    }

    handleOpen = (tab = true) => {
        this.setState({
            open: true,
            tab: tab
        });
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSwitch = () => {
        const _tab = this.state.tab;
        this.setState({tab: !_tab})
    };


    //register
    handleInputRegisterPhoneNumber = (event) => {
        this.setState({
            register_phone_number: event.target.value,
            register_phone_number_error: null
        });
    };

    handleInputRegisterPassword = (event) => {
        this.setState({
            register_password: event.target.value,
            register_password_error: null
        });
    };

    //signin
    handleInputSignInPhoneNumber = (event) => {
        this.setState({
            signin_phone_number: event.target.value,
            signin_phone_number_error: null
        });
    };

    handleInputSignInPassword = (event) => {
        this.setState({
            signin_password: event.target.value,
            signin_password_error: null
        });
    };

    handleSignIn = () => {
        let phone_number = this.state.signin_phone_number;
        let password = this.state.signin_password;
        let valid = true;

        //测试用
        if(phone_number === '233') {
            Auth.storeUserInfo({username: '233'});
            this.props.success();
            this.handleClose();
            return;
        }


        if(!phone_number || phone_number === '') {
            this.setState({
                signin_phone_number_error: '手机号码不能为空！'
            });
            valid = false;
        }else if(phone_number.length < 11) {
            this.setState({
                signin_phone_number_error: '手机号码不合法！'
            });
            valid = false;
        }
        if(!password || password === '') {
            this.setState({
                signin_password_error: '密码不能为空！'
            });
            valid = false;
        }

        if(!valid) return;


        const request_data = {username: phone_number, password: password};
        fetch(API.SignIn, {
            method: 'POST',
            redirect: 'manual',
            cache: 'no-cache',
            body: JSON.stringify(request_data),
            headers: new Headers({
                'Content-Type': 'application/json',
                'dataType': 'json'
            })
        }).then((response) => {
            if(response.status === 200) return response.json();
            else return {__status: response.status};
        }).then((data) => {
            if(typeof data.__status === 'object' && data.__status >= 500)
                console.error('服务器故障~');
            else {
                //登录成功
                Auth.storeUserInfo(request_data);
            }
        }).catch((e) => {
            console.error('登录失败！');
        });

    };

    handleRegisterr = () => {
        let phone_number = this.state.register_phone_number;
        let password = this.state.register_password;
        let valid = true;

        if(!phone_number || phone_number === '') {
            this.setState({
                register_phone_number_error: '手机号码不能为空！'
            });
            valid = false;
        }else if(phone_number.length < 11) {
            this.setState({
                register_phone_number_error: '手机号码不合法！'
            });
            valid = false;
        }
        if(!password || password === '') {
            this.setState({
                register_password_error: '密码不能为空！'
            });
            valid = false;
        }

        if(!valid) return;

        fetch(API.Register, {
            method: 'POST',
            redirect: 'manual',
            cache: 'no-cache',
            body: JSON.stringify({username: phone_number, password: password}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'dataType': 'json'
            })
        }).then((response) => {
            if(response.status === 200) return response.json();
            else return {__status: response.status};
        }).then((data) => {
            if(typeof data.__status === 'object' && data.__status >= 500)
                console.error('服务器故障~');
            else {
                //注册成功
            }
        }).catch((e) => {
            console.error('注册失败！');
        });

    };

    render() {
        return (
            <div>
                <Dialog
                    title="来成为乐透星吧！"
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    contentClassName="sign-dialog"
                >
                    <div className={`sign-tab ${this.state.tab ? 'activate' : ''}`}>
                        <TextField
                            errorText={this.state.signin_phone_number_error}
                            onChange={this.handleInputSignInPhoneNumber}
                            value={this.state.signin_phone_number}
                            floatingLabelText="手机号码"
                        /><br />
                        <TextField
                            errorText={this.state.signin_password_error}
                            onChange={this.handleInputSignInPassword}
                            value={this.state.signin_password}
                            floatingLabelText="登录密码"
                        /><br />
                        <RaisedButton label="登录" primary={true} className="sign-submit-btn"
                                      buttonStyle={{height: 40}} onTouchTap={this.handleSignIn} />
                        <div className="sign-bottom-line">
                            <div className="sign-switch" onClick={this.handleSwitch}>马上注册</div>
                            <div className="sign-forget">忘记密码</div>
                        </div>
                    </div>
                    <div className={`sign-tab ${!this.state.tab ? 'activate' : ''}`}>
                        <TextField
                            errorText={this.state.register_phone_number_error}
                            onChange={this.handleInputRegisterPhoneNumber}
                            value={this.state.register_phone_number}
                            floatingLabelText="注册手机号码"
                        /><br />
                        <TextField
                            errorText={this.state.register_password_error}
                            onChange={this.handleInputRegisterPassword}
                            value={this.state.register_password}
                            floatingLabelText="设置登录密码"
                        /><br />
                        <RaisedButton label="注册" primary={true} className="sign-submit-btn"
                                      buttonStyle={{height: 40}} onTouchTap={this.handleRegisterr}/>
                        <div className="sign-bottom-line">
                            <div className="sign-switch" onClick={this.handleSwitch}>马上登录</div>
                            <div className="sign-forget">忘记密码</div>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}