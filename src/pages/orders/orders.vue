<template>
  <view class="order-page">
    <cui-logo-navbar
      class="logo-nav"
      :height="navHeight"
      :statusBarHeight="statusBarHeight"
      :isBack="true"
    >
    </cui-logo-navbar>

    <scroll-view scroll-x class="nav">
      <view class="flex text-center">
        <view
          class="cu-item flex-sub"
          :class="index == TabCur ? 'text-orange cur' : ''"
          v-for="(item,index) in orderTab"
          :key="item"
          @tap="tabSelect"
          :data-id="index"
        >
          {{ item }}
        </view>
      </view>
    </scroll-view>
    <view class="order-list">
      <cui-order-card></cui-order-card>
    </view>
  </view>
</template>

<script>
import CONST from "@/utils/const.js";
import { useStore } from "vuex";
import cuiLogoNavbar from "@/components/cui-logo-navbar.vue";
import cuiOrderCard from "@/components/cui-order-card.vue";

export default {
  data() {
    return {
      logosrc: "/static/images/logo.png",
      navHeight: useStore().getters.nvaHeight,
      statusBarHeight: useStore().getters.statusBar,
      orderTab: CONST.orderTab,
      TabCur: 0,
      scrollLeft: 0,
    };
  },
  methods: {
    back: () => {
      console.log("Page bacak ->");
      uni.navigateBack();
    },
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
  },
  components: {
    cuiLogoNavbar,
    cuiOrderCard,
    useStore,
  },
};
</script>

<style scope>
.order-page{
  background-color: rgb(228, 228, 228);
  height: 100vh;
}
.order-tab {
  display: flex;
  width: 100%;
}

</style>
