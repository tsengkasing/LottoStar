/**
 * Created by Think on 2017/5/18.
 */
import React from 'react';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

import Auth from '../Auth';
import API from '../API';
import TipsDialog from '../TipsDialog';
import './Main.css';

let items = [];
for(let i = 0; i < 20; i++) {
    let ran = Math.random();
    items.push({
        user_avatar_url: `http://img.everstar.xyz/${ran > 0.5 ? 'everstar.jpg' : 'novemser.jpg'}` ,
        user_name: 'everstar',
        date: '2017-05-19',
        ware_name: 'Novemser 个人写真' + ran.toFixed(2),
        current_paid_user_count: (ran * 100).toFixed(0),
        max_payable_user_count: (ran * 10000).toFixed(0)
    });
}

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,

            hot_items: new Array(8).fill({
                ware_id: 1,
                img_url: 'http://img.everstar.xyz/s/novemser.jpg',
                ware_name: 'Novemser 个人写真',
                max_payable_user_count: 2900,
                current_paid_user_count: 939,
            }),

            lotto_items: items,

            all_items: new Array(10).fill({
                ware_id: 2,
                img_url: 'http://img.everstar.xyz/s/novemser.jpg',
                ware_name: 'Novemser 个人写真',
                max_payable_user_count: 2900,
                current_paid_user_count: 939,
            })
        }
    }

    handleLoadWares = () => {
        fetch(API.Ware, {
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
            if(data && data.__status) {
                if(data.__status === 401) {
                    API.refreshToken((err)=>{
                        if(err) {
                            window.__clear();
                            this.refs['dialog'].handleOpen('失败', err);
                        }
                        else this.refs['dialog'].handleOpen('失败', '请重试');
                    });
                }else if(data.__status >= 500) {
                    console.error('服务器故障~');
                }
            }
            else {
                //加载成功
                console.log(data);
            }
        }).catch((e) => {
            console.error('获取数据失败！');
        });
    };

    handleLotto = (ware_id) => {
        //加到购物车
        //...

        if(!Auth.getLoginStatus()) {
            this.refs['dialog'].handleOpen('成为乐透星的第一步', '请先登录：）');
        }else
            this.handleRedirect(0);
    };

    handleRedirect = (target, id) => {
        let redirect = '/';
        switch (target) {
            case 0: redirect = '/pay';break;
            case 1: redirect = `/ware/${id}`;break;
            default: break;
        }
        this.setState({ redirect });
    };

    componentWillMount() {
        this.handleLoadWares();

        window.__timer = setInterval(()=>{
            let lotto_items = this.state.lotto_items;
            lotto_items = lotto_items.slice(1).concat(lotto_items.slice(0, 1));
            this.setState({lotto_items});
            console.log('...');
        }, 3000);
    }

    componentWillUnmount() {
        clearInterval(window.__timer);
    }

    render() {
        return (
            <div className="main-layout">
                <div className="main-layout-row">
                    <div className="main-hot__border background__mask--filled">
                        <div className="subHeader">最热商品</div>
                        <div className="main__items">
                            {this.state.hot_items.map((item, index)=>(
                                <div className="main__item" key={index}>
                                    <div style={{textAlign: 'center'}} onClick={() => this.handleRedirect(1, item.ware_id)}>
                                        <img className="item-pic" src={item.img_url} alt="" />
                                    </div>
                                    <div className="main__item__info" onClick={() => this.handleRedirect(1, item.ware_id)}>
                                        <p style={{lineHeight: '26px', margin: 0}}>{item.ware_name}</p>
                                        <p className="text-grey-color text-p-min-margin">总需：{item.max_payable_user_count} 人次</p>
                                        <div>
                                            <LinearProgress mode="determinate" value={item.current_paid_user_count} max={item.max_payable_user_count} min={0} />
                                        </div>
                                        <div className="main__item_progress__text">
                                            <div>
                                                <p className="text-p-min-margin">{item.current_paid_user_count}</p>
                                                <p className="text-grey-color text-p-min-margin">已参与人次</p>
                                            </div>
                                            <div style={{textAlign: 'right'}}>
                                                <p className="text-p-min-margin">{item.max_payable_user_count - item.current_paid_user_count}</p>
                                                <p className="text-grey-color text-p-min-margin">剩余人次</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="main__item__btn">
                                        <RaisedButton label="乐透" secondary={true} buttonStyle={{width: 160}} onTouchTap={() =>this.handleLotto(item.ware_id)}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="latest-lotto background__mask--filled">
                        <p className="latest-lotto-header">最新乐透星</p>
                        <div className="latest-lotto-items">
                            {this.state.lotto_items.map((item, index) => (
                                <div className="latest-lotto-item" key={index}>
                                    <img className="latest-lotto-item-pic" src={item.user_avatar_url} alt="头像"/>
                                    <div className="latest-lotto-item-info">
                                        <div className="latest-lotto-item-info-separate">
                                            <div>{item.user_name}</div>
                                            <div>{item.date}</div>
                                        </div>
                                        <div style={{margin: '8px 0 0', overflow: 'hidden', height: 16}}>
                                            <span style={{color: 'red'}}>{`${item.current_paid_user_count}人次`}</span>
                                            {`乐透中${item.ware_name}`}</div>
                                        <div style={{margin: '8px 0 0'}}>
                                            {`总需：${item.max_payable_user_count} 人次`}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="latest-lotto-footer">看谁的运气好~</p>
                    </div>
                </div>

                <div className="main-all background__mask--filled">
                    <div className="subHeader">所有商品</div>
                    <div className="main__items">
                        {this.state.all_items.map((item, index)=>(
                            <div className="main__item--all" key={index}>
                                <div style={{textAlign: 'center'}} onClick={() => this.handleRedirect(1, item.ware_id)}>
                                    <img className="item-pic" src={item.img_url} alt="商品图片" />
                                </div>
                                <div className="main__item__info" onClick={() => this.handleRedirect(1, item.ware_id)}>
                                    <p style={{lineHeight: '26px', margin: 0}}>{item.ware_name}</p>
                                    <p className="text-grey-color text-p-min-margin">总需：{item.max_payable_user_count} 人次</p>
                                    <div>
                                        <LinearProgress mode="determinate" value={item.current_paid_user_count} max={item.max_payable_user_count} min={0} />
                                    </div>
                                    <div className="main__item_progress__text">
                                        <div>
                                            <p className="text-p-min-margin">{item.current_paid_user_count}</p>
                                            <p className="text-grey-color text-p-min-margin">已参与人次</p>
                                        </div>
                                        <div style={{textAlign: 'right'}}>
                                            <p className="text-p-min-margin">{item.max_payable_user_count - item.current_paid_user_count}</p>
                                            <p className="text-grey-color text-p-min-margin">剩余人次</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="main__item__btn">
                                    <RaisedButton label="乐透" secondary={true} buttonStyle={{width: 160}} onTouchTap={() =>this.handleLotto(item.ware_id)}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {this.state.redirect ? <Redirect to={this.state.redirect} /> : null}
                <TipsDialog ref="dialog" />
            </div>
        );
    }


}