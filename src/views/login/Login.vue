<template>
    <div class="page">
        <div class="page-header">
            <img src="@assets/images/login/logo.png" alt="" />
        </div>
        <div class="page-body">
            <van-cell-group>
                <van-field
                    v-model="username"
                    label=""
                    left-icon="smile-o"
                    placeholder="请输入用户名"
                    clearable
                    @blur="user = false"
                    @focus="user = true"
                >
                    <template #left-icon>
                        <img
                            v-if="!user"
                            src="@assets/images/login/user.png"
                            alt=""
                        />
                        <img
                            v-else
                            src="@assets/images/login/user-focus.png"
                            alt=""
                        />
                    </template>
                </van-field>
                <van-field
                    v-model="password"
                    clearable
                    label=""
                    left-icon="music-o"
                    placeholder="请输入密码"
                    type="password"
                    @blur="pwd = false"
                    @focus="pwd = true"
                >
                    <template #left-icon>
                        <img
                            v-if="!pwd"
                            src="@assets/images/login/pwd.png"
                            alt=""
                        />
                        <img
                            v-else
                            src="@assets/images/login/pwd-focus.png"
                            alt=""
                        />
                    </template>
                </van-field>
                <div class="rem-psd">
                    <van-checkbox
                        v-model="checked"
                        checked-color="#3f98ff"
                        shape="square"
                        >记住密码</van-checkbox
                    >
                </div>
                <div class="login-button" @click="postLogin">登录</div>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: "",
            pwd: false,
            user: false,
            checked: false
        };
    },
    created() {
        const vm = this;
        let rememberpsd = JSON.parse(localStorage.getItem("rememberpsd"));
        if (rememberpsd) {
            vm.checked = rememberpsd.checked;
            vm.username = rememberpsd.account;
            vm.password = rememberpsd.password
                ? vm.base64.decode(rememberpsd.password)
                : "";
        } else {
            localStorage.setItem(
                "rememberpsd",
                JSON.stringify({
                    account: "",
                    password: "",
                    checked: false
                })
            );
        }
    },
    methods: {
        postLogin: async function() {
            let vm = this;
            if (!vm.username) {
                vm.$toast("请输入用户名");
                return;
            }
            if (!vm.password) {
                vm.$toast("请输入密码");
                return;
            }
            const loading = vm.$toast.loading({
                message: "登陆中...",
                forbidClick: true
            });
            const res = await vm.http.get(vm.api.login, {
                account: vm.username,
                password: vm.password
            });
            loading.clear();
            if (!res) {
                return;
            }
            let result = res.data;
            if (result.code === 200) {
                vm.cookie.set("yinshui_test_token", result.ret);
                const userinfo = await vm.http.get(vm.api.permissionInfo, {});

                if (!userinfo) {
                    return;
                }
                result = userinfo.data;
                localStorage.setItem(
                    "userInfo",
                    JSON.stringify(result.auth_token)
                );
                vm.$toast.success("恭喜您登陆成功");
                if (vm.checked) {
                    localStorage.setItem(
                        "rememberpsd",
                        JSON.stringify({
                            account: vm.username,
                            password: vm.base64.encode(vm.password),
                            checked: true
                        })
                    );
                } else {
                    localStorage.setItem(
                        "rememberpsd",
                        JSON.stringify({
                            account: "",
                            password: "",
                            checked: false
                        })
                    );
                }
                vm.$router.push({ name: "home" });
            } else {
                vm.$toast.fail(result.result);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;
    height: 100%;
    .page-header {
        height: 30%;
        background: url("~@assets/images/login/login-bg.jpg") no-repeat 0 0;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 80px;
        }
    }
    .page-body {
        flex: 1;
        padding: 30px;
        display: flex;
        flex-direction: column;
        .rem-psd {
            display: flex;
            justify-content: flex-end;
            margin-top: 10px;
        }
        .login-button {
            margin-top: 40px;
            background-color: #3f98ff;
            color: #ffffff;
            border-radius: 100px;
            font-size: 16px;
            height: 47px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    ::v-deep {
        .van-field__control {
            // background-color: rgb(232, 240, 254);
            height: 42px;
            font-size: 17px;
            color: #000;
        }
        .van-field__left-icon {
            display: flex;
            align-items: center;
            margin-right: 10px;
        }
    }
}
</style>