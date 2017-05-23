/**
 * Created by Think on 2017/5/23.
 */
import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import './Manage.css';

const mock = [];
for(let i = 0; i < 20; i++) {
    let ran = Math.random();
    mock.push({
        ware_id: ran.toFixed(16).toString().slice(2),
        ware_name: `Novemser 性感写真(${i})`,
        ware_value: parseInt(6000 * ran, 10) + 1000,
        max_payable_user_count: parseInt(3000 * ran, 10) + 2000
    })
}

export default class Manage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            display_items: [],
            animation: [],
            input: []
        }
    }

    componentDidMount() {
        this.setState({
            items: mock,
            display_items: mock,
            animation: new Array(mock.length).fill(false)
        });
    }

    handleDelete = (ware_id, index) => {
        const {items, display_items, animation} = this.state;
        animation[index] = true;
        this.setState({animation});
        setTimeout(()=>{
            const _display_items = display_items.slice(0, index).concat(display_items.slice(index + 1));
            const _animation = new Array(display_items.length).fill(false);
            const _index = items.findIndex((element)=> element.ware_id === display_items[index].ware_id);
            const _items = items.slice(0, _index).concat(items.slice(_index + 1));
            this.setState({ items: _items, display_items: _display_items, animation: _animation });
        }, 800);
    };


    handleUpdateInput = (event) => {
        const input = event.target.value;
        if(input && input !== '') {
            this.setState({
                input: input,
                display_items: this.state.items.filter((item, items) => {
                    if(item.ware_name.search(input) !== -1)
                        return items;
                })
            });
        }else {
            this.setState({
                input: input,
                display_items: this.state.items
            });
        }
    };

    render(){
        return (
            <div className="manage__border">
                <Paper>
                    <div className="manage__header">
                        <div className="manage__title">Lotto Star 商品乐透管理中心&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <div>
                            <TextField
                                hintText="请输入要搜索的商品名称"
                                onChange={this.handleUpdateInput}
                                value={this.state.input}
                            />
                        </div>
                    </div>
                </Paper>
                <Paper>
                    <Table>
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn className="manage__row__column">商品ID</TableHeaderColumn>
                                <TableHeaderColumn className="manage__row__column">商品名称</TableHeaderColumn>
                                <TableHeaderColumn className="manage__row__column">商品价值</TableHeaderColumn>
                                <TableHeaderColumn className="manage__row__column">总需人次</TableHeaderColumn>
                                <TableHeaderColumn className="manage__row__column">操作</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.state.display_items.map((item, index)=>(
                                <TableRow key={index} className={this.state.animation[index] ? 'manage__delete--animated' : ''}>
                                    <TableRowColumn className="manage__row__column">{item.ware_id}</TableRowColumn>
                                    <TableRowColumn className="manage__row__column">{item.ware_name}</TableRowColumn>
                                    <TableRowColumn className="manage__row__column">{item.ware_value}</TableRowColumn>
                                    <TableRowColumn className="manage__row__column">{item.max_payable_user_count}</TableRowColumn>
                                    <TableRowColumn className="manage__row__column">
                                        <IconButton touch={true} disabled={this.state.animation[index]}
                                                    onTouchTap={()=>this.handleDelete(item.ware_id, index)}>
                                            <ActionDeleteForever />
                                        </IconButton>
                                    </TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}