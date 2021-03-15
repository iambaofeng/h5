<template>
    <!-- <div id="mobile">
        <transition :name="transitionName">
            <router-view></router-view>
        </transition>
    </div> -->
    <vue-route-transition id="app" :keepAlive="true"> </vue-route-transition>
</template>




<script>
export default {
    name: "App",
    data() {
        return {
            transitionName: ""
        };
    },
    watch: {
        // $route(to, from) {
        //     const toRouterLevel = to.meta.routerLevel;
        //     const fromRouterLevel = from.meta.routerLevel;
        //     console.log(fromRouterLevel);
        //     console.log(toRouterLevel);
        //     // console.log(to, from)
        //     // const toDepth = to.path.split('/').length
        //     // const fromDepth = from.path.split('/').length
        //     // console.log(to.path)
        //     // console.log(from.path)
        //     if (toRouterLevel > fromRouterLevel) {
        //         console.log("slide-left");
        //         this.transitionName = "slide-left";
        //     } else if (toRouterLevel < fromRouterLevel) {
        //         console.log("slide-right");
        //         this.transitionName = "slide-right";
        //     }
        // }
    }
};
</script>

<style lang="scss">
//必须样式

* {
    margin: 0;
    padding: 0;
}

html,
body {
    min-width: 320px;
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
}
body {
    background: #f1f1f1;
}
#app {
    max-width: 750px; /* 插件会自动解析成10rem */
    // height: 1334px;
    margin: 0 auto;
}
// .slide-right-enter-active,
// .slide-right-leave-active,
// .slide-left-enter-active,
// .slide-left-leave-active {
//     will-change: transform;
//     transition: all 0.5s;
//     position: absolute;
//     height: 100vh;
// }
// .slide-right-enter {
//     opacity: 0;
//     transform: translate3d(-100%, 0, 0);
// }
// .slide-right-leave-active {
//     opacity: 0;
//     transform: translate3d(100%, 0, 0);
// }
// .slide-left-enter {
//     opacity: 0;
//     transform: translate3d(100%, 0, 0);
// }
// .slide-left-leave-active {
//     opacity: 0;
//     transform: translate3d(-100%, 0, 0);
// }

//全局vant样式
//标题栏
.van-nav-bar {
    background-color: #3f98fa;
}
.van-nav-bar .van-icon {
    color: #fff;
}
.van-nav-bar__title {
    color: #fff;
}
</style>
