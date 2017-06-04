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
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import UploadAvatar from './UploadAvatar';
import TipsDialog from '../TipsDialog';
import Auth from '../Auth';
import './Home.css';
import HomeInfoGetter from './HomeInfoGetter';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: 0,

            charge_amount: 1,

            user_info: {
                avatar_url: 'http://img.everstar.xyz/default.jpg',
                nick_name: 'nobody',
                iduser_account: '0001',
                tel_num: '18200000000',
                balance: 233
            },

            lotto_record: [],

            lucky_record: [],

            messages: [],
            unread_count: 0,

            charge_record: []
        }
    }

    handleSwitch = (tab) => this.setState({tab});

    handleReadMessage = (message_id, index) => {

        //发送给后台 标记已读
        HomeInfoGetter.UserReadMessages(message_id).then(() => {
            //页面直接修改为已读
            let { messages, unread_count} = this.state;
            messages[index].has_been_read = 1;
            unread_count--;
            this.setState({messages, unread_count});
        });
    };

    handleChargeSelect = (event, index, value) => this.setState({charge_amount: value});

    handleCharge = () => {
        const amount = this.state.charge_amount;
        HomeInfoGetter.UserCharge(amount).then((record) => {
            let charge_record = this.state.charge_record.slice();
            charge_record.push(record);
            const user_info = Object.assign(this.state.user_info, {balance: record.rest_value});
            this.setState({charge_record, user_info});
            this.refs['tips'].handleOpen('充值成功！', `成功充值￥${amount}`);
        });
    };

    loadUserInfo = () => {
        HomeInfoGetter.getUserInfo(Auth.getUserInfo().username).then((info)=>{
            this.setState({user_info: info})
        });
    };

    componentDidMount() {
        this.loadUserInfo();

        HomeInfoGetter.getUserOnGoingLottery().then((lotto_record) => {
            this.setState({lotto_record});
        });

        HomeInfoGetter.getUserLuckyLottery().then((lucky_record) => {
            this.setState({lucky_record});
        });

        HomeInfoGetter.getUserMessages().then((messages) => {
            let unread_count = 0;
            for(let message of messages) {
                if(message.has_been_read === false) unread_count++;
            }
            this.setState({messages, unread_count});
        });

        HomeInfoGetter.getUserChargeRecord().then((charge_record) => {
            this.setState({charge_record});
        });
    }

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
                                badgeContent={this.state.unread_count}
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
                        <div className={`home__tab background__mask
                        ${this.state.tab === 0 ? 'home__content--active' : 'home__content--deactive'}`}>
                            <div className="subHeader">个人信息</div>
                            <div className="home__information">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>头像</th>
                                            <td style={{position: 'relative'}}><div className="home__avatar__hide"
                                                     onClick={()=>{
                                                         this.refs['avatar'].handleOpen(this.state.user_info.iduser_account,
                                                             this.loadUserInfo)
                                                     }}><span>更换头像</span></div>
                                                <img className="home__avatar"
                                                     src={this.state.user_info.avatar_url} alt="头像" /></td>
                                        </tr>
                                        <tr>
                                            <th>昵称</th>
                                            <td>{this.state.user_info.nick_name}</td>
                                        </tr>
                                        <tr>
                                            <th>ID</th>
                                            <td>{this.state.user_info.iduser_account}</td>
                                        </tr>
                                        <tr>
                                            <th>手机号</th>
                                            <td>{this.state.user_info.tel_num}</td>
                                        </tr>
                                        <tr>
                                            <th>余额</th>
                                            <td>￥{this.state.user_info.balance}</td>
                                        </tr>
                                    </tbody>
                                </table>
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
                                                        <p>{item.ware_name}</p>
                                                        <p className="text-grey-color">总需：{item.max_payable_user_count}人次</p>
                                                        <div>
                                                            <LinearProgress mode="determinate" value={item.current_paid_user_count} max={item.max_payable_user_count} min={0} />
                                                        </div>
                                                        <p className="text-grey-color">
                                                            已完成{(item.current_paid_user_count / item.max_payable_user_count * 100).toFixed(1)}%,
                                                            剩余<span style={{color: '#66CCFF'}}>{item.max_payable_user_count - item.current_paid_user_count}</span></p>
                                                    </div>
                                                </div>
                                            </TableRowColumn>
                                            <TableRowColumn>{item.paid_price}人次</TableRowColumn>
                                            <TableRowColumn>{item.status}</TableRowColumn>
                                            <TableRowColumn>{item.paid_time.split('T')[0]}<br/>{item.paid_time.split('T')[1].split('+')[0]}</TableRowColumn>
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
                                        <TableHeaderColumn>商品信息</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {this.state.lucky_record.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableRowColumn>
                                                <div className="home__record__info">
                                                    <img src={item.img_url} alt="商品图片" />
                                                    <div style={{width: '50%'}}>
                                                        <p>{item.ware_name}</p>
                                                        <p className="text-grey-color">总需：{item.max_payable_user_count}人次</p>
                                                        <div>
                                                            <LinearProgress mode="determinate" value={item.current_paid_user_count}
                                                                            max={item.max_payable_user_count} min={0} />
                                                        </div>
                                                        <p className="text-grey-color">
                                                            已完成{(item.current_paid_user_count / item.max_payable_user_count * 100).toFixed(1)}%,
                                                            剩余<span style={{color: '#66CCFF'}}>
                                                            {item.max_payable_user_count - item.current_paid_user_count}</span></p>
                                                    </div>
                                                </div>
                                            </TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className={`home__message background__mask--half home__tab
                        ${this.state.tab === 3 ? 'home__content--active' : 'home__content--deactive'}`}>
                            <div className="subHeader">消息通知</div>
                            <div style={{margin: 16}} className="background__mask--none">
                                {this.state.messages.map((item, index) => (
                                    <Paper className="home__message__item background__mask" key={index}
                                           onTouchTap={() => this.handleReadMessage(item.id_user_message, index)}>
                                        <div>
                                            <div className={item.has_been_read ? 'home__message__item__title--read' : 'home__message__item__title--unread'}>
                                                {item.msg_title}&nbsp;&nbsp;&nbsp;
                                                <span style={{fontWeight: 'normal'}} className="text-grey-color">{item.release_time}</span>
                                            </div>
                                            <div>
                                                <p className="home__message__item__content">{item.msg_detail}</p>
                                            </div>
                                        </div>
                                        <div>{item.has_been_read ? '已读' : '未读'}</div>
                                    </Paper>
                                ))}
                            </div>
                        </div>
                        <div className={`home__charge background__mask--filled home__tab
                        ${this.state.tab === 4 ? 'home__content--active' : 'home__content--deactive'}`}>
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
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {this.state.charge_record.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableRowColumn>{item.charge_time}</TableRowColumn>
                                            <TableRowColumn>{item.id_charge_record}</TableRowColumn>
                                            <TableRowColumn>{item.charge_amount.toFixed(2)}</TableRowColumn>
                                            <TableRowColumn>{item.charge_amount.toFixed(2)}</TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Paper>
                </div>
                <TipsDialog ref="tips" />
                <UploadAvatar ref="avatar" />
            </div>
        );
    }
}