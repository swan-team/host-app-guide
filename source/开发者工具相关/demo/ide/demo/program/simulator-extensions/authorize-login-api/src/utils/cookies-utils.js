/**
 * @license
 *  Copyright Baidu Inc. All Rights Reserved.
 *
 *  This source code is licensed under the Apache License, Version 2.0; found in the
 *  LICENSE file in the root directory of this source tree.
 * @file cookie工具
 */

// 获取百度域cookie项
// 输入 {cookies, nameList: ['BDUSS']}
// 输出 {BDUSS: 'xxxx'}
function getBaiduCookies({cookies, nameList}) {
    const domain = '.baidu.com';
    let result = {};
    return new Promise(resolve => {
        cookies.get({domain}, (error, cookieItems) => {
            if (error) {
                throw error;
            }
            cookieItems.forEach(cookieItem => {
                if (nameList.indexOf(cookieItem.name) > -1) {
                    result[cookieItem.name] = cookieItem.value;
                }
            });
            resolve(result);
        });
    });
}

// 获取bduss
async function getBduss(cookies) {
    const cookieName = 'BDUSS';
    return (await getBaiduCookies({cookies, nameList: [cookieName]}))[cookieName];
}

module.exports = {
    getBaiduCookies,
    getBduss
};
