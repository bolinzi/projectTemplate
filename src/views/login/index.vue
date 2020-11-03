<template src="./index.tpl.html"></template>
<script>
import util from '@libs/utils';
import { pathRouterName } from '@libs/public';
export default {
    name: 'login',
    components: {},
    props: '',
    data() {
        return {
            loading: false,
            formLogin: {
                userName: '',
                password: ''
            },
            loginBt: require('@image/loginBt.png'),
            leftImg: require('@image/left.png'),
            ruleLogin: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        type: 'string',
                        min: 6,
                        message: '密码必须为6位以上',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    computed: {},
    created() {},
    mounted() {
        this.bodyListener = (e) => {
            if (e.keyCode === 13 && e.target === document.body) {
                document.getElementById('login-btn').click();
            }
        };
        document.body.addEventListener('keyup', this.bodyListener, false);
    },
    methods: {
        handleSubmit() {
            this.$refs['formLogin'].validate(valid => {
                if (!valid) {
                    return;
                }
                const user = util.encryption({
                    data: {
                        password: this.formLogin.password
                    },
                    key: 'auth-center-secu',
                    param: ['password']
                });
                this.loading = true;
                localStorage.removeItem('token');
                localStorage.removeItem('userInfo');
                this.$store.commit('SET_USERSINFO', '');
                this.$http({
                    method: 'POST',
                    url: this.$api.loginServe.AUTH_LOGIN,
                    params: {
                        username: this.formLogin.userName,
                        password: user.password,
                        randomStr: util.randomString(32),
                        // eslint-disable-next-line camelcase
                        grant_type: 'password',
                        scope: 'server'
                    }
                }).then(res => {
                    this.loading = false;
                    // 保存token在localStorage
                    localStorage.setItem(
                        'token',
                        `Bearer ${res.access_token}`
                    );
                    let name = ['welcome'];
                    this.$store.commit('SET_MENU_ACTIVE', name);
                    this.getUserInfo();
                    this.getDictionary();
                }).catch(err => {
                    this.$Message.error({
                        content: err.msg || '登录失败',
                        onClose: () => {
                            this.loading = false;
                            this.$router.push('/');
                        }
                    });
                });
            });
        },
        getUserInfo() {
            this.$http
                .get(this.$api.loginServe.GET_USERINFO)
                .then(res => {
                    if (+res.code !== 0) {
                        this.$Message.error({
                            content: res.msg,
                            onClose: () => {
                                this.loading = false;
                            }
                        });
                        return;
                    }
                    let cityInfo = {
                        cityAddress: res.data.cityAddress,
                        longiAndLatide: res.data.longiAndLatide
                    };
                    this.$store.commit('SET_CITY_INFO', cityInfo);
                    const SYSUSER = res.data.sysUser;
                    // 存储用户角色
                    SYSUSER.roleCodes = res.data.roleCodes;
                    // this.setWatermark(SYSUSER);
                    let permissionBtn = [];
                    res.data.permissions.forEach(item=> {
                        if (item.slice(0, 8) === 'orderSys') {
                            permissionBtn.push(item);
                        }
                    });
                    this.$store.commit('SET_PERMISSION_BTN', permissionBtn);
                    localStorage.setItem(
                        'userInfo',
                        JSON.stringify(SYSUSER)
                    );
                    this.$store.commit('SET_USERSINFO', SYSUSER);
                    this.$store.commit('SET_MENU_NAME', 'welcome');
                    this.getMenu();
                })
                .catch(err => {
                    this.$Message.error({
                        content: err.msg || '接口错误',
                        onClose: () => {
                            this.loading = false;
                            this.$router.push('/');
                        }
                    });
                });
        },
        getMenu() {
            this.$http
                .get(this.$api.loginServe.GET_MENU)
                .then(res => {
                    if (+res.code !== 0) {
                        this.$Message.error({
                            content: res.msg,
                            onClose: () => {
                                this.loading = false;
                            }
                        });
                        return;
                    }
                    let menu = res.data.find(item =>
                        item.path === 'orderSystem'
                        // item.path === 'order_center' 测试环境使用此字段
                    );
                    if (menu && menu.children) {
                        this.setRouterName(menu.children);
                        this.$store.commit('SET_MENU', menu.children);
                        this.$router.push({ name: 'welcome' });
                    } else {
                        this.$Message.error({
                            content: '暂无该系统权限！',
                            onClose: () => {
                                this.loading = false;
                                this.$router.push('/');
                            }
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.$Message.error({
                        content: err.msg || '接口错误',
                        onClose: () => {
                            this.loading = false;
                            this.$router.push('/');
                        }
                    });
                });
        },
        getDictionary() {
            this.$http
                .get(this.$api.loginServe.GET_WORKORDER_TYPE + '/workorder_install,workorder_dismantle,workorder_reverse,fault_type,workorder_fault,workorder_status')
                .then(res => {
                    if (+res.code !== 0) {
                        this.$Message.error({
                            content: res.msg,
                            onClose: () => {
                                this.loading = false;
                            }
                        });
                        return;
                    }
                    let dictionary = {};
                    res.data.forEach(item => {
                        const { type, itemList} = item;
                        dictionary[type] = itemList;
                    });
                    this.$store.commit('SET_DICTIONARY', dictionary);
                }).catch(err => {
                    this.$Message.error({
                        content: err.msg || '获取工单状态失败',
                        onClose: () => {
                            this.loading = false;
                        }
                    });
                });
        },
        setRouterName(data) {
            data.forEach(item => {
                item.routerName = pathRouterName[item.path];
                if (item.children.length > 0) {
                    this.setRouterName(item.children);
                } else {
                    return;
                }
            });
        }
    },
    beforeDestroy() {
      document.body.removeEventListener('keyup', this.bodyListener);
    }
};
</script>
<style src="./index.less" lang="less" scoped></style>
