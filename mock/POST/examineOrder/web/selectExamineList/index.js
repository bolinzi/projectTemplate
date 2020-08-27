// 巡检管理列表
const Mock = require('mockjs');
const path = require('path');
const mock = require(path.join(process.cwd(), '/mock'));
module.exports = function() {
    let DATA = [];
    let screenNumber = Mock.mock({
        'number|0-1': 0
    }).number;
    let soundNumber = Mock.mock({
        'number|0-1': 0
    }).number;
    let labelNumber = Mock.mock({
        'number|0-1': 0
    }).number;
    let playNumber = Mock.mock({
        'number|0-1': 0
    }).number;
    let faultNumber = Mock.mock({
        'number|0-1': 0
    }).number;
    mock.doCustomTimes(18, () => {
        DATA.push(
            Mock.mock({
                examinePlan: '测试计划',
                examineCycle: '@date',
                operatorName: '@name()',
                areaShortName: '@province()',
                buildName: '项目名称',
                pointCode: '110610000@natural(1, 4)',
                // 工单状态为处理进度
                businessNode: 0,
                screenException: screenNumber,
                soundSyncException: soundNumber,
                lableException: labelNumber,
                playSyncException: playNumber,
                faultException: faultNumber,
                endTime: '@date("yyyy-MM-dd")',
                examineUuid: 11111
            })
        );
    });
    return {
        code: 0,
        data: {
            total: 18,
            list: DATA
        },
        msg: '成功'
    };
};
