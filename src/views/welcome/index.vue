<template src="./index.tpl.html"></template>
<script>
import util from '../../libs/utils';
export default {
    name: 'welcome',
    components: {},
    props: '',
    data() {
        return {
            exportLoading: false,
            // time: 1604038002
            time: '2012-05-11',
            size: 1604038002,
            value: '023',
            arr: ['数组1', '数组2'],
            str: null,
            test: '   123 315 1215  ',
            n: 15425.21
        };
    },
    computed: {},
    created() {},
    mounted() {
    },
    methods: {
        a() {
            util.doCustomTimes(5, () => {
                let a = util.accDiv(1, 5);
                console.log(a);
            });
        },
        /**
         * 表单导出示例
         */
        exportExcel() {
            // this.$dayjs(this.$dayjs(this.formModel.date[0]).format('YYYY-MM-DD')
            //         + '00:00:00').unix() 时间戳转换示例
            let params = {
                workOrderType: 1,
                userId: '',
                workOrderState: '',
                deptId: undefined,
                startTime: 1598025600,
                endTime: 1598544000,
                buildName: '',
                workOrderException: ''
            };
            this.exportLoading = true;
            this.$http({
                method: 'GET',
                url: this.$api.commonServer.GET_WORKORDER_HOMEPAGEEXCEL,
                params: params
            }).then(res => {
                const startTime = this.$dayjs(1598025600000).format('YYYY-MM-DD');
                const endTime = this.$dayjs(1598025600000).format('YYYY-MM-DD');
                this.$downloadExcel(
                    res,
                    `工单明细_(${startTime}至${endTime})`
                );
            })
            .finally(() => {
                this.exportLoading = false;
            });
        }
    }
};
</script>
<style src="./index.less" lang="less" scoped></style>
