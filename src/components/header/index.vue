<template src="./index.tpl.html"></template>
<script>
export default {
    name: 'topHeader',
    components: {},
    props: '',
    data() {
        return {
            userInfo: this.$store.state.userInfo,
            passwordDialog: false,
            btnLoading: false,
            passwords: {
                password: '',
                newpassword1: ''
            },
            passwordRule: {
                password: [
                    {
                        required: true,
                        message: '请输入旧密码',
                        trigger: 'blur'
                    },
                    {
                        type: 'string',
                        min: 6,
                        message: '密码必须为6位以上',
                        trigger: 'blur'
                    }
                ],
                newpassword1: [
                    {
                        required: true,
                        message: '请输入新密码',
                        trigger: 'blur'
                    },
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
    mounted() {},
    methods: {
        handleDropdown(name) {
            switch (name) {
                case 'signOut':
                    this.signOut();
                    break;
                case 'putPassword':
                    this.passwordDialog = true;
                    break;
                default:
                    break;
            }
        },
        putPassword() {
            let me = this;
            this.$refs['password'].validate(valid => {
                if (!valid) {
                    return;
                }
                this.btnLoading = true;
                this.passwords.username = this.userInfo.username;
                this.$http
                    .put(this.$api.UPDATE_PASSWORD, this.passwords)
                    .then(res => {
                        if (+res.code === 0 && res.data === true) {
                            me.$Message.destroy();
                            localStorage.removeItem('token');
                            localStorage.removeItem('userInfo');
                            me.$store.commit('SET_USERSINFO', '');
                            me.$Message.success({
                                content: res.msg ? res.msg : '修改成功',
                                onClose: () => {
                                    me.btnLoading = false;
                                    this.$router.push('/');
                                }
                            });
                        } else {
                            me.$Message.error({
                                content: res.msg,
                                onClose: () => {
                                    me.btnLoading = false;
                                }
                            });
                        }
                    })
                    .catch(err => {
                        me.$Message.error({
                            content: err.msg,
                            onClose: () => {
                                me.btnLoading = false;
                            }
                        });
                    });
            });
        },
        signOut() {
            let me = this;
            this.$$Spin.show('退出中');
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            this.$store.commit('SET_USERSINFO', '');
            this.$store.commit('SET_MENU_NAME', '');
            this.$store.commit('SET_MENU', []);
            this.$store.commit('SET_DICTIONARY', '');
            setTimeout(() => {
                me.$$Spin.hide();
                me.$router.push('/');
            }, 1000);
        }
    }
};
</script>
<style src="./index.less" lang="less" scoped></style>
