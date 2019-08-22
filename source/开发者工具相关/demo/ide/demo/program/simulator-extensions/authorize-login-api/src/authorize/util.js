let authorizeList = {
    mapp_camera: {
        description: '',
        ext: [],
        forbidden: 'false',
        grade: '2',
        id: 'mapp_camera',
        name: '使用你的系统相机',
        need_applay: '0',
        permit: 'false',
        rule: [],
        short_name: '摄像头',
        tip_status: '0',
        type: '2'
    },
    mapp_choose_address: {
        description: '',
        ext: [],
        forbidden: 'false',
        grade: '2',
        id: 'mapp_choose_address',
        name: '使用你的地址信息',
        need_apply: '0',
        permit: 'false',
        rule: [],
        short_name: '收货地址',
        tip_status: '0',
        type: '1'
    },
    mobile: {
        description: '授权后，小程序开发者将获取你百度账号绑定的手机号，为你相关服务。如不同意此小程序使用你的手机号。',
        ext: [],
        forbidden: 'true',
        grade: '1',
        id: 'mobile',
        name: '绑定的手机号码',
        need_apply: '0',
        permit: 'false',
        rule: [],
        short_name: '',
        tip_status: '-1',
        type: '1'
    },
    mapp_record: {
        description: '',
        ext: [],
        forbidden: 'false',
        grade: '2',
        id: 'mapp_record',
        name: '使用你的系统录音',
        need_applay: '0',
        permit: 'false',
        rule: [],
        short_name: '录音功能',
        tip_status: '0',
        type: '2'
    },
    snsapi_userinfo: {
        description: '授权后，小程序开发者将获取你百度账号绑定的手机号，为你相关服务。如不同意此小程序使用你的手机号。',
        ext: [],
        forbidden: 'false',
        grade: '2',
        id: 'snspai_userinfo',
        name: '获取你的公开信息（昵称、头像等）',
        need_apply: '0',
        permit: 'false',
        rule: [],
        short_name: '用户信息',
        tip_status: '1',
        type: '2'
    },
    "mapp_choose_address": {
        "id": "mapp_choose_address",
        "permit": "false",
        "forbidden": "false",
        "grade": "2",
        "type": "1",
        "need_apply": "0",
        "name": "使用你的地址信息",
        "short_name": "收货地址",
        "description": "",
        "tip_status": "0",
        "rule": [],
        "ext": []
    },
    "mapp_choose_invoice": {
        "id": "mapp_choose_invoice",
        "permit": "false",
        "forbidden": "false",
        "grade": "2",
        "type": "1",
        "need_apply": "0",
        "name": "使用你的发票信息",
        "short_name": "发票抬头",
        "description": "",
        "tip_status": "0",
        "rule": [],
        "ext": []
    },
    "mapp_images": {
        "id": "mapp_images",
        "permit": "false",
        "forbidden": "false",
        "grade": "2",
        "type": "2",
        "need_apply": "0",
        "name": "使用你的系统相册",
        "short_name": "保存到相册",
        "description": "",
        "tip_status": "0",
        "rule": [],
        "ext": []
    },
    "mapp_location": {
        "id": "mapp_location",
        "permit": "false",
        "forbidden": "false",
        "grade": "2",
        "type": "2",
        "need_apply": "0",
        "name": "获取你的地理位置",
        "short_name": "地理位置",
        "description": "",
        "tip_status": "0",
        "rule": [],
        "ext": []
    }
};
module.exports = {
    // 获取用户信息，登录后
    async getBaseInfo(context) {
        return {
            iv: 'hostiv',
            data: 'hostdata',
            userinfo: {nickName: 'hahhha', shoubainickname: 'shoubaihahahh', headimgurl: 'https://b.bdstatic.com/miniapp/resource/image/headImg.png', sex: 1},
            is_anonymous: 'is_anonymous'
        };
    },
    DEFAULT_USER_INFO: {
        nickname: '爱奇艺网友',
        shoubainickname: '爱奇艺网友',
        headimgurl: 'https://b.bdstatic.com/miniapp/resource/image/headImg.png',
        sex: 1
    },
    async getPhoneNumberInfo(context) {
        return {
            iv: 'phoneiv',
            data: 'data'
        };
    },

    async getAuthorizeRecords(context) {
        list = await context.cache.get('authorizeList');
        if (await context.login.isLogin) {
            // 登录列表由server维护
        }
        else {
            // 未登录列表由server维护
        }
        return list || authorizeList;
    },
    // 设置授权的请求server逻辑
    async setAuthorize(context, accredits) {
        let list = await context.cache.get('authorizeList');
        let scope = Object.keys(accredits)[0];
        list[scope].permit = accredits[scope].permit;
        await context.cache.set('authorizeList', list);
        return {
            errmsg: 'succ',
            errno: '0',
            request_id: '0518173862',
            data: {
                code: 'nothing',
                opendata: null
            }
        };
        // let res = {
        //     errno: 222,
        //     tipmsg: '输入不合法'
        // }
        // return Promise.reject({
        //     message: `设置服务端授权状态错误:${res.errno} ${res.tipmsg}`,
        //     serverErrno: res.errno
        // });
        // return  Promise.reject(Object.assign({}, RES_TYPE.NET_ERROR, err));
    },
    // 清除授权的请求server逻辑
    async resetAuthorize(context) {
        return {
            data: {},
            errmsg: 'succ',
            errno: 0,
            request_id: '3135',
            tipmsg: ''
        };
        // return Promise.reject({
        //     message: `重置授权错误:${res.errno} ${res.tipmsg}`,
        //     serverErrno: res.errno
        // });
        // return  Promise.reject(Object.assign({}, RES_TYPE.NET_ERROR, err));
    },
    // swan.openSetting展现的授权项目算法
    getshowAuthorize(list) {
        console.log('host showlist rule', Object.values(list).filter(item => item.id !== 'snspai_userinfo'));
        return Object.values(list).filter(item => item.id !== 'snspai_userinfo');
    }
}