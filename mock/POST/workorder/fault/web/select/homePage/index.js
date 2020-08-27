// 巡检管理列表
const Mock = require('mockjs');
const path = require('path');
const mock = require(path.join(process.cwd(), '/mock'));
module.exports = function() {
    let DATA = [];
    let changeNumber = Mock.mock({
        'number|0-1': 0
    }).number;
    let timeOutNumber = Mock.mock({
        'number|0-1': 0
    }).number;
    let breakId = Mock.mock({
        'number|+1': 202
      }).number;
    mock.doCustomTimes(21, () => {
        DATA.push(
            Mock.mock({
                id: breakId,
                examinePlan: '测试计划',
                examineCycle: '@date',
                operatorName: '@name()',
                areaShortName: '@province()',
                buildName: '项目名称',
                productId: '110610000@natural(1, 4)',
                faultType: '023',
                createUserName: '@name()',
                // 差个创建时间
                workOrderState: '400001',
                changeMachine: changeNumber,
                principalUserName: '@name()',
                timeOut: timeOutNumber,
                updateTime: '@date("yyyy-MM-dd")'
            })
        );
    });
    return {
        code: 0,
        data: {
            total: 21,
            records: DATA
        },
        msg: '成功'
    };
};
