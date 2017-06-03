/**
 * Created by Think on 2017/5/18.
 */

import Auth from './Auth';

const prefix = '/api';

export default class API {

    static AccessToken = '';
    static RefreshToken = '';

    static UserId = '';

    //账户
    static Token = prefix + '/token';
    static Register = prefix + '/Account/Register';

    static UserInfo = prefix + '/account/';

    //买买买
    static AddToCart = prefix + '/cart/add';
    static Cart = prefix + '/cart';
    static RemoveFromCart = prefix + '/cart/remove';
    static ClearingCart = prefix + '/cart/buy';

    //商品
    static HotLottery = prefix + '/sexylottery';
    static AllLottery = prefix + '/lottery';
    static DetailedLottery = prefix + '/lottery';
    static RecentWinners = prefix + '/lottery/winners';


    //管理员
    static AllWares = prefix + '/ware';
    static Lottery = prefix + '/lottery';

    static refreshToken(cb) {
        fetch(API.Token, {
            method: 'POST',
            redirect: 'manual',
            cache: 'no-cache',
            body: `grant_type=refresh_token&refresh_token=${API.RefreshToken}&client_id=LottorApp`,
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'dataType': 'json'
            })
        }).then((response) => {
            if(response.status === 200) return response.json();
            else return {__status: response.status};
        }).then((data) => {
            if(data.__status) {
                if(data.__status >= 500) {
                    console.error('服务器故障~');
                }else if(data.__status === 400) {
                    cb && cb('登录状态已过期，请重新登录');
                }
            }
            else {
                //更新token成功
                API.AccessToken = data.access_token;
                API.RefreshToken = data.refresh_token;
                Auth.storeUserInfo(Object.assign(Auth.getUserInfo(), data));
                cb && cb(null);
            }
        }).catch((e) => {
            console.error('更新Token失败！');
        });
    }

}