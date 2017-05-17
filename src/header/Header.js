/**
 * Created by Think on 2017/5/17.
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import Sign from './sign/Sign';

import './Header.css';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    handleSign = (tab) => {
        this.refs.sign.handleOpen(tab);
    };

    handleSelectMenuItem = (item) => {
        console.log(item);
        this.handleRequestClose();
    };

    render() {
        return (
            <div>
                <div className="header-menu-container edge">
                    <div style={{margin: 8}}>欢迎来到乐透星！</div>
                    <div className="header-menu-control">
                        <div className="header-menu-item" onClick={this.handleSign}>请登录</div>
                        <div className="header-menu-item" onClick={() =>this.handleSign('register')}>免费注册</div>
                        <div className="header-menu-item" onClick={this.handleTouchTap}>我的乐透星</div>
                    </div>
                </div>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                >
                    <Menu>
                        <MenuItem primaryText="乐透记录" onTouchTap={() => this.handleSelectMenuItem(1)} />
                        <MenuItem primaryText="装逼记录" onTouchTap={() => this.handleSelectMenuItem(2)} />
                        <MenuItem primaryText="充值" onTouchTap={() => this.handleSelectMenuItem(3)} />
                    </Menu>
                </Popover>
                <Sign ref="sign" />
            </div>
        );
    }
}