<template>
    <div class="page">
        <van-nav-bar
            title="上传头像图片"
            left-text=""
            left-arrow
            @click-left="$router.go(-1)"
        >
            <template #right>
                <van-uploader :after-read="afterRead">
                    <van-icon name="ellipsis" size="23" />
                </van-uploader>
            </template>
        </van-nav-bar>
        <div class="page-main">
            <img width="100%" :src="img_url" alt="" />
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        img_url() {
            const vm = this;
            if (JSON.parse(localStorage.getItem("userInfo")).img_url) {
                return JSON.parse(localStorage.getItem("userInfo")).img_url;
            } else {
                return require("@assets/images/self/user.jpg");
            }
        },
        user_id() {
            const vm = this;
            return JSON.parse(localStorage.getItem("userInfo")).id;
        }
    },
    methods: {
        //
        afterRead(file) {
            //上传文件到服务器
            const vm = this;
            file.status = "uploading";
            file.message = "上传中...";
            vm.compressFile(file.file, async files => {
                let formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
                formData.append("file", files); //接口需要传的参数
                const params = formData;
                const res = await vm.http.upload(
                    vm.api.archivesFileUpload,
                    params
                );
                if (!res) {
                    return;
                }
                const result = res.data;
                if (result.code === 200) {
                    file.url = result.ret.path;
                    file.id = result.ret.id;
                    file.status = "done";
                    file.message = "上传成功";
                    vm.submitPhont(file);
                }
            });
        },
        //压缩图片
        compressFile(file, callback) {
            let fileObj = file;
            let reader = new FileReader();
            reader.readAsDataURL(fileObj); //转base64
            reader.onload = function(e) {
                let image = new Image(); //新建一个img标签（还没嵌入DOM节点)
                image.src = e.target.result;
                image.onload = function() {
                    let canvas = document.createElement("canvas"), // 新建canvas
                        context = canvas.getContext("2d"),
                        imageWidth = image.width / 2, //压缩后图片的大小
                        imageHeight = image.height / 2,
                        data = "";
                    canvas.width = imageWidth;
                    canvas.height = imageHeight;
                    context.drawImage(image, 0, 0, imageWidth, imageHeight);
                    data = canvas.toDataURL("image/jpeg"); // 输出压缩后的base64
                    let arr = data.split(","),
                        mime = arr[0].match(/:(.*?);/)[1], // 转成blob
                        bstr = atob(arr[1]),
                        n = bstr.length,
                        u8arr = new Uint8Array(n);
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }
                    let files = new window.File(
                        [new Blob([u8arr], { type: mime })],
                        file.name,
                        { type: "image/jpeg" }
                    ); // 转成file
                    callback(files); // 回调
                };
            };
        },
        async submitPhont(file) {
            const vm = this;
            const loaing = vm.$toast.loading("设置中...");
            const res = await vm.http.get(vm.api.editUserInfo, {
                user_id: vm.user_id,
                img_id: file.id
            });
            loaing.clear();
            if (!res) {
                return;
            }
            const result = res.data;
            if (result.code === 200) {
                localStorage.setItem(
                    "userInfo",
                    JSON.stringify(result.auth_token)
                );
            } else {
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
    background-color: #000;
    .page-main {
        flex: 1;
        display: flex;
        align-items: center;
    }
}
</style>