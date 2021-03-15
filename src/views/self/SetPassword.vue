<template>
    <div class="page">
        <van-nav-bar
            title="设置密码"
            left-text=""
            left-arrow
            @click-left="$router.go(-1)"
        >
            <template #right>
                <van-button type="primary" round size="small" @click="submit"
                    >确定</van-button
                >
            </template>
        </van-nav-bar>
        <div class="page-main">
            <div class="desc">
                请设置账户密码。你可以用账号+密码登录，比如使用手机号+账号密码登录APP，更快捷。
            </div>
            <van-form ref="form">
                <van-field v-model="nickname" name="账号" label="账号" />
                <van-field
                    v-model="old_pwd"
                    type="password"
                    name="原密码"
                    label="原密码"
                    placeholder="请填写原密码"
                    :rules="[
                        { required: true, message: '填写原始密码' },

                        { validator: validator1, message: '密码格式不对' }
                    ]"
                />
                <van-field
                    v-model="new_pwd"
                    type="password"
                    name="新密码"
                    label="新密码"
                    placeholder="填写新密码"
                    :rules="[
                        { required: true, message: '填写新密码' },
                        { validator: validator1, message: '密码格式不对' },
                        {
                            validator: validator2,
                            message: '新密码不能与旧密码一样'
                        }
                    ]"
                />
                <van-field
                    v-model="re_pwd"
                    type="password"
                    name="确认密码"
                    label="确认密码"
                    placeholder="再次填写新密码确认"
                    :rules="[
                        { required: true, message: '再次填写新密码' },
                        { validator: validator1, message: '密码格式不对' },
                        { validator: validator3, message: '两次新密码不一致' }
                    ]"
                />
            </van-form>
            <div class="info">
                密码必须是子母、数字、特殊字符串之间的组合（不能是纯数字）
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            old_pwd: "",
            new_pwd: "",
            re_pwd: ""
        };
    },
    computed: {
        nickname() {
            const vm = this;
            return JSON.parse(localStorage.getItem("userInfo")).nickname;
        },
        user_id() {
            const vm = this;
            return JSON.parse(localStorage.getItem("userInfo")).id;
        }
    },
    methods: {
        //密码格式验证
        validator1(val) {
            const vm = this;
            if (
                !/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,16}$/.test(
                    val
                )
            ) {
                return false;
            } else {
                return true;
            }
        },
        //新旧密码验证
        validator2() {
            const vm = this;
            if (vm.new_pwd === vm.old_pwd) {
                return false;
            } else {
                return true;
            }
        },
        //新密码与确认密码验证
        validator3() {
            const vm = this;
            if (vm.re_pwd === vm.new_pwd) {
                return true;
            } else {
                return false;
            }
        },
        async submit() {
            const vm = this;
            try {
                let res = await vm.$refs.form.validate();
            } catch (e) {
                vm.$toast.fail(e[0].message);
                return;
            }

            const params = {
                user_id: vm.user_id,
                password: vm.new_pwd,
                password_confirm: vm.re_pwd
            };
            const loading = vm.$toast.loading("更改中...");
            const res = await vm.http.get(vm.api.editUserInfo, params);
            loading.clear();
            if (!res) {
                return;
            }
            const result = res.data;
            if (result.code === 200) {
                vm.$toast.success("更改成功");
                vm.loginOut();
            } else {
            }
        },
        async loginOut() {
            const vm = this;
            // const loading = vm.$toast.loading("注销中...");
            const res = await vm.http.get(vm.api.logout);
            if (!res) {
                return;
            }
            const result = res.data;
            if (result.code === 200) {
                // loading.clear();
                vm.cookie.delCookie("yinshui_test_token");
                vm.$router.push({ name: "login" });
                // vm.$toast.success("注销成功");
            } else {
                vm.$toast.fail(result.result);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.page {
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    .page-main {
        flex: 1;
        padding: 0 10px;
        font-size: 12px;
        color: #999;
        .desc {
            padding-top: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #ccc;
        }
        .info {
            padding-left: 15px;
            padding-right: 15px;
        }
    }
}
</style>