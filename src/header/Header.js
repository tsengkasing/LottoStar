/**
 * Created by Think on 2017/5/17.
 */
import React from 'react';
import { Link  } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';

import Sign from './sign/Sign';
import Auth from '../Auth';
import './Header.css';

import logo from './lottostar.png';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            data_source: [],

            username: 'nobody',
            to_login: true,

            redirect: null,
        };
        window.__clear = this.handleSignOut;
    }

    handleUpdateInput = (value) => {
        this.setState({
            data_source: [
                value,
                value + value,
                value + value + value,
            ],
        });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    handleSign = (tab) => {
        this.refs.sign.handleOpen(tab);
    };

    handleRefreshStatus = () => {
        let user_info = Auth.getUserInfo();
        let to_login = user_info.to_login;
        this.setState({
            username: to_login ? 'nobody' : user_info.username,
            to_login: to_login,
        })
    };

    handleSignOut = () => {
        Auth.clearUserInfo();
        this.handleRefreshStatus();
        // window.location.pathname = '/';
    };

    componentWillMount() {
        this.handleRefreshStatus();
    }

    render() {
        return (
            <div className="header__background">
                <Paper>
                    <div className="header-menu-container edge">
                        <div className="header-menu-welcome"><Link className="link" to="/">欢迎来到乐透星！</Link></div>
                        <div className="header-menu-control">
                            {this.state.to_login ? <div className="header-menu-item" style={{color: '#3399ff'}}
                                                        onClick={() =>this.handleSign(true)}>请登录</div> : null}
                            {this.state.to_login ? <div className="header-menu-item"
                                                        onClick={() =>this.handleSign(false)}>免费注册</div> : null}
                            {this.state.to_login ? null : <div className="header-menu-item">
                                <Link className="link" to="/home">{this.state.username}</Link></div>}
                            {this.state.to_login ? null : <div className="header-menu-item"
                                                               onClick={this.handleSignOut}>注销</div>}
                        </div>
                    </div>
                </Paper>
                <div className="header__bar edge">
                    <div className="header-logo">
                        <Link className="link" to="/" style={{display: 'flex', alignItems: 'center'}}>
                            <img src={logo} style={{width: 64}} alt="logo" />&nbsp;&nbsp;&nbsp;&nbsp;
                            <span style={{color: 'white', fontSize: 24}}>Lotto Star</span>
                        </Link>
                    </div>
                    <div className="header__search">
                        <AutoComplete
                            hintText={<span style={{color: 'rgba(255, 255, 255, 0.3)'}}>请输入要搜索的商品</span>}
                            dataSource={this.state.data_source}
                            onUpdateInput={this.handleUpdateInput}
                        />
                    </div>
                </div>
                <Sign ref="sign" success={this.handleRefreshStatus} />
            </div>
        );
    }
}