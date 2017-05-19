/**
 * Created by Think on 2017/5/19.
 */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


export default class TipsDialog extends React.Component {

    state = {
        open: false,
        title : "wow",
        description : "Please Close this dialog.",
        ok : null
    };

    handleOpen = (title, description, ok = null) => {
        this.setState({
            open: true,
            title : title,
            description : description,
            ok: ok
        });
    };

    handleClose = () => {
        this.setState({open: false});
        this.state.ok && this.state.ok();
    };

    render() {
        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <div>
                <Dialog
                    title={this.state.title}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    {this.state.description}
                </Dialog>
            </div>
        );
    }
}