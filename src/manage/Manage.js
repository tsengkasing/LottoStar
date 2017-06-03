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
    TableFooter
} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import TipsDialog from '../TipsDialog';
import API from '../API';
import './Manage.css';

export default class Manage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            display_items: [],
            animation: [],
            input: [],

            to_create: false,

            selected: [],
            wares: [],
            current_page: 0
        }
    }

    componentDidMount() {
        this.handleLoadAllLottery();
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

    handleSelectItemToLotto = (selected) => {
        this.setState({selected});
    };

    lottery = (ware_id) => {
        return new Promise((resolve, reject) => {
            fetch(API.Lottery, {
                method: 'POST',
                redirect: 'manual',
                cache: 'no-cache',
                body: '=' + ware_id,
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + API.AccessToken
                })
            }).then((response) => {
                if(response.status === 200) return response.json();
                else return {__status: response.status};
            }).then((data) => {
                if(data && data.__status && data.__status >= 500) {
                    reject('服务器故障~');
                }
                else {
                    //上架成功
                    resolve();
                }
            }).catch((e) => {
                console.error('获取数据失败！' ,e);
            });
        });
    };

    handleAddItem = async () => {
        let to_add = [];
        if(Array.isArray(this.state.selected)) {
            for(let index of this.state.selected) {
                to_add.push(this.state.wares[index].id_ware);
            }
        }else if(this.state.selected === 'all') {
            for(let item of this.state.wares) {
                to_add.push(item.id_ware);
            }
        }

        try {
            for(let ware_id of to_add) {
                await this.lottery(ware_id);
            }
            this.refs['dialog'].handleOpen('成功', '上架成功');
        }catch(e) {
            this.refs['dialog'].handleOpen('服务器故障', '获取所有商品信息失败');
        }
        this.setState({to_create: false});
        this.handleLoadAllLottery();
    };

    handleToCreateLottery = () => {
        this.setState({
            to_create: true,
            current_page: 0
        }, ()=>this.handleLoadWares(this.state.current_page));
    };

    handlePrevPage = () => {
        let page = this.state.current_page;
        if(page > 0) {
            this.handleLoadWares(page - 1);
            this.setState({current_page: page - 1})
        }
    };

    handleNextPage = () => {
        let page = this.state.current_page;
        this.handleLoadWares(page + 1);
        this.setState({current_page: page + 1})
    };

    handleLoadAllLottery = () => {
        fetch(API.AllLottery, {
            method: 'GET',
            redirect: 'manual',
            cache: 'no-cache',
            headers: new Headers({
                'dataType': 'json'
            })
        }).then((response) => {
            if(response.status === 200) return response.json();
            else return {__status: response.status};
        }).then((data) => {
            if(data && data.__status && data.__status >= 500) {
                console.error('服务器故障~');
                this.refs['dialog'].handleOpen('服务器故障', '获取乐透记录失败');
            }
            else {
                //加载成功
                this.setState({
                    items: data,
                    display_items: data,
                    animation: new Array(data.length).fill(false)
                });
            }
        }).catch((e) => {
            console.error('获取数据失败！');
        });
    };

    handleLoadWares = (page_index) => {
        fetch(API.AllWares + `?pageSize=${10}&pageIndex=${page_index}`, {
            method: 'GET',
            redirect: 'manual',
            cache: 'no-cache',
            headers: new Headers({
                'dataType': 'json',
                'Authorization': 'Bearer ' + API.AccessToken
            })
        }).then((response) => {
            if(response.status === 200) return response.json();
            else return {__status: response.status};
        }).then((data) => {
            if(data && data.__status && data.__status >= 500) {
                console.error('服务器故障~');
                this.refs['dialog'].handleOpen('失败', '服务器故障');
            }
            else {
                //加载成功
                this.setState({wares: data});
            }
        }).catch((e) => {
            console.error('获取数据失败！', e);
        });
    };

    render(){
        const center = {textAlign: 'center'};
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
                    <div className="manage__add__border" style={{height: this.state.to_create ? 1580 : 0}}>
                        <Table multiSelectable={true} onRowSelection={this.handleSelectItemToLotto}>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn colSpan="1" style={center}>商品ID</TableHeaderColumn>
                                    <TableHeaderColumn colSpan="1">商品缩略图</TableHeaderColumn>
                                    <TableHeaderColumn colSpan="2">商品名称</TableHeaderColumn>
                                    <TableHeaderColumn colSpan="1" style={center}>商品价值</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {this.state.wares.map((item, index) => (
                                    <TableRow key={index} selected={this.state.selected.includes(index)}>
                                        <TableRowColumn colSpan="1" style={center}>{item.id_ware}</TableRowColumn>
                                        <TableRowColumn colSpan="1">
                                            <div className="manage__ware__img__border">
                                                <img className="manage__ware__img" alt="找不到图片" src={item.thumbnail_url} />
                                            </div>
                                        </TableRowColumn>
                                        <TableRowColumn colSpan="2">{item.ware_name}</TableRowColumn>
                                        <TableRowColumn colSpan="1" style={center}>{item.price}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableRowColumn>
                                        <div className="manage__table__footer">
                                            <RaisedButton label="将选中商品上架" primary={true} onTouchTap={this.handleAddItem}/>
                                            <div>
                                                <span style={{margin: 32}}> 第{this.state.current_page + 1}页 </span>
                                                {this.state.current_page <= 0 ? null :
                                                    <RaisedButton style={{margin: '0 8px'}} label="上一页"
                                                                  primary={true} onTouchTap={this.handlePrevPage}/>}
                                                <RaisedButton label="下一页" primary={true} onTouchTap={this.handleNextPage}/>
                                            </div>
                                        </div>
                                    </TableRowColumn>
                                </TableRow>
                            </TableFooter>
                        </Table>

                    </div>
                </Paper>
                <Paper>
                    <Table>
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn className="manage__row__column" colSpan="1">乐透ID</TableHeaderColumn>
                                <TableHeaderColumn className="manage__row__column" colSpan="2">商品ID</TableHeaderColumn>
                                <TableHeaderColumn className="manage__row__column" colSpan="3">商品名称</TableHeaderColumn>
                                <TableHeaderColumn className="manage__row__column" colSpan="2">商品价值</TableHeaderColumn>
                                <TableHeaderColumn className="manage__row__column" colSpan="1">总需人次</TableHeaderColumn>
                                <TableHeaderColumn className="manage__row__column">操作</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.state.display_items.map((item, index)=>(
                                <TableRow key={index} className={this.state.animation[index] ? 'manage__delete--animated' : ''}>
                                    <TableRowColumn className="manage__row__column" colSpan="1">{item.id_lottery_record}</TableRowColumn>
                                    <TableRowColumn className="manage__row__column" colSpan="2">{item.ware_id}</TableRowColumn>
                                    <TableRowColumn className="manage__row__column" colSpan="3">{item.ware_name}</TableRowColumn>
                                    <TableRowColumn className="manage__row__column" colSpan="2">￥{item.max_payable_user_count}</TableRowColumn>
                                    <TableRowColumn className="manage__row__column" colSpan="1">{item.max_payable_user_count}</TableRowColumn>
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
                    <FloatingActionButton onTouchTap={()=>this.handleToCreateLottery()}>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
                <TipsDialog ref="dialog" />
            </div>
        );
    }
}