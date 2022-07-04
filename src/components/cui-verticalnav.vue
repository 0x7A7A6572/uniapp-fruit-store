<template>
  <view class="goods-show">
    <!-- 商品列表 -->
    <view class="VerticalBox">
      <scroll-view
        :hidden="goodsClass.length <= 1"
        class="VerticalNav nav bg-white"
        scroll-y
        scroll-with-animation
        style="height: calc(100vh - 375rpx)"
      >
        <view
          :class="'cu-item ' + (index == TabCur ? 'text-orange cur' : '')"
          v-for="(item, index) in goodsClass"
          :key="index"
          :data-id="index"
        >
          {{ item.className }}
        </view>
      </scroll-view>
      <scroll-view
        class="VerticalMain"
        scroll-y
        scroll-with-animation
        style="height: calc(100vh - 375rpx)"
        :scroll-into-view="'main-' + MainCur"
      >
        <!--bindscroll="VerticalMain"> -->
        <view
          class="padding-top padding-lr"
          v-for="(item, index) in goodsClass"
          :key="index"
        >
          <view class="cu-bar solid-bottom bg-white">
            <view class="action">
              <text class="cuIcon-title text-orange"></text> {{ item.className }}
            </view>
          </view>
          <view class="cu-list menu-avatar">
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

    <!-- <i-load-more tip="暂无数据" loading="{{ false }}" /> -->
  </view>
</template>

<script>
import cuiGoodsItem from "@/components/cui-goods-item.vue";
import selloutImage from "@/static/images/sellout.png";
export default {
  name: "cui-vertivalnav",
  components: { cuiGoodsItem },
  props: {
    tobuy: { type: Function },
    itemclick: { type: Function },
    goodsClass: { type: Array },
  },
  data() {
    return {
      tabCur: 0,
      selloutImage: selloutImage,
      list: [],
      tabCur: 0,
      mainCur: 0,
      load: true,
    };
  },
  onLoad() {
    uni.showLoading({
      title: "加载中...",
      mask: true,
    });
    let list = [{}];
    for (let i = 0; i < 26; i++) {
      list[i] = {};
      list[i].name = String.fromCharCode(65 + i);
      list[i].id = i;
    }
    this.list = list;
    this.listCur = list[0];
  },
  onReady() {
    uni.hideLoading();
  },
  methods: {
    TabSelect(e) {
      this.tabCur = e.currentTarget.dataset.id;
      this.mainCur = e.currentTarget.dataset.id;
    },
    VerticalMain(e) {
      // #ifdef MP-ALIPAY
      return false; //支付宝小程序暂时不支持双向联动
      // #endif
      let that = this;
      let tabHeight = 0;
      if (this.load) {
        for (let i = 0; i < this.list.length; i++) {
          let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
          view
            .fields(
              {
                size: true,
              },
              (data) => {
                this.list[i].top = tabHeight;
                tabHeight = tabHeight + data.height;
                this.list[i].bottom = tabHeight;
              }
            )
            .exec();
        }
        this.load = false;
      }
      let scrollTop = e.detail.scrollTop + 10;
      for (let i = 0; i < this.list.length; i++) {
        if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
          this.verticalNavTop = (this.list[i].id - 1) * 50;
          this.tabCur = this.list[i].id;
          console.log(scrollTop);
          return false;
        }
      }
    },
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
  height: 50px;
  position: relative;
}

.VerticalNav.nav .cu-item.cur {
  background-color: #f1f1f1;
}

.VerticalNav.nav .cu-item.cur::after {
  content: "";
  width: 8upx;
  height: 30upx;
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
}

.VerticalMain {
  background-color: #f1f1f1;
  flex: 1;
}

.goods-show {
  background-color: white;
}
</style>
