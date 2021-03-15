<template>
    <div class="page">
        <div class="userinfo-header">
            <div class="photo">
                <router-link
                    :to="{ name: 'selfSetPhoto' }"
                    class="photo-button"
                >
                    <img src="@assets/images/self/zhaoxiang.png" alt="" />
                </router-link>
            </div>
            <div class="userinfo-box">
                <div class="user-icon" @click="$router.push('/self/setPhoto')">
                    <van-image
                        round
                        width="62px"
                        height="62px"
                        :src="
                            userInfo.img_url ? userInfo.img_url : defaultHeadImg
                        "
                    />
                </div>
                <div class="user-info">
                    <div class="user-name">
                        {{ userInfo.nickname }}
                    </div>
                    <div class="user-account">
                        账号:<span class="account">{{
                            userInfo.username
                        }}</span>
                    </div>
                </div>
            </div>
        </div>
        <van-cell-group>
            <van-cell
                title="性别"
                is-link
                :value="userInfo.sex"
                @click="openSexShow"
            >
                <template #icon>
                    <img
                        slot="icon"
                        width="20"
                        style="display:block;margin-right:5px;"
                        src="@assets/images/self/sex.png"
                        alt=""
                    />
                </template>
            </van-cell>
            <van-cell
                title="手机号"
                is-link
                :value="userInfo.phone"
                @click="openPhoneShow"
            >
                <img
                    slot="icon"
                    width="20"
                    style="display:block;margin-right:5px;"
                    src="@assets/images/self/phone.png"
                    alt=""
                />
            </van-cell>
            <van-cell
                title="邮箱"
                is-link
                :value="userInfo.email"
                @click="openEmailShow"
            >
                <img
                    slot="icon"
                    width="20"
                    style="display:block;margin-right:5px;"
                    src="@assets/images/self/email.png"
                    alt=""
                />
            </van-cell>
        </van-cell-group>
        <van-cell-group style="margin-top:10px">
            <van-cell title="设置" is-link @click="$router.push('/self/set')">
                <template #icon>
                    <img
                        slot="icon"
                        width="20"
                        style="display:block;margin-right:5px;"
                        src="@assets/images/self/set.png"
                        alt=""
                    />
                </template>
            </van-cell>
        </van-cell-group>

        <div class="login-out">
            <div class="login-out-button" @click="loginOut">
                注销
            </div>
        </div>
        <van-dialog v-model="sexShow" title="更改性别" show-cancel-button>
            <van-field name="性别" label="性别">
                <template #input>
                    <van-radio-group v-model="sex" direction="horizontal">
                        <van-radio name="男">男</van-radio>
                        <van-radio name="女">女</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
        </van-dialog>
        <van-dialog v-model="phoneShow" title="更改电话" show-cancel-button>
            <van-field name="电话" label="电话" v-model="phone"> </van-field>
        </van-dialog>
        <van-dialog v-model="emailShow" title="更改邮箱" show-cancel-button>
            <van-field name="邮箱" label="邮箱" v-model="email"> </van-field>
        </van-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            emailShow: false,
            phoneShow: false,
            sexShow: false,
            userInfo: "",
            defaultHeadImg: require("@assets/images/self/user.jpg"),
            sex: "",
            phone: "",
            email: ""
        };
    },
    created() {
        const vm = this;
        vm.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        console.log(vm.userInfo);
    },
    methods: {
        openEmailShow() {
            const vm = this;
            vm.email = vm.userInfo.email;
            vm.emailShow = true;
        },
        openPhoneShow() {
            const vm = this;
            vm.phone = vm.userInfo.phone;
            vm.phoneShow = true;
        },
        openSexShow() {
            const vm = this;
            vm.sex = vm.userInfo.sex;
            vm.sexShow = true;
        },
        async loginOut() {
            const vm = this;
            const loading = vm.$toast.loading("注销中...");
            const res = await vm.http.get(vm.api.logout);
            if (!res) {
                return;
            }
            const result = res.data;
            if (result.code === 200) {
                loading.clear();
                vm.cookie.delCookie("yinshui_test_token");
                vm.$router.push({ name: "login" });
                vm.$toast.success("注销成功");
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
    background-color: #ededed;
    .userinfo-header {
        background-color: #fff;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        .photo {
            display: flex;
            justify-content: flex-end;
            height: 46px;
            align-items: center;
            .photo-button {
                margin-right: 10px;
            }
            img {
                width: 25px;
                height: 25px;
            }
        }
        .userinfo-box {
            display: flex;
            .user-icon {
                width: 93px;

                display: flex;
                align-items: center;
                justify-content: center;
            }
            .user-info {
                height: 85px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .user-account {
                    margin-top: 10px;
                    color: #999;
                    font-size: 14px;
                    .account {
                        margin-left: 10px;
                    }
                }
                .user-name {
                    font-size: 16px;
                    font-weight: bold;
                }
            }
        }
    }
    .userinfo-main {
        display: flex;
        flex-direction: column;
    }
    .login-out {
        // width: 100%;
        padding-left: 15px;
        padding-right: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 25px;
        .login-out-button {
            width: 100%;
            background: linear-gradient(90deg, rgb(255, 0, 0), rgb(255, 0, 0));
            color: rgb(255, 255, 255);
            border-radius: 99px;
            height: 44px;
            justify-content: center;
            align-items: center;
            display: flex;
            font-size: 18px;
        }
    }
}
</style>