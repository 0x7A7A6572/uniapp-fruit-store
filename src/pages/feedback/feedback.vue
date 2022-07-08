<template>
  <view class="layout-feedback" :style="{ paddingTop: navHeight + 'px' }">
    <cui-logo-navbar
      class="logo-nav"
      :height="navHeight"
      :statusBarHeight="statusBarHeight"
      :isBack="true"
    >
    </cui-logo-navbar>
    <view class="cu-bar bg-white margin-top text-bold text-xl">
      <view class="action"> 图片上传 </view>
      <view class="action"> {{ imgList.length }}/4 </view>
    </view>
    <view class="cu-form-group">
      <view class="grid col-4 grid-square flex-sub">
        <view
          class="bg-img"
          v-for="(item, index) in imgList"
          :key="index"
          @tap="ViewImage"
          :data-url="imgList[index]"
        >
          <image :src="imgList[index]" mode="aspectFill"></image>
          <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
            <text class="cuIcon-close"></text>
          </view>
        </view>
        <view class="solids" @tap="ChooseImage" v-if="imgList.length < 4">
          <text class="cuIcon-cameraadd"></text>
        </view>
      </view>
    </view>
    <view class="title cu-bar bg-white text-bold text-xl margin-top padding-left"
      >建议/问题描述</view
    >
    <view class="cu-form-group align-start">
      <textarea
        maxlength="-1"
        @input="textareaBInput"
        placeholder="详细描述问题发生的操作，是否可复现等，建议上传问题截图"
      ></textarea>
    </view>
    <button @tap="send">提交</button>
  </view>
</template>

<script>
import cuiLogoNavbar from "@/components/cui-logo-navbar.vue";
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  components: { cuiLogoNavbar },
  setup() {
    let imgList = ref([]);
    let textareaBValue = ref("");

    function send() {
      uni.showToast({
        title: "感谢您宝贵的建议",
        icon: "success",
      });
    }

    function ViewImage(e) {
      uni.previewImage({
        urls: imgList.value,
        current: e.currentTarget.dataset.url,
      });
    }

    function ChooseImage() {
      uni.chooseImage({
        count: 4, //默认9
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], //从相册选择
        success: (res) => {
          if (imgList.length != 0) {
            imgList.value = imgList.value.concat(res.tempFilePaths);
          } else {
            imgList.value = res.tempFilePaths;
          }
        },
      });
    }

    function DelImg(e) {
      uni.showModal({
        title: "",
        content: "确定要删除？",
        cancelText: "取消",
        confirmText: "删除",
        success: (res) => {
          if (res.confirm) {
            imgList.value.splice(e.currentTarget.dataset.index, 1);
          }
        },
      });
    }

    function textareaBInput(e) {
      this.textareaBValue = e.detail.value;
    }

    return {
      imgList,
      ViewImage,
      ChooseImage,
      textareaBInput,
      DelImg,
      textareaBValue,
      send,
      navHeight: useStore().getters.nvaHeight,
      statusBarHeight: useStore().getters.statusBar,
    };
  },
};
</script>

<style>
.layout-feedback {
  height: 100vh;
  background: #eee;
}
.layout-feedback button {
  color: white;
  background-color: limegreen;
  border-radius: 2em;
  width: 90%;
  margin: 10px;
}
</style>
