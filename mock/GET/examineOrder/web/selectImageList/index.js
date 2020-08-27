// 巡检管理列表
// const Mock = require('mockjs');
// const path = require('path');
// const mock = require(path.join(process.cwd(), '/mock'));
module.exports = function() {
    return {
        code: 0,
        data: {
            faultDesc: '故障问题描述',
            faultType: '设备故障',
            infoList: [
                {
                    id: 123,
                    imageUrl: 'https://i.loli.net/2017/08/21/599a521472424.jpg'
                },
                {
                    id: 124,
                    imageUrl: 'https://i.loli.net/2017/08/21/599a521472424.jpg'
                }
            ]
        },
        msg: '成功'
    };
};
