/**
 * Created by Think on 2017/5/19.
 */
import React from 'react';
import Paper from 'material-ui/Paper';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {List, ListItem} from 'material-ui/List';
import Badge from 'material-ui/Badge';
import LinearProgress from 'material-ui/LinearProgress';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import TipsDialog from '../TipsDialog';
import './Home.css';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: 4,

            charge_amount: 1,

            lotto_record: new Array(6).fill({
                item_name: 'Novemser 个人写真',
                img_url: 'http://img.everstar.xyz/s/novemser.jpg',
                join_lotto: 2107,
                need_lotto: 2990,
                join_lotto_self: 666,
                status: '正在进行',
                time: '2017-05-19'
            }),

            lucky_record: new Array(2).fill({
                item_name: 'Novemser 个人写真',
                img_url: 'http://img.everstar.xyz/s/novemser.jpg',
                join_lotto: 2107,
                need_lotto: 2990,
                status: '已收货',
            }),

            messages: new Array(13).fill({
                title: '2017限定 粘土人 Novemser, 开启预订！',
                time: '2017-05-19',
                content: '2017限定 粘土人 Novemser, 限量预订开启！速来预订'
            }),

            charge_record: new Array(13).fill({
                time: '2017-05-19',
                serial_number: '20170519205008249630',
                money: 666,
                status: '成功'
            })
        }
    }

    handleSwitch = (tab) => {
        this.setState({
            tab: tab
        })
    };

    handleChargeSelect = (event, index, value) => this.setState({charge_amount: value});

    handleCharge = () => {
        const amount = this.state.charge_amount;
        this.refs['tips'].handleOpen('充值成功！', `成功充值￥${amount}`, () => {});
    };

    render() {
        return (
            <div className="home-layout edge">
                <div>
                    <Paper className="home__menu">
                        <List style={{width: 240}}>
                            <ListItem primaryText="个人信息" rightIcon={<ActionInfo />} onTouchTap={() => this.handleSwitch(0)} />
                            <ListItem primaryText="乐透记录" rightIcon={<ActionInfo />} onTouchTap={() => this.handleSwitch(1)}/>
                            <ListItem primaryText="幸运记录" rightIcon={<ActionInfo />} onTouchTap={() => this.handleSwitch(2)}/>
                            <ListItem primaryText="消息通知" rightIcon={<Badge
                                badgeContent={10}
                                primary={true}
                                badgeStyle={{top: 12, right: 12}}
                                style={{top: -10, right: -8, margin: 0}}
                            ><NotificationsIcon /></Badge>} onTouchTap={() => this.handleSwitch(3)} />
                            <ListItem primaryText="充值" onTouchTap={() => this.handleSwitch(4)}/>
                        </List>
                    </Paper>
                </div>
                <div className="home__content">
                    <Paper zDepth={1} style={{backgroundColor: 'rgba(255, 255, 255, 0)'}}>
                        <div className={`home__tab background__mask--filled
                        ${this.state.tab === 0 ? 'home__content--active' : 'home__content--deactive'}`}>
                            <div className="subHeader">个人信息</div>
                            <div className="home__information">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>头像</th>
                                            <td><img className="home__avatar" src="http://img.everstar.xyz/novemser.jpg" alt="头像" /></td>
                                        </tr>
                                        <tr>
                                            <th>昵称</th>
                                            <td>think+★</td>
                                        </tr>
                                        <tr>
                                            <th>ID</th>
                                            <td>10412</td>
                                        </tr>
                                        <tr>
                                            <th>手机号</th>
                                            <td>11111111111</td>
                                        </tr>
                                        <tr>
                                            <th>余额</th>
                                            <td>￥233</td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/*<div className="home__information__content">*/}
                                    {/*<span>头像: </span>*/}
                                    {/*<img className="home__avatar" src="http://img.everstar.xyz/novemser.jpg" alt="头像" />*/}
                                {/*</div>*/}
                                {/*<div className="home__information__content"><span>ID:</span>0001</div>*/}
                                {/*<div className="home__information__content"><span>电话号码:</span>11111111111</div>*/}
                                {/*<div className="home__information__content"><span>余额:</span>¥233</div>*/}
                            </div>
                        </div>
                        <div className={`home__record home__tab background__mask--filled
                        ${this.state.tab === 1 ? 'home__content--active' : 'home__content--deactive'}`}>
                            <div className="subHeader">乐透记录</div>
                            <Table>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn colSpan="3">商品名称</TableHeaderColumn>
                                        <TableHeaderColumn>参与人次</TableHeaderColumn>
                                        <TableHeaderColumn>乐透状态</TableHeaderColumn>
                                        <TableHeaderColumn>乐透时间</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {this.state.lotto_record.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableRowColumn colSpan="3">
                                                <div className="home__record__info">
                                                    <img src={item.img_url} alt="商品图片" />
                                                    <div style={{width: '50%'}}>
                                                        <p>{item.item_name}</p>
                                                        <p className="text-grey-color">总需：{item.need_lotto}人次</p>
                                                        <div>
                                                            <LinearProgress mode="determinate" value={item.join_lotto} max={item.need_lotto} min={0} />
                                                        </div>
                                                        <p className="text-grey-color">
                                                            已完成{(item.join_lotto / item.need_lotto * 100).toFixed(1)}%,
                                                            剩余<span style={{color: '#66CCFF'}}>{item.need_lotto - item.join_lotto}</span></p>
                                                    </div>
                                                </div>
                                            </TableRowColumn>
                                            <TableRowColumn>{item.join_lotto_self}人次</TableRowColumn>
                                            <TableRowColumn>{item.status}</TableRowColumn>
                                            <TableRowColumn>{item.time}</TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className={`home__record home__tab background__mask--filled
                         ${this.state.tab === 2 ? 'home__content--active' : 'home__content--deactive'}`}>
                            <div className="subHeader">幸运记录</div>
                            <Table>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn colSpan="3">商品信息</TableHeaderColumn>
                                        <TableHeaderColumn>发货状态</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {this.state.lucky_record.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableRowColumn colSpan="3">
                                                <div className="home__record__info">
                                                    <img src={item.img_url} alt="商品图片" />
                                                    <div style={{width: '50%'}}>
                                                        <p>{item.item_name}</p>
                                                        <p className="text-grey-color">总需：{item.need_lotto}人次</p>
                                                        <div>
                                                            <LinearProgress mode="determinate" value={item.join_lotto} max={item.need_lotto} min={0} />
                                                        </div>
                                                        <p className="text-grey-color">
                                                            已完成{(item.join_lotto / item.need_lotto * 100).toFixed(1)}%,
                                                            剩余<span style={{color: '#66CCFF'}}>{item.need_lotto - item.join_lotto}</span></p>
                                                    </div>
                                                </div>
                                            </TableRowColumn>
                                            <TableRowColumn>{item.status}</TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className={`home__message background__mask--half home__tab ${this.state.tab === 3 ? 'home__content--active' : 'home__content--deactive'}`}>
                            <div className="subHeader">消息通知</div>
                            <div style={{margin: 16}} className="background__mask">
                                {this.state.messages.map((item, index) => (
                                    <Paper className="home__message__item" key={index} zDepth={1}>
                                        <div style={{fontWeight: 'bold'}}>
                                            {item.title}&nbsp;&nbsp;&nbsp;
                                            <span style={{fontWeight: 'normal'}} className="text-grey-color">{item.time}</span>
                                        </div>
                                        <div>
                                            <p className="home__message__item__content">{item.content}</p>
                                        </div>
                                    </Paper>
                                ))}
                            </div>
                        </div>
                        <div className={`home__charge background__mask--filled home__tab ${this.state.tab === 4 ? 'home__content--active' : 'home__content--deactive'}`}>
                            <div className="subHeader">充值</div>
                            <div className="home__charge__field">
                                <SelectField
                                    floatingLabelText="充值金额"
                                    value={this.state.charge_amount}
                                    onChange={this.handleChargeSelect}
                                >
                                    <MenuItem value={1} primaryText="1元" />
                                    <MenuItem value={16} primaryText="16元" />
                                    <MenuItem value={32} primaryText="32元" />
                                    <MenuItem value={128} primaryText="128元" />
                                    <MenuItem value={256} primaryText="256元" />
                                    <MenuItem value={512} primaryText="512元" />
                                    <MenuItem value={1024} primaryText="1024元" />
                                    <MenuItem value={2048} primaryText="2048元" />
                                </SelectField>
                                <RaisedButton primary={true} label="充值" onTouchTap={this.handleCharge} />
                            </div>
                            <Table>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn>充值时间</TableHeaderColumn>
                                        <TableHeaderColumn>交易号</TableHeaderColumn>
                                        <TableHeaderColumn>金额(元)</TableHeaderColumn>
                                        <TableHeaderColumn>获得代币</TableHeaderColumn>
                                        <TableHeaderColumn>充值状态</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {this.state.charge_record.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableRowColumn>{item.time}</TableRowColumn>
                                            <TableRowColumn>{item.serial_number}</TableRowColumn>
                                            <TableRowColumn>{item.money.toFixed(2)}</TableRowColumn>
                                            <TableRowColumn>{item.money.toFixed(2)}</TableRowColumn>
                                            <TableRowColumn>{item.status}</TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Paper>
                </div>
                <TipsDialog ref="tips" />
            </div>
        );
    }
}