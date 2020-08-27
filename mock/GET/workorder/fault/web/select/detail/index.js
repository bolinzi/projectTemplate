module.exports = function() {
    return {
        code: 0,
        data: {
            workOrderFaultBaseVO: {
                areaShortName: '四川省成都市',
                buildName: '项目名称',
                pointCode: '42562627',
                createUserName: '章三',
                createTime: '2020-10-12',
                updateTime: '2020-10-12',
                workOrderState: 400001,
                principalUserName: '里斯'
            },
            workOderFaultExplanationVO: {
                faultType: '013',
                faultDesc: '屏幕坏了',
                faultImage: [
                    'https://i.loli.net/2017/08/21/599a521472424.jpg',
                    'https://i.loli.net/2017/08/21/599a521472424.jpg'
                ]
            },
            WorkOderFaultOperatingVO: [{
                operatorTime: '2010-2-22',
                operatorName: '章三',
                operatorContext: '创建工单'
            }],
            workOderFaultHistoryVO: [{
                operatorName: '里斯',
                createTime: '2020-09-22',
                updateTime: '2020-10-22',
                faultType: '黑屏'
            },
            {
                operatorName: '里斯',
                createTime: '2020-09-22',
                updateTime: '2020-10-22',
                faultType: '黑屏'
            }],
            workOrderFaultResultVO: {
                resultDesc: '完成',
                changeMachine: 1,
                image: [
                    'https://i.loli.net/2017/08/21/599a521472424.jpg',
                    'https://i.loli.net/2017/08/21/599a521472424.jpg'
                ]
            }
        },
        msg: '成功'
    };
};