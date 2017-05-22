/**
 * Created by Think on 2017/5/18.
 */

import Auth from './Auth';

const prefix = '/api';

export default class API {

    static AccessToken = '';
    static RefreshToken = '';

    //账户
    static Token = prefix + '/token';
    static Register = prefix + '/Account/Register';


    //商品
    static Ware = prefix + '/ware';



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
            if(data.__status && data.__status > 200)
                console.error('服务器故障~');
            else {
                console.log(data);
                //更新token成功
                API.AccessToken = data.access_token;
                API.RefreshToken = data.refresh_token;
                Auth.storeUserInfo(Object.assign(Auth.getUserInfo(), data));
                cb && cb();
            }
        }).catch((e) => {
            console.error('更新Token失败！');
        });
    }

}