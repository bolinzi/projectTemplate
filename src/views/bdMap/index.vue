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
            center: [],
            point: '',
            city: '成都市',
            region: '成都市武侯区'
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
            this.map = new BMapLib.Map(
                'container',
                {
                    enableMapClick: false,
                    minZoom: 10,
                    maxZoom: 20
                });
            let map = this.map;
            this.map.enableScrollWheelZoom(true);
            let myGeo = new BMapLib.Geocoder();
            // 将地址解析结果显示在地图上,并调整地图视野
            myGeo.getPoint(this.region, (point) => {
                if (point) {
                    map.centerAndZoom(point, 16);
                } else {
                    console.log('您选择地址没有解析到结果!');
                }
            }, this.city);
            let centerPixel = map.pointToOverlayPixel(map.getCenter());
            //通过设置地图的中心点，使定位点显示在手机上部分区域
            map.setCenter(map.overlayPixelToPoint({x: centerPixel.x,y: centerPixel.y}));
            map.addEventListener('dragend', function(){
                //获得移动之后地图中心点的像素位置
                let pixel = map.pointToOverlayPixel(map.getCenter());
                //获得定位图标所在位置在地图上的地理位置，实际上定位图标的像素位置就在地图中心像素位置相应的偏移量处
                let Point = map.overlayPixelToPoint({x: pixel.x,y: pixel.y});
                console.log(Point);
            });
            // let geolocation = new BMapLib.Geolocation();
            //     if(this.getStatus() === 0){
            // geolocation.getCurrentPosition((r) => {
            //     console.log(r);
            //     let mk = new BMapLib.Marker(r.point);
            //     map.addOverlay(mk);
            //     //将地图中心移动到可视区中点W
            //     map.panTo(r.point);
                // let centerPixel = map.pointToOverlayPixel(map.getCenter());
                // //通过设置地图的中心点，使定位点显示在手机上部分区域
                // map.setCenter(this.map.overlayPixelToPoint({x: centerPixel.x,y: centerPixel.y}));
                // map.addEventListener('dragend', () => {
                //     //获得移动之后地图中心点的像素位置
                //     let pixel = map.pointToOverlayPixel(map.getCenter());
                //     //获得定位图标所在位置在地图上的地理位置，实际上定位图标的像素位置就在地图中心像素位置相应的偏移量处
                //     let Point = map.overlayPixelToPoint({x: pixel.x,y: pixel.y});
                //     let mkn = new BMapLib.Marker(Point);
                //     map.addOverlay(mkn);
                // });
            // });
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
