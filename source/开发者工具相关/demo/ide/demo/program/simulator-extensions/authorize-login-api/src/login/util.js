const getAuthCode = async (context, {timeout}) => {
    return 'hostcode3838838333333';
};
module.exports = {
    // passportUrl: 'https://smartapp.baidu.com/static/miniappdoc/html/swanIDE/login/login.html?test=true',
    // 登录页url
    passportUrl: 'http://127.0.0.1:8080/login.html',
    // 判断是否登录方法
    async isLogin({cache}) {
        let hostpassport = await cache.get('hostpassport');
        console.log('isLogin', hostpassport);
        return Boolean(hostpassport);
    },
    // swan.login成功回调code
    getAuthCode,
    // checkSession请求server能力
    async checkSession(context) {
        try {
            let hostpassport = await context.cache.get('hostpassport');
            return Boolean(hostpassport);
        }
        catch (e) {
            return Promise.reject(Object.assign({}, context.login.RES_TYPE.NET_ERROR, e));
        }
    },
    // 清除登录
    async clearLogin(context) {
        try {
            await context.cache.set('hostpassport', '');
            await context.cache.set('isSimulatorLogin', false);
        }
        catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },
    // 登录成功后处理方法
    async loginSuccessHandler(context, data) {
        return new Promise(async (resolve, reject) => {
            try {
                await context.cache.set('hostpassport', 'hosthahahahhah');
                await context.cache.set('isSimulatorLogin', true);
                resolve(
                    Object.assign(
                        {
                            data: {
                                code: await getAuthCode(context, data)
                            }
                        },
                        context.login.RES_TYPE.SUCESS
                    )
                );
            } catch (err) {
                console.error(err);
                resolve(Object.assign({}, context.login.RES_TYPE.NOT_LOGIN, err));
            }
        });
    },
    // 登录关闭处理方法
    loginCloseHandler({event}) {
        return new Promise(resolve => {
            // 触发小程序onShow生命周期
            event.send('update-page-lifecycle', {type: 'onShow'});
            resolve(context.login.RES_TYPE.NOT_LOGIN);
        });
    }
}