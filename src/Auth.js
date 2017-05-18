/**
 * Created by Think on 2017/5/18.
 */

const STORE = 'LOTTO-STAR';

export default class Auth {

    static getUserInfo() {
        //从sessionStorage获取用户信息
        let user_info = window.sessionStorage.getItem(STORE);
        if(user_info) {
            try {
                user_info = JSON.parse(user_info);
                if(user_info.username) {
                    user_info.toLogin = false;
                    return user_info;
                }
            }catch (e) {
                console.error('user information parse error');
            }
        }
        //用户信息不存在或者解析错误
        let username = window.localStorage.getItem(STORE);
        if (username) return {username: username, toLogin: true};
        return '';
    }

    static getLoginStatus() {
        let info = Auth.getUserInfo();
        return info && typeof info === 'object' && !info.toLogin;
    }

    static storeUserInfo(info) {
        window.sessionStorage.setItem(STORE, JSON.stringify(info));
        window.localStorage.setItem(STORE, info.username);
    }

    static clearUserInfo() {
        window.sessionStorage.removeItem(STORE);
        window.localStorage.removeItem(STORE);
    }


}