<template>
    <div class="page">
        <van-nav-bar
            title="设置"
            left-text=""
            left-arrow
            @click-left="$router.back()"
        >
        </van-nav-bar>
        <div class="page-main">
            <van-cell-group>
                <van-cell
                    title="修改密码"
                    is-link
                    @click="$router.push('/self/setPassword')"
                >
                    <img
                        slot="icon"
                        width="20"
                        style="display:block;margin-right:5px;"
                        src="@assets/images/self/password.png"
                        alt=""
                    />
                </van-cell>
                <van-cell
                    title="评价"
                    is-link
                    @click="$router.push('/self/setEvaluate')"
                >
                    <img
                        slot="icon"
                        width="20"
                        style="display:block;margin-right:5px;"
                        src="@assets/images/self/pingjia.png"
                        alt=""
                    />
                </van-cell>
                <van-cell
                    title="版本"
                    is-link
                    @click="$router.push('/self/versions')"
                >
                    <img
                        slot="icon"
                        width="20"
                        style="display:block;margin-right:5px;"
                        src="@assets/images/self/banben.png"
                        alt=""
                    />
                </van-cell>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page {
    height: 100%;
    background-color: #ededed;
}
</style>