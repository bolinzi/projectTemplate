// 数据统计巡检列表
const Mock = require('mockjs');
const path = require('path');
const mock = require(path.join(process.cwd(), '/mock'));
module.exports = function() {
    let DATA = [];
    let changeNumber = Mock.mock({
        'number|0-1': 0
    }).number;
    if (changeNumber) {
        mock.doCustomTimes(3, () => {
            let id = Mock.mock({
                'number|1-100': 100
            }).number;
            DATA.push(
                Mock.mock({
                    abnormalInspection: 12,
                    actualCompletion: 2,
                    completionRate: '0.2',
                    organization: '组织名称',
                    perCapitaWorkload: 3,
                    planComplete: 10,
                    deptId: id,
                    dataType: 1
                })
            );
        });
    } else {
        DATA = [];
    }
    return {
        code: 0,
        data: DATA,
        msg: '成功'
    };
};
