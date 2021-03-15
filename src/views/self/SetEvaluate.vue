<template>
    <div class="page">
        <van-nav-bar
            title="评价"
            left-text=""
            left-arrow
            @click-left="$router.go(-1)"
        >
        </van-nav-bar>
        <div class="page-main">
            <div class="group">
                <van-field name="rate" label="等级">
                    <template #input>
                        <van-rate v-model="evaluate" />
                    </template>
                </van-field>
                <van-field
                    v-model="text"
                    rows="2"
                    autosize
                    label="评价"
                    type="textarea"
                    maxlength="50"
                    placeholder="请填写您的宝贵意见"
                    show-word-limit
                />
                <div class="button" @click="submit">提交</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            evaluate: 0,
            text: ""
        };
    },
    methods: {
        async submit() {
            const vm = this;
            vm.$toast.success("感谢您真诚的评价，今后我们会更加努力！");
            setTimeout(() => {
                vm.$router.back();
            }, 2000);
        }
    }
};
</script>

<style lang="scss" scoped>
.page {
    height: 100%;
    display: flex;
    flex-direction: column;
    .group {
        margin: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        padding: 30px 15px;
        .button {
            width: 100%;
            height: 40px;
            background: #2264ee;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 15px;
            font-weight: 400;
            color: #fff;
            margin-top: 10px;
        }
    }
}
</style>