/**
 * Created by Think on 2017/5/20.
 */
import React from 'react';
import { Redirect } from 'react-router-dom';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TableFooter
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import TipsDialog from '../TipsDialog';
import './Pay.css';

const mock = [{
    ware_name: 'Novemser 个人写真',
    img_url: 'http://img.everstar.xyz/s/novemser.jpg',
    current_paid_user_count: 2107,
    max_payable_user_count: 2990,

    price: 12000,
    unit_price: 2,
    join_count: 1,
},{
    ware_name: 'Novemser 个人写真',
    img_url: 'http://img.everstar.xyz/s/novemser.jpg',
    current_paid_user_count: 2107,
    max_payable_user_count: 2990,

    price: 12000,
    unit_price: 2,
    join_count: 1,
}];

export default class Pay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,

            selected: [],

            finished: false,
            step_index: 0,

            cart_items: mock,

            password: '',
            password_error: null
        }
    }

    handleNext = () => {
        const {step_index} = this.state;
        this.setState({
            step_index: step_index + 1,
            finished: step_index >= 2,
        });
    };

    handlePrev = () => {
        const {step_index} = this.state;
        if (step_index > 0) {
            this.setState({step_index: step_index - 1});
        }
    };

    handleSelect = (selected) => {this.setState({selected})};

    getSum = () => {
        let sum = 0;
        if(this.state.selected instanceof Array) {
            for(let index of this.state.selected) {
                let item = this.state.cart_items[index];
                sum += item.unit_price * item.join_count;
            }
        }else if(this.state.selected === 'all') {
            for(let item of this.state.cart_items) {
                sum += item.unit_price * item.join_count;
            }
        }
       return sum;
    };

    handleClearing = () => {
        const sum = this.getSum();
        if(sum <= 0) {
            this.refs['dialog'].handleOpen('遇到了问题', '你未勾选任意商品');
        }else
            this.handleNext();
    };

    handleInputPassword = (event) => {
        this.setState({
            password: event.target.value,
            password_error: null
        })
    };

    handlePay = () => {
        const password = this.state.password;
        if(!password || password === '') {
            this.setState({
                password_error: '密码不能为空：）'
            });
            return;
        }

        this.handleNext();
        console.log('支付啦');
    };

    handleRedirect = () => {
        this.setState({redirect: '/'});
    };

    render() {
        const center = {textAlign: 'center'};
        return (
            <div className="pay__layout">
                <div className="pay__stepper">
                    <Stepper activeStep={this.state.step_index}>
                        <Step>
                            <StepLabel>提交订单</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>支付</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>等待揭晓</StepLabel>
                        </Step>
                    </Stepper>
                </div>
                <Paper zDepth={1}>
                    <div className="pay__content">
                        <div className={`pay__tab pay__tab--${this.state.step_index === 0 ? 'active' : 'deactive'}`}>
                            <Table multiSelectable={true} onRowSelection={this.handleSelect}>
                                <TableHeader>
                                    <TableRow>
                                        <TableHeaderColumn colSpan="3">商品名称</TableHeaderColumn>
                                        <TableHeaderColumn style={center}>价值(货币)</TableHeaderColumn>
                                        <TableHeaderColumn style={center}>乐透(人次)</TableHeaderColumn>
                                        <TableHeaderColumn style={center}>参与人次</TableHeaderColumn>
                                        <TableHeaderColumn style={center}>小计</TableHeaderColumn>
                                        <TableHeaderColumn style={center}>操作</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {this.state.cart_items.map((item, index) => (
                                        <TableRow key={index} selected={this.state.selected.includes(index)}>
                                            <TableRowColumn colSpan="3">
                                                <div className="pay__cart__info">
                                                    <img src={item.img_url} alt="商品图片" />
                                                    <div style={{width: '50%'}}>
                                                        <p>{item.ware_name}</p>
                                                        <p className="text-grey-color">总需：{item.max_payable_user_count}人次</p>
                                                        <p className="text-grey-color">
                                                            已完成{(item.current_paid_user_count / item.max_payable_user_count * 100).toFixed(1)}%,
                                                            剩余<span style={{color: '#66CCFF'}}>{item.max_payable_user_count - item.current_paid_user_count}</span></p>
                                                    </div>
                                                </div>
                                            </TableRowColumn>
                                            <TableRowColumn style={center}>{item.price}</TableRowColumn>
                                            <TableRowColumn style={center}>{item.unit_price} 代币</TableRowColumn>
                                            <TableRowColumn style={center}>{item.join_count}</TableRowColumn>
                                            <TableRowColumn style={center}>{item.unit_price * item.join_count} 代币</TableRowColumn>
                                            <TableRowColumn style={center}>
                                                <FlatButton label="删除"/>
                                            </TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableRowColumn>
                                            <div className="pay__cart__table__footer">
                                                <RaisedButton label="删除选中商品" secondary={true} />
                                                <p style={{margin: '0 8px 0 0'}}>合计：<span style={{color: 'red'}}>{this.getSum()}</span> 金币</p>
                                            </div>
                                        </TableRowColumn>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                            <div className="pay__operation">
                                <FlatButton style={{margin: 32}} label="返回首页" primary={true} onTouchTap={this.handleRedirect} />
                                <div style={{margin: 32, textAlign: 'center'}}>
                                    <RaisedButton label="结算" primary={true} onTouchTap={this.handleClearing} />
                                    <p className="pay__cart__hint">夺宝有风险，参与需谨慎</p>
                                </div>
                            </div>
                        </div>
                        <div className={`pay__tab vertical__center pay__tab--${this.state.step_index === 1 ? 'active' : 'deactive'}`}>
                            <div style={{textAlign: 'center', margin: 32}}>
                                总需支付： <span style={{color: 'red'}}>{this.getSum()}</span> 金币
                            </div>
                            <div className="pay__input__password">
                                <TextField
                                    value={this.state.password}
                                    onChange={this.handleInputPassword}
                                    errorText={this.state.password_error}
                                    style={{margin: '0 auto'}}
                                    floatingLabelText="密码"
                                />
                            </div>
                            <div className="pay__operation">
                                <FlatButton style={{margin: 32}} label="后退" primary={true} onTouchTap={this.handlePrev} />
                                <div style={{margin: 32, textAlign: 'center'}}>
                                    <RaisedButton label="支付" primary={true} onTouchTap={this.handlePay} />
                                    <p className="pay__cart__hint">夺宝有风险，参与需谨慎</p>
                                </div>
                            </div>
                        </div>
                        <div className={`pay__tab vertical__center pay__tab--${this.state.step_index === 2 ? 'active' : 'deactive'}`}>
                            <p style={{margin: 16}}>订单支付成功</p>
                            <RaisedButton label="点此继续乐透" primary={true} onTouchTap={this.handleRedirect} />
                        </div>
                    </div>
                </Paper>
                {this.state.redirect ? <Redirect to={this.state.redirect} /> : null}
                <TipsDialog ref="dialog" />
            </div>
        );
    }
}
