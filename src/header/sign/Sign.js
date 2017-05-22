/**
 * Created by Think on 2017/5/18.
 */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import 'whatwg-fetch';

import TipsDialog from '../../TipsDialog';
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
            register_username: '',
            register_password: '',
            register_confirm_password: '',

            register_phone_number_error: null,
            register_username_error: '',
            register_password_error: null,
            register_confirm_password_error: '',

            signin_username: '',
            signin_password: '',

            signin_username_error: null,
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
    handleInputRegisterUserName = (event) => {
        this.setState({
            register_username: event.target.value,
            register_username_error: null
        });
    };
    handleInputRegisterPassword = (event) => {
        this.setState({
            register_password: event.target.value,
            register_password_error: null
        });
    };
    handleInputRegisterConfirmPassword = (event) => {
        const _confirm = event.target.value;
        let _correct = false;
        if(this.state.register_password === _confirm) _correct = true;
        this.setState({
            register_confirm_password: _confirm,
            register_confirm_password_error: _correct ? null : '密码不一致'
        });
    };

    //signin
    handleInputSignInPhoneNumber = (event) => {
        this.setState({
            signin_username: event.target.value,
            signin_username_error: null
        });
    };
    handleInputSignInPassword = (event) => {
        this.setState({
            signin_password: event.target.value,
            signin_password_error: null
        });
    };

    handleSignIn = () => {
        let username = this.state.signin_username;
        let password = this.state.signin_password;
        let valid = true;

        //测试用
        if(username === '233') {
            Auth.storeUserInfo({username: '233'});
            this.props.success();
            this.handleClose();
            return;
        }


        if(!username || username === '') {
            this.setState({
                signin_username_error: '用户名不能为空！'
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

        fetch(API.Token, {
            method: 'POST',
            redirect: 'manual',
            cache: 'no-cache',
            body: `grant_type=password&username=${username}&password=${password}&client_id=LottorApp`,
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'dataType': 'json'
            })
        }).then((response) => {
            if(response.status === 200) return response.json();
            else return {__status: response.status};
        }).then((data) => {
            if(data && data.__status) {
                if(data.__status >= 400) {
                    this.setState({
                        signin_password_error: '密码错误！'
                    });
                }else if (data.__status >= 500) {
                    console.error('服务器故障~');
                }
            }
            else {
                //登录成功
                Auth.storeUserInfo(Object.assign({username: username, password: password}, data));
                this.props.success();
                this.handleClose();
            }
        }).catch((e) => {
            console.error('登录失败！');
        });

    };

    handleRegisterr = () => {
        const phone_number = this.state.register_phone_number;
        const username = this.state.register_username;
        const password = this.state.register_password;
        const confirm_password = this.state.register_confirm_password;
        const confirm_error = this.state.register_confirm_password_error;
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
        if(!username || username === '') {
            this.setState({
                register_username_error: '用户名不能为空！'
            });
            valid = false;
        }
        if(!password || password === '') {
            this.setState({
                register_password_error: '密码不能为空！'
            });
            valid = false;
        }
        else if(password.length < 6) {
            this.setState({
                register_password_error: '密码至少为6位！'
            });
            valid = false;
        }
        if(confirm_error) {
            valid = false;
        }

        if(!valid) return;

        fetch(API.Register, {
            method: 'POST',
            redirect: 'manual',
            cache: 'no-cache',
            body: JSON.stringify({
                UserName: username,
                Password: password,
                ConfirmPassword: confirm_password,
                PhoneNumber: phone_number
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response) => {
            if(response.status === 200) {
                //注册成功
                this.handleSwitch();
            }else if(response.status === 400) {
                return response.json();
            }else {
                console.error('服务器故障~');
                this.refs['dialog'].handleOpen('服务器出错', '请稍后再试');
            }
            return null;
        }).then((body)=>{
            if(!body) return;
            let content = body['ModelState'][''];
            this.refs['dialog'].handleOpen(content[0], content[1]);
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
                            errorText={this.state.signin_username_error}
                            onChange={this.handleInputSignInPhoneNumber}
                            value={this.state.signin_username}
                            floatingLabelText="用户名"
                        /><br />
                        <TextField
                            errorText={this.state.signin_password_error}
                            onChange={this.handleInputSignInPassword}
                            value={this.state.signin_password}
                            floatingLabelText="登录密码"
                            type="password"
                        /><br />
                        <RaisedButton label="登录" primary={true} className="sign-submit-btn"
                                      buttonStyle={{height: 40}} onTouchTap={this.handleSignIn} />
                        <div className="sign-bottom-line">
                            <div className="sign-switch" onClick={this.handleSwitch}>马上注册</div>
                            <div className="sign-forget">忘记密码</div>
                        </div>
                    </div>
                    <div className={`sign-tab ${!this.state.tab ? 'register--activate' : ''}`}>
                        <TextField
                            errorText={this.state.register_phone_number_error}
                            onChange={this.handleInputRegisterPhoneNumber}
                            value={this.state.register_phone_number}
                            floatingLabelText="注册手机号码"
                        /><br />
                        <TextField
                            errorText={this.state.register_username_error}
                            onChange={this.handleInputRegisterUserName}
                            value={this.state.register_username}
                            floatingLabelText="注册用户名"
                        /><br />
                        <TextField
                            errorText={this.state.register_password_error}
                            onChange={this.handleInputRegisterPassword}
                            value={this.state.register_password}
                            floatingLabelText="设置登录密码"
                            type="password"
                        /><br />
                        <TextField
                            errorText={this.state.register_confirm_password_error}
                            onChange={this.handleInputRegisterConfirmPassword}
                            value={this.state.register_confirm_password}
                            floatingLabelText="确认登录密码"
                            type="password"
                        /><br />
                        <RaisedButton label="注册" primary={true} className="sign-submit-btn"
                                      buttonStyle={{height: 40}} onTouchTap={this.handleRegisterr}/>
                        <div className="sign-bottom-line">
                            <div className="sign-switch" onClick={this.handleSwitch}>马上登录</div>
                            <div className="sign-forget">忘记密码</div>
                        </div>
                    </div>
                </Dialog>
                <TipsDialog ref="dialog"/>
            </div>
        );
    }
}