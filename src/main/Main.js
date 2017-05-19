/**
 * Created by Think on 2017/5/18.
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

import './Main.css';

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hot_items: new Array(8).fill({
                img_url: 'http://img.everstar.xyz/s/novemser.jpg',
                item_name: 'Novemser 个人写真',
                need_lotto: 2900,
                join_lotto: 939,
            }),

            lotto_items: new Array(7).fill({
                user_avatar_url: 'http://img.everstar.xyz/everstar.jpg',
                user_name: 'everstar',
                date: '2017-05-19',
                item_name: 'Novemser 个人写真',
                join_lotto: 6,
                need_lotto: 2900
            }),

            all_items: new Array(10).fill({
                img_url: 'http://img.everstar.xyz/s/novemser.jpg',
                item_name: 'Novemser 个人写真',
                need_lotto: 2900,
                join_lotto: 939,
            })
        }
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
                                    <div style={{textAlign: 'center'}}>
                                        <img className="item-pic" src={item.img_url} />
                                        {/*<div className="item-pic"*/}
                                             {/*style={{background: `url(${item.img_url}) center`}} />*/}
                                    </div>
                                    <div className="main__item__info">
                                        <p style={{lineHeight: '26px', margin: 0}}>{item.item_name}</p>
                                        <p className="text-grey-color text-p-min-margin">总需：{item.need_lotto} 人次</p>
                                        <div>
                                            <LinearProgress mode="determinate" value={item.join_lotto} max={item.need_lotto} min={0} />
                                        </div>
                                        <div className="main__item_progress__text">
                                            <div>
                                                <p className="text-p-min-margin">{item.join_lotto}</p>
                                                <p className="text-grey-color text-p-min-margin">已参与人次</p>
                                            </div>
                                            <div style={{textAlign: 'right'}}>
                                                <p className="text-p-min-margin">{item.need_lotto - item.join_lotto}</p>
                                                <p className="text-grey-color text-p-min-margin">剩余人次</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="main__item__btn">
                                        <RaisedButton label="乐透" secondary={true} buttonStyle={{width: 160}}  />
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
                                            <span style={{color: 'red'}}>{`${item.join_lotto}人次`}</span>
                                            {`乐透中${item.item_name}`}</div>
                                        <div style={{margin: '8px 0 0'}}>
                                            {`总需：${item.need_lotto} 人次`}
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
                                <div style={{textAlign: 'center'}}><img className="item-pic" src={item.img_url} alt="商品图片" /></div>
                                <div className="main__item__info">
                                    <p style={{lineHeight: '26px', margin: 0}}>{item.item_name}</p>
                                    <p className="text-grey-color text-p-min-margin">总需：{item.need_lotto} 人次</p>
                                    <div>
                                        <LinearProgress mode="determinate" value={item.join_lotto} max={item.need_lotto} min={0} />
                                    </div>
                                    <div className="main__item_progress__text">
                                        <div>
                                            <p className="text-p-min-margin">{item.join_lotto}</p>
                                            <p className="text-grey-color text-p-min-margin">已参与人次</p>
                                        </div>
                                        <div style={{textAlign: 'right'}}>
                                            <p className="text-p-min-margin">{item.need_lotto - item.join_lotto}</p>
                                            <p className="text-grey-color text-p-min-margin">剩余人次</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="main__item__btn">
                                    <RaisedButton label="乐透" secondary={true} buttonStyle={{width: 160}}  />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }


}