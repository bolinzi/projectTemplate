// 数据统计故障列表
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
                'number|1-1000': 1000
            }).number;
            DATA.push(
                Mock.mock({
                    faultRate: {
                        elevatorMaintenance: 0.22,
                        noElectricity: 0.22,
                        thereIsElectricity: 0.33,
                        total: 0.73
                    },
                    numberOfFaults: {
                        elevatorMaintenance: 11,
                        noElectricity: 22,
                        thereIsElectricity: 33,
                        total: 233
                    },
                    numberWorkOrdersCompleted: {
                        elevatorMaintenance: 11,
                        noElectricity: 22,
                        thereIsElectricity: 33,
                        total: 233
                    },
                    timeoutCount: {
                        elevatorMaintenance: 11,
                        noElectricity: 22,
                        thereIsElectricity: 33,
                        total: 233
                    },
                    organization: '组织名称',
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
