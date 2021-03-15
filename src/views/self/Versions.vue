<template>
    <div class="page">
        <van-nav-bar
            title="版本"
            left-text=""
            left-arrow
            @click-left="$router.go(-1)"
        >
        </van-nav-bar>
        <div class="page-main">
            <div class="logo">
                <img src="@assets/images/login/logo.png" alt="" />
            </div>
            <div class="title">中宁水务安全运营信息平台</div>
            <div class="ver">Version 1.0.0</div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page {
    height: 100%;
    display: flex;
    flex-direction: column;
    .page-main {
        flex: 1;
        display: flex;
        // justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        padding-top: 30%;
        .logo {
            margin-bottom: 30px;
            img {
                width: 90px;
            }
        }
        .title {
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .ver {
            font-size: 18px;
        }
    }
}
</style>