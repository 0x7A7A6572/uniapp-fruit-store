<template>
  <view class="layout-welfare-zone">
    <view class="welfare-zone main-color-red" @click="goWelfarePage">
      <text class="__title">新用户首单福利</text>
      <text class="__desc">全场享惊喜折扣</text>
      <text class="__go main-color-red">立即购 ></text>
      <image class="__bg" src="../static/images/gift.png" />
    </view>
    <view class="welfare-zone main-color-yellow" @click="goActivityPage">
      <text class="__title">活动专区</text>
      <text class="__desc">优惠好品享不停</text>
      <text class="__go main-color-yellow">立即去 ></text>
      <image class="__bg" src="../static/images/activity.png" />
    </view>
  </view>
</template>

<script>
// import img_gift from "@/static/images/gift.png";
export default {
  name: "welfare-zone",
  // components: { img_gift },
  setup() {
    function goWelfarePage() {
      console.log("NavChange -> welfare");
      uni.navigateTo({
        url: "/pages/welfare/welfare",
      });
    }

    function goActivityPage() {
      console.log("NavChange -> promotions");
      uni.navigateTo({
        url: "/pages/promotions/promotions",
      });
    }

    return {
      goWelfarePage,
      goActivityPage,
    };
  },
};
</script>

<style scope>
.layout-welfare-zone {
  display: flex;
  z-index: 1;
}
.welfare-zone {
  position: relative;
  min-height: 6em;
  height: 100px;
  width: 50%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  /* background-color: rgb(255 57 57 / 21%); */
  margin: 10px 10px;
  font-weight: bold;
}
.__title {
  font-size: larger;
  /* color: red; */
  padding: 10px;
    z-index: 1;
}
.__desc {
  margin-top: -5px;
  padding: 0px 10px;
  /* color: red; */
  font-size: smaller;
    z-index: 1;
}
.__go {
  padding: 2px 5px;
  margin: 10px;
  width: fit-content;
  /* background-color: red; */
  color: white;
  border-radius: 10px;
    z-index: 1;
}
.__bg {
  position: absolute;
  right: 5px;
  transform: rotate(350deg);
  bottom: 5px;
  width: 15vw;
  height: 15vw;
}
.__bg:hover {
  transform: rotate(360deg);
}

view.main-color-red {
  background-color: rgb(255 57 57 / 21%);
  color: red;
}

.__go.main-color-red {
  background-color: red;
}

view.main-color-yellow {
  background-color: rgb(255 136 0 / 21%);
  color: orange;
}

.__go.main-color-yellow {
  background-color: orange;
}
</style>
