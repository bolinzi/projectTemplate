<template src="./index.tpl.html"></template>
<script>
import BMapLib from 'BMap';
export default {
    name: 'welcome',
    components: {},
    props: '',
    data() {
        return {
            map: '',
            zoom: 14,
            center: [104.1148230961106, 30.685483407779248]
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
            this.map = new BMapLib.Map('container');
            this.map.centerAndZoom(
                new BMapLib.Point(this.center[0], this.center[1]),
                this.zoom
            );
            this.map.enableScrollWheelZoom(true);
        },
        /**
         * 初始化图表
         */
        initChart() {
        }
    },
    // 离开页面销毁
    beforeDestroy() {
        if (this.chart1) {
            this.chart1.destroy();
            this.chart1 = '';
        }
    }
};
</script>
<style src="./index.less" lang="less" scoped></style>
