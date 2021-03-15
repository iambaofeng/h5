<template>
    <router-layout id="__index">
        <router-view></router-view>
        <van-tabbar slot="footer" :fixed="false" route border>
            <van-tabbar-item
                v-for="(item, index) in footerList"
                :key="index"
                replace
                :to="item.path"
            >
                <span class="tabbar-title">{{ item.name }}</span>
                <template #icon="props">
                    <img
                        class="tabbar-img"
                        :src="props.active ? item.active : item.inactive"
                    />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </router-layout>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            /**
             * 移动端底部
             * **/
            footerList: [
                {
                    name: "首页",
                    path: "/home",
                    inactive: require("@assets/images/icon1_sy.png"),
                    active: require("@assets/images/icon1_sy_sel.png")
                },
                {
                    name: "tab",
                    path: "/tab",
                    inactive: require("@assets/images/icon2_gc.png"),
                    active: require("@assets/images/icon2_gc_sel.png")
                },
                {
                    name: "swip",
                    path: "/swipe",
                    inactive: require("@assets/images/icon5_dt.png"),
                    active: require("@assets/images/icon5_dt_sel.png")
                },
                {
                    name: "我的",
                    path: "/self",
                    inactive: require("@assets/images/icon4_wd.png"),
                    active: require("@assets/images/icon4_wd_sel.png")
                }
            ]
        };
    },
    created() {
        const vm = this;
        if (vm.$store.getters.getUnitList.length > 0) {
        } else {
            vm.getUnitList();
        }
        const menu = JSON.parse(localStorage.getItem("userInfo")).menu;
        vm.footerList = vm.footerList.filter(item => {
            let obj = {};
            menu.forEach(element => {
                if (element.menu__name.includes(item.name)) {
                    console.log(item);
                    obj = item;
                }
            });
            return obj;
        });
    },
    methods: {
        // 获取所有可选对象列表并放入全局
        async getUnitList() {
            const vm = this;
            const params = {};
            const res = await vm.http.get(vm.api.ArchivesUnitSch, params);
            if (!res) {
                return;
            }
            const result = res.data;
            if (result.code === 200) {
                vm.$store.commit("setUnitList", result.ret);
            } else {
            }
        }
    }
};
</script>

<style scoped lang="scss">
.warp {
    height: 100%;
    display: flex;
    flex-direction: column;
    // .contents {
    //     flex: 1;
    // }
    ::v-deep {
        .van-tabbar {
            height: 58px;
        }
        .tabbar-title {
        }
        .tabbar-img {
            width: 27px;
            height: 27px;
        }
    }
}
</style>
