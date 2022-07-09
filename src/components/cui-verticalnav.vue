<template>
    <view class="VerticalBox">
      <!-- 侧栏列表 -->
      <scroll-view
        class="VerticalNav nav"
        scroll-y
        scroll-with-animation
        :scroll-top="verticalNavTop"
        style="height: calc(100vh - 375upx)"
      >
      <view class="cuIcon-search bg-white text-bold cu-item"></view>
        <view
          class="cu-item"
          :class="index == tabCur ? 'text-orange cur' : ''"
          v-for="(item, index) in goodsClass"
          :key="index"
          @tap="TabSelect"
          :data-id="index"
        >
          {{ item.className }}
        </view>
      </scroll-view>

      <!-- 商品列表 -->
      <scroll-view
        class="VerticalMain"
        scroll-y
        scroll-with-animation
        style="height: calc(100vh - 375rpx)"
        :scroll-into-view="'main-' + mainCur"
        @scroll="VerticalMain"
      >
        <!--bindscroll="VerticalMain"> -->
        <view
          class="padding-top padding-lr"
          v-for="(item, index) in goodsClass"
          :key="index"
          :id="'main-' + index"
        >
          <view class="cu-bar solid-bottom bg-white">
            <view class="action">
              <text class="cuIcon-title text-orange"></text> {{ item.className }}
            </view>
          </view>
          <view class="cu-list">
            <view
              class="cu-item"
              v-for="(_item, _index) in item.classGoods"
              :key="_index"
            >
              <cui-goods-item
                :item="_item"
                :selloutImage="selloutImage"
                :tobuy="tobuy"
                :itemclick="itemclick"
              ></cui-goods-item>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
</template>

<script>
import cuiGoodsItem from "@/components/cui-goods-item.vue";
import { ref } from "vue";
import selloutImage from "@/static/images/sellout.png";
export default {
  name: "cui-vertivalnav",
  components: { cuiGoodsItem },
  props: {
    tobuy: { type: Function },
    itemclick: { type: Function },
    goodsClass: { type: Array },
  },
  setup(props) {
    let verticalNavTop = ref(0);
    let tabCur = ref(0);
    let mainCur = ref(0);
    let load = ref(true);
    
function TabSelect(e) {
      tabCur.value = e.currentTarget.dataset.id;
      mainCur.value = e.currentTarget.dataset.id;
      verticalNavTop.value = (e.currentTarget.dataset.id - 1) * 50;
    }

  function  VerticalMain(e) {
      // let tabHeight = 0;
      // if (load) {
      //   for (let i = 0; i < props.goodsClass.length; i++) {
      //     let view = uni.createSelectorQuery().select("#main-" + props.goodsClass[i].id);
      //     view.fields(
      //         {
      //           size: true,
      //         },
      //         (data) => {
      //           props.goodsClass.top = tabHeight;
      //           tabHeight = tabHeight + data.height;
      //           props.goodsClass.bottom = tabHeight;
      //         }
      //       )
      //       .exec();
      //   }
      //  load = false;
      // }
      // let scrollTop = e.detail.scrollTop + 10;
      // for (let i = 0; i < props.goodsClass.length; i++) {
      //   if (scrollTop > props.goodsClass[i].top && scrollTop < props.goodsClass[i].bottom) {
      //     verticalNavTop.value = (props.goodsClass[i].id - 1) * 50;
      //    tabCur.value = props.goodsClass[i].id;
      //     console.log(scrollTop);
      //     return false;
      //   }
      // }
    }
    return {
      mainCur,
      tabCur,
      verticalNavTop,
      TabSelect,VerticalMain,selloutImage
    };
  },
};
</script>

<style>
.fixed {
  position: fixed;
  z-index: 99;
}

.VerticalNav.nav {
  width: 200upx;
  white-space: initial;
}

.VerticalNav.nav .cu-item {
  width: 100%;
  text-align: center;
  background-color: #fff;
  margin: 0;
  border: none;
  height: auto !important;
  position: relative;
}

.VerticalNav.nav .cu-item.cur {
  background-color: #f1f1f1;
}

.VerticalNav.nav .cu-item.cur::after {
  content: "";
  width: 8upx;
  /* height: 30upx; */
  border-radius: 10upx 0 0 10upx;
  position: absolute;
  background-color: currentColor;
  top: 0;
  right: 0upx;
  bottom: 0;
  margin: auto;
}

.VerticalBox {
  display: flex;
  background-color: white;
  /* height: 100%; */
}

.VerticalMain {
  background-color: #f1f1f1;
  flex: 1;
  padding-bottom: 15vh;
}

</style>
