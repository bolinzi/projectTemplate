<template src="./index.tpl.html"></template>
<script>
import TopHeader from '@component/header';
import { watermark } from '../../libs/utils';
export default {
    components: {
        TopHeader
    },
    data() {
        const { meta } = this.$route;
        return {
            isCollapsed: false,
            meta,
            userInfo: this.$store.state.userInfo,
            menu: this.$store.state.menuData,
            active: 'welcome',
            activeArry: ['welcome'],
            logo: require('@image/logo.png')
        };
    },
    computed: {
        rotateIcon() {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        },
        menuitemClasses() {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ];
        }
    },
    created() {
        this.$Message.config({
            top: 50,
            duration: 2
        });
        this.$Notice.config({
            top: 50,
            duration: 2
        });
        this.active = this.$store.state.menuName;
        this.activeArry = this.$store.state.menuActive;
    },
    mounted() {
        this.setWatermark(this.userInfo);
    },
    methods: {
        collapsedSider() {
            this.$refs.side1.toggleCollapse();
        },
        setWatermark(sysUser) {
            watermark({
                // eslint-disable-next-line camelcase
                watermark_txt: `${sysUser.name} ${sysUser.jobsn || sysUser.username}`,
                // eslint-disable-next-line camelcase
                watermark_angle: 30
            });
        },
        select(name) {
            this.$store.commit('SET_MENU_NAME', name);
        },
        open(name) {
            this.$store.commit('SET_MENU_ACTIVE', name);
        }
    }
};
</script>
<style src="./index.less" lang="less" scoped></style>
