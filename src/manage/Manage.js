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
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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
            input: [],

            to_create: false
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
                    return null;
                })
            });
        }else {
            this.setState({
                input: input,
                display_items: this.state.items
            });
        }
    };

    handleSelectToAddItem = (event, index, value) => {
        alert(value);
    };

    handleAddItem = () => {
        this.setState({to_create: false});
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
                    <div className="manage__add__border" style={{height: this.state.to_create ? 100 : 0}}>
                        <SelectField
                            floatingLabelText="商品"
                            onChange={this.handleSelectToAddItem}
                        >
                            <MenuItem value={1} primaryText="Never" />
                            <MenuItem value={2} primaryText="Every Night" />
                            <MenuItem value={3} primaryText="Weeknights" />
                            <MenuItem value={4} primaryText="Weekends" />
                            <MenuItem value={5} primaryText="Weekly" />
                        </SelectField>
                        <RaisedButton label="添加" primary={true} onTouchTap={this.handleAddItem}/>
                    </div>
                </Paper>
                <Paper>
                    <Table>
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn className="manage__row__column" colSpan="2">商品ID</TableHeaderColumn>
                                <TableHeaderColumn className="manage__row__column" colSpan="3">商品名称</TableHeaderColumn>
                                <TableHeaderColumn className="manage__row__column" colSpan="2">商品价值</TableHeaderColumn>
                                <TableHeaderColumn className="manage__row__column" colSpan="2">总需人次</TableHeaderColumn>
                                <TableHeaderColumn className="manage__row__column">操作</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.state.display_items.map((item, index)=>(
                                <TableRow key={index} className={this.state.animation[index] ? 'manage__delete--animated' : ''}>
                                    <TableRowColumn className="manage__row__column" colSpan="2">{item.ware_id}</TableRowColumn>
                                    <TableRowColumn className="manage__row__column" colSpan="3">{item.ware_name}</TableRowColumn>
                                    <TableRowColumn className="manage__row__column" colSpan="2">{item.ware_value}</TableRowColumn>
                                    <TableRowColumn className="manage__row__column" colSpan="2">{item.max_payable_user_count}</TableRowColumn>
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
                <div className="manage__add__btn">
                    <FloatingActionButton onTouchTap={()=>this.setState({to_create:true})}>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
            </div>
        );
    }
}