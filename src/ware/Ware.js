/**
 * Created by Think on 2017/5/20.
 */
import React from 'react';
import { Redirect } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

import API from '../API';
import Auth from '../Auth';
import TipsDialog from '../TipsDialog';
import './Ware.css';

export default class Ware extends React.Component {

    constructor(props){
        super(props);
        let ware_id = parseInt(this.props.match.params.id, 10);
        if(isNaN(ware_id)) window.location.pathname = '/';
        this.state = {
            ware_id: ware_id,

            current_picture_index: 0,
            ware_pictures: [
                'http://duobaozhuanqu.com/attachment/image/201605/30_777498da870542bc9b5ab4761f8cf9e.jpg',
                'http://duobaozhuanqu.com/attachment/image/201605/30_3e9bad4bd31a263fe77594168faa84f.jpg',
                'http://duobaozhuanqu.com/attachment/image/201605/30_ac57cf631dddb4c65a7c1cad49a2a74.jpg',
                'http://duobaozhuanqu.com/attachment/image/201605/30_a7d63597d6840f4ee76aee960ec98fe.jpg',
            ],
            ware_name: 'Apple/苹果 12.9 英寸 iPad Pro 128G',
            ware_detail_info: 'iPad Pro 128G WIFI版，颜色随机。不含Apple Pencil与Smart Keyboard。一个广阔的空间 任你尽情挥洒大创意。',

            current_paid_user_count: 1000,
            max_payable_user_count: 2900,

            join_price: 1,
        }
    }

    handleInput = (event) => {
        let value = event.target.value, max = this.state.max_payable_user_count - this.state.current_paid_user_count;
        if(value < 1) value = 1;
        else if(value > max) value = max;
        this.setState({join_price: parseInt(value, 10)});
    };

    handleLotto = () => {
        if(!Auth.getLoginStatus()) {
            this.refs['dialog'].handleOpen('成为乐透星的第一步', '请先登录：）');
        }else
            this.handleRedirect();
    };

    handleAddToCart = () => {
        if(!Auth.getLoginStatus()) {
            this.refs['dialog'].handleOpen('成为乐透星的第一步', '请先登录：）');
            return;
        }

        //加到购物车
        //...

        this.refs['dialog'].handleOpen('买买买', '成功加入到清单中：）');
    };

    handleRedirect = () => {this.setState({redirect: '/pay'})};


    handleLoadLotteryInfo = () => {
        fetch(API.DetailedLottery + '/' + this.state.ware_id, {
            method: 'GET',
            headers: new Headers({
                'dataType': 'json',
                'Content-Type': 'X-WWW-FORM-URLENCODED'
            })
        }).then((response) => {
            if(response.status === 200) {
                //加载成功

            }else if(response.status >= 500) {
                console.error('服务器故障~');
                this.refs['dialog'].handleOpen('失败', '服务器故障');
            }
        }).catch((e) => {
            console.error('获取数据失败！', e);
        });
    };

    componentDidMount() {
        this.handleLoadLotteryInfo();
    }

    render() {
        return (
            <Paper zDepth={1}>
                <div className="ware__layout">
                    <div className="ware__img">
                        <div className="ware__img--display" style={{background: `url(${this.state.ware_pictures[this.state.current_picture_index]})
                         no-repeat center`}} />
                        <div className="ware__img--list">
                            {this.state.ware_pictures.map((item, index) => (
                                <div className="ware__img--list--single" key={index}
                                     onMouseOver={() => {this.setState({current_picture_index:index})}}>
                                    <img src={item} alt="" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="ware__info">
                        <p className="ware__info__title">{this.state.ware_name}</p>
                        <p className="ware__info__detail">{this.state.ware_detail_info}</p>

                        <p style={{fontSize: 20}}> >> {1.00.toFixed(2)} <span style={{color: 'red'}}>代币</span> 乐透</p>

                        <div className="ware__info__progress__bar">
                            <div style={{width: '60%', padding: '12px 0 0 0'}}>
                                <LinearProgress mode="determinate" value={this.state.current_paid_user_count} max={this.state.max_payable_user_count} min={0} />
                                <div className="ware__info__progress__text">
                                    <span>总需人次{this.state.max_payable_user_count}</span>
                                    <span>剩余人次{this.state.max_payable_user_count - this.state.current_paid_user_count}</span>
                                </div>
                            </div>
                            <span style={{width: 128, margin: '0 16px'}}>已完成 {this.state.max_payable_user_count / this.state.current_paid_user_count} %</span>
                        </div>

                        <div className="ware__pay">
                            <TextField
                                type="number"
                                defaultValue="1"
                                floatingLabelText="参与人次"
                                onChange={this.handleInput}
                                value={this.state.join_price}
                            /><span className="ware__pay__hint">多参与1人次，获奖机会翻倍！</span>
                            <br />
                            <div style={{margin: '12px 0'}}>
                                <RaisedButton label="立即乐透" primary={true} onTouchTap={this.handleLotto}
                                              buttonStyle={{width: 128}} style={{margin: '0 8px 0 0'}} />
                                <RaisedButton label="加入清单" secondary={true} onTouchTap={this.handleAddToCart}
                                              buttonStyle={{width: 128}} />
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.redirect ? <Redirect to={this.state.redirect} /> : null}
                <TipsDialog ref="dialog" />
            </Paper>
        );
    }
}