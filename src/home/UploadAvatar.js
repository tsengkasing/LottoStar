/**
 * Created by Think on 2017/5/21.
 */
import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Chip from 'material-ui/Chip';
import CircularProgress from 'material-ui/CircularProgress';

export default class UploadAvatar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            wait: false,
            error: null,

            id: 0,
            file_name: null,
            cb: null
        }
    }

    handleOpen = (id, cb = function(){}) => {
        this.setState({
            open: true,
            id: id,
            cb: cb,
            wait: false,
            error: null,
            file_name: null,
        });
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSelectFile = (event) => {
        let path = event.target.value;
        let idx = path.lastIndexOf('\\');
        this.setState({
            file_name: path.slice(idx + 1),
            error: null
        });
    };

    handleUpload = () => {
        this.setState({wait: true});
        fetch(`/api/account/${this.state.id}/avatar`, {
            method: 'POST',
            body: new FormData(document.getElementById('ChangeAvator'))
        }).then((response)=>{
            if(response.status === 200) {
                this.handleClose();
                this.state.cb();
            }else {
                this.setState({wait: false, error: '上传失败，请稍后再试'});
            }
        }).catch((e) => {
            console.error(e);
        });
    };

    render() {
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="上传"
                primary={true}
                keyboardFocused={true}
                disabled={!this.state.file_name}
                onTouchTap={this.handleUpload}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="更改头像"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <form id="ChangeAvator" method="post" encType="multipart/form-data">
                        <div className="image__select">
                            <RaisedButton primary={true} label="选择一个头像" labelPosition="before">
                                <input type="file" onChange={this.handleSelectFile} style={{
                                    cursor: 'pointer',
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0,
                                    right: 0,
                                    left: 0,
                                    width: '100%',
                                    opacity: 0,
                                }} name="file" />
                            </RaisedButton>
                            <Chip>
                                {this.state.file_name}
                            </Chip>
                            {this.state.wait ? <CircularProgress /> : null}
                            {this.state.error ? <Chip>{this.state.error}</Chip>: null}
                        </div>
                    </form>
                </Dialog>
            </div>
        );
    }
}