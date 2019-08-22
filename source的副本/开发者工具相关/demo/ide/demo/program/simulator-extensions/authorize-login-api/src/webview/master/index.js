/**
 * @license
 *  Copyright Baidu Inc. All Rights Reserved.
 *
 *  This source code is licensed under the Apache License, Version 2.0; found in the
 *  LICENSE file in the root directory of this source tree.
 * @file simulator swn-api internal extension master entry
 */

const handlers = require('../scheme');
const {getshowAuthorize, getAuthorizeRecords, setAuthorize, getPhoneNumberInfo, getBaseInfo, DEFAULT_USER_INFO}
    = require('../../authorize/util');
const {passportUrl, checkSession, loginSuccessHandler, getAuthCode, isLogin, clearLogin}
    = require('../../login/util');
module.exports = {
    async onReady(context) {
        context.authorize.getshowAuthorize = getshowAuthorize;
        context.authorize.getAuthorizeRecords = getAuthorizeRecords;
        context.authorize.setAuthorize = setAuthorize;
        context.authorize.getPhoneNumberInfo = getPhoneNumberInfo;
        context.authorize.getBaseInfo = getBaseInfo;
        context.authorize.DEFAULT_USER_INFO = DEFAULT_USER_INFO;
        context.login.getAuthCode = getAuthCode;
        context.login.passportUrl = passportUrl;
        context.login.loginSuccessHandler = loginSuccessHandler;
        context.login.checkSession = checkSession;
        context.login.isLogin = isLogin;
        context.login.clearLogin = clearLogin;
    },
    schemeHandlers: handlers
};
