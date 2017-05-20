/**
 * Created by Think on 2017/5/17.
 */
import React from 'react';
import { Redirect } from 'react-router-dom';
import Popover from 'material-ui/Popover';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';

import Sign from './sign/Sign';
import Auth from '../Auth';
import './Header.css';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            data_source: [],

            username: 'nobody',
            to_login: true,

            redirect: null,
        }
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

    handleSelectMenuItem = (item) => {
        this.handleRedirect(item);
        this.handleRequestClose();
    };

    handleRefreshStatus = () => {
        let user_info = Auth.getUserInfo();
        this.setState({
            username: typeof user_info === 'object' ? user_info.username : 'nobody',
            to_login: typeof user_info === 'object' ? user_info.to_login : true,
        })
    };

    handleSignOut = () => {
        Auth.clearUserInfo();
        this.handleRefreshStatus();
        window.location.pathname = '/';
    };


    handleRedirect = (target) => {
        let redirect = '/';
        switch (target) {
            case -1: redirect = '/';break;
            case 0: redirect = '/home';break;
            default:break;
        }
        window.location.pathname = redirect;
    };

    componentWillMount() {
        this.handleRefreshStatus();
    }

    render() {
        return (
            <div className="header__background background__mask--filled">
                <Paper>
                    <div className="header-menu-container edge">
                        <div className="header-menu-welcome" onClick={this.handleRedirect}>欢迎来到乐透星！</div>
                        <div className="header-menu-control">
                            {this.state.to_login ? <div className="header-menu-item" style={{color: '#3399ff'}} onClick={() =>this.handleSign(true)}>请登录</div> : null}
                            {this.state.to_login ? <div className="header-menu-item" onClick={() =>this.handleSign(false)}>免费注册</div> : null}
                            {this.state.to_login ? null : <div className="header-menu-item" onClick={() => this.handleRedirect(0)}>{this.state.username}</div>}
                            {this.state.to_login ? null : <div className="header-menu-item" onClick={this.handleSignOut}>注销</div>}
                        </div>
                    </div>
                </Paper>
                <div className="header__bar edge">
                    <div className="header-logo" onClick={this.handleRedirect}><del>这是一个Logo</del></div>
                    <div className="header__search">
                        <AutoComplete
                            hintText="请输入要搜索的商品"
                            dataSource={this.state.data_source}
                            onUpdateInput={this.handleUpdateInput}
                        />
                        <RaisedButton label="搜索" primary={true} className="header__search__btn"/>
                    </div>
                </div>
                <Sign ref="sign" success={this.handleRefreshStatus} />
                {this.state.redirect !== null ? <Redirect to={this.state.redirect} /> : null}
            </div>
        );
    }
}