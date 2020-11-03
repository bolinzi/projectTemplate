<template src="./index.tpl.html"></template>
<script>
import util from '@libs/utils';
export default {
    name: 'welcome',
    components: {},
    props: '',
    data() {
        return {
            chart: '',
            dataCha: {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: '我的第一个图表'
                },
                xAxis: {
                    categories: ['苹果', '香蕉', '橙子']
                },
                yAxis: {
                    title: {
                        text: '吃水果个数'
                    }
                },
                series: [
                    {
                        name: '小明',
                        data: [1, 0, 4]
                    },
                    {
                        name: '小红',
                        data: [5, 7, 3]
                    }
                ]
            },
            options: {
                title: {
                    text: '2010 ~ 2016 年太阳能行业就业人员发展情况'
                },
                subtitle: {
                    text: '数据来源：thesolarfoundation.com'
                },
                yAxis: {
                    title: {
                        text: '就业人数'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010
                    }
                },
                series: [{
                    name: '安装，实施人员',
                    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                }, {
                    name: '工人',
                    data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                }, {
                    name: '销售',
                    data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                }, {
                    name: '项目开发',
                    data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                }, {
                    name: '其他',
                    data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            },
            chart1: '',
            chart2: ''
        };
    },
    computed: {},
    created() {},
    mounted() {
        this.load();
        this.initChart();
    },
    methods: {
        load() {
            // 测试生产随机数
            console.log(util.randomString(10));
            let a = {
                a: 1,
                b: 2
            };
            // 测试md5加密
            console.log(util.sortByMd5(a));
        },
        /**
         * 初始化图表
         */
        initChart() {
            this.chart1 = this.$highcharts.chart('container', this.dataCha);
            this.chart2 = this.$highcharts.chart('test', this.options);
        }
    },
    // 离开页面销毁
    beforeDestroy() {
        if (this.chart1) {
            this.chart1.destroy();
            this.chart1 = '';
        }
        if (this.chart2) {
            this.chart2.destroy();
            this.chart2 = '';
        }
    }
};
</script>
<style src="./index.less" lang="less" scoped></style>
