<template>
  <view>
    <cui-logo-navbar
      class="logo-nav"
      :height="navHeight"
      :statusBarHeight="statusBarHeight"
      :isBack="true"
    >
    </cui-logo-navbar>
    <view class="about" :style="{ paddingTop: navHeight + 'px' }">
      <view class="logo cu-avatar xl round margin-left">
        <img
          src="https://zzerx.cn/Artwork/art/pixel_painting/pixel_painting13.png"
        />
      </view>
      <view class="desc cu-list menu sm-border">
        <view class="flex padding-bottom solids-bottom cu-item arrow" @tap="copyLink('https://github.com/0x7A7A6572/uniapp-fruit-store')">
          <text class="cuIcon-github"> 桔乐小铺项目开源地址 </text>
        </view>
        <view class="content padding-top">
          <text class="text-grey cuIcon-fork">使用的开源项目</text>
        </view>
        <view class="cu-list grid col-4">
          <view
            class="cu-item"
            v-for="(item, index) in descs"
            :key="index"
            @tap="copyLink(item.link)"
          >
            <img class="project-logo" :src="item.logo" />
            <text>{{ item.text }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import cuiLogoNavbar from "@/components/cui-logo-navbar.vue";
import { useStore } from "vuex";
import img_uniapp from "@/static/images/uniapp.png";
import img_vue from "@/static/images/vue.png";
import img_colorui from "@/static/images/colorui.png";
import img_smartparse from "@/static/images/smartparse.png";

export default {
  components: { cuiLogoNavbar },
  setup() {
    let descs = [
      { logo: img_vue, text: "vue3", link: "https://v3.cn.vuejs.org/" },
      { logo: img_uniapp, text: "uniapp", link: "https://uniapp.dcloud.io/" },
      {
        logo: img_colorui,
        text: "colorui",
        link: "https://github.com/weilanwl/ColorUI",
      },
      {
        logo: img_smartparse,
        text: "smartParse",
        link: "https://github.com/wzc570738205/smartParsePro",
      },
    ];
    function copyLink(link) {
      uni.setClipboardData({
        data: link,
        success: function () {
          uni.showToast({title:"复制成功"})
        },
        fail: function(){
          uni.showToast({title:"复制失败",icon: "error"})
        }
      });
    }
    return {
      descs,copyLink,
      navHeight: useStore().getters.nvaHeight,
      statusBarHeight: useStore().getters.statusBar,
    };
  },
};
</script>

<style scoped>
.about {
  width: 100%;
  height: 100vh;
  background: orangered;
  text-align: center;
  padding: 10vw;
}
.about .logo {
  text-align: center;
  background-color: white;
  margin-bottom: 20px;
}
.logo img,
.logo image {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10px;
}
.desc {
  padding: 15px;
  background-color: white;
  border-radius: 1em;
}
.project-logo {
  padding: 4vw;
  object-fit: scale-down;
  max-height: 18vw;
}
</style>