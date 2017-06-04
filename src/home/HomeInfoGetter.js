/**
 * Created by Think on 2017/5/22.
 */

import API from '../API';

export default class HomeInfoGetter {
    static getUserInfo(username) {
        return new Promise((resolve) => {
            fetch(API.UserInfo + username, {
                method: 'GET',
                cache: 'no-cache',
                headers: new Headers({})
            }).then((response) => {
                if(response.status === 200) return response.json();
                else return {__status: response.status};
            }).then((data) => {
                if(data && data.__status) {
                    console.error('服务器故障~');
                }else {
                    resolve(data);
                }
            }).catch((e) => {
                console.error('失败！');
            });
        });
    }

    static getUserOnGoingLottery() {
        return new Promise((resolve) => {
            fetch(API.OnGoing + '/' + API.UserId, {
                method: 'GET',
                cache: 'no-cache',
                headers: new Headers({
                    'Authorization': 'Bearer ' + API.AccessToken
                })
            }).then((response) => {
                if(response.status === 200) return response.json();
                else return {__status: response.status};
            }).then((data) => {
                if(data && data.__status) {
                    console.error('服务器故障~');
                }else {
                    resolve(data);
                }
            }).catch((e) => {
                console.error('失败！', e);
            });
        });
    }


    static getUserLuckyLottery() {
        return new Promise((resolve) => {
            fetch(API.LuckyRecord + '/' + API.UserId, {
                method: 'GET',
                cache: 'no-cache',
                headers: new Headers({
                    'Authorization': 'Bearer ' + API.AccessToken
                })
            }).then((response) => {
                if(response.status === 200) return response.json();
                else return {__status: response.status};
            }).then((data) => {
                if(data && data.__status) {
                    console.error('服务器故障~');
                }else {
                    resolve(data);
                }
            }).catch((e) => {
                console.error('失败！', e);
            });
        });
    }

    static getUserMessages() {
        return new Promise((resolve) => {
            fetch(API.Messages + '/' + API.UserId, {
                method: 'GET',
                cache: 'no-cache',
                headers: new Headers({
                    'Authorization': 'Bearer ' + API.AccessToken
                })
            }).then((response) => {
                if(response.status === 200) return response.json();
                else return {__status: response.status};
            }).then((data) => {
                if(data && data.__status) {
                    console.error('服务器故障~');
                }else {
                    resolve(data);
                }
            }).catch((e) => {
                console.error('失败！', e);
            });
        });
    }

    static UserReadMessages(msg_id) {
        return new Promise((resolve) => {
            fetch(API.ReadMessage + '/' + msg_id, {
                method: 'GET',
                cache: 'no-cache',
                headers: new Headers({
                    'Authorization': 'Bearer ' + API.AccessToken
                })
            }).then((response) => {
                if(response.status === 200) return response.json();
                else return {__status: response.status};
            }).then((data) => {
                if(data && data.__status) {
                    console.error('服务器故障~');
                }else {
                    resolve(data);
                }
            }).catch((e) => {
                console.error('失败！', e);
            });
        });
    }

    static getUserChargeRecord() {
        return new Promise((resolve) => {
            fetch(API.ChargeRecord + '/' + API.UserId, {
                method: 'GET',
                cache: 'no-cache',
                headers: new Headers({
                    'Authorization': 'Bearer ' + API.AccessToken
                })
            }).then((response) => {
                if(response.status === 200) return response.json();
                else return {__status: response.status};
            }).then((data) => {
                if(data && data.__status) {
                    console.error('服务器故障~');
                }else {
                    resolve(data);
                }
            }).catch((e) => {
                console.error('失败！', e);
            });
        });
    }

    static UserCharge(amount) {
        return new Promise((resolve) => {
            fetch(API.Charge + `/${API.UserId}/${amount}`, {
                method: 'GET',
                cache: 'no-cache',
                headers: new Headers({
                    'Authorization': 'Bearer ' + API.AccessToken
                })
            }).then((response) => {
                if(response.status === 200) return response.json();
                else return {__status: response.status};
            }).then((data) => {
                if(data && data.__status) {
                    console.error('服务器故障~');
                }else {
                    resolve(data);
                }
            }).catch((e) => {
                console.error('失败！', e);
            });
        });
    }
}