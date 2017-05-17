/**
 * Created by Think on 2017/5/18.
 */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';


export default class Sign extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            tab: 'signin'
        }
    }

    handleOpen = (tab = 'signin') => {
        this.setState({
            open: true,
            tab: 'signin'
        });
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSwitchTab = (value) => {
        this.setState({tab: value});
    };

    render() {
        return (
            <div>
                <Dialog
                    title="来成为乐透星吧！"
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <Tabs
                        value={this.state.tab}
                        onChange={this.handleSwitchTab}
                    >
                        <Tab label="登录" value="signin">
                            <div>
                                <TextField
                                    floatingLabelText="手机号码"
                                /><br />
                                <TextField
                                    floatingLabelText="密码"
                                /><br />
                            </div>
                        </Tab>
                        <Tab label="注册" value="register">
                            <div>
                                <TextField
                                    floatingLabelText="手机号码"
                                /><br />
                                <TextField
                                    floatingLabelText="密码"
                                /><br />
                            </div>
                        </Tab>
                    </Tabs>
                </Dialog>
            </div>
        );
    }
}