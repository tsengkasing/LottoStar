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
            hot_items: new Array(12).fill({
                img_url: 'http://img.everstar.xyz/novemser.jpg',
                item_name: 'Novemser 个人写真',
                need_lotto: 2900,
                join_lotto: 939,
            })
        }
    }




    render() {
        return (
            <div>
                <div className="main-hot__border">
                    <div className="subHeader">最热商品</div>
                    <div className="main-hot__items">
                        {this.state.hot_items.map((item, index)=>(
                            <div className="main-hot__item" key={index}>
                                <div style={{textAlign: 'center'}}><img className="item-pic" src={item.img_url} alt="商品图片" /></div>
                                <div className="main-hot__item__info">
                                    <p style={{lineHeight: '26px', margin: 0}}>{item.item_name}</p>
                                    <p className="text-grey-color">总需：{item.need_lotto} 人次</p>
                                    <div>
                                        <LinearProgress mode="determinate" value={item.join_lotto} max={item.need_lotto} min={0} />
                                    </div>
                                    <div className="main-hot__item_progress__text">
                                        <div>
                                            <p>{item.join_lotto}</p>
                                            <p className="text-grey-color">已参与人次</p>
                                        </div>
                                        <div style={{textAlign: 'right'}}>
                                            <p>{item.need_lotto - item.join_lotto}</p>
                                            <p className="text-grey-color">剩余人次</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="main-hot__item__btn">
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