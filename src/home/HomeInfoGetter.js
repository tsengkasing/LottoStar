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
}