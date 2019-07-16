/**
 * @file description-creator
 * @description 构造向jsnative容器中添加的description
 * @author lijia(lijia30@baidu.com)
 */


export default class DescCreator {
    constructor(baiduPrivateDescList, hostDescList) {
        this.baiduPrivateDescList = baiduPrivateDescList;
        this.hostDescList = hostDescList;
    }

    /**
     * 生成最终需要扩展的 description
     *
     * @return {Array} description list
     */

    createDescList() {
        // 处理完全mock百度客户端实现的百度私有端能力
        let classifiedBaiduDescriptionList = this.baiduPrivateDescList;

        /**
         * 如果需要处理宿主扩展的端能力， 可以写这里
         *
         */
        let classifiedHostDescriptionList = this.hostDescList;


        // 将手百私有端能力与宿主扩展端能力做合并
        let classifiedDescriptionList = classifiedHostDescriptionList.concat(classifiedBaiduDescriptionList);

        return classifiedDescriptionList;

    }
}


