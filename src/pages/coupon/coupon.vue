<template>
  <view>
    <cui-logo-navbar
      class="logo-nav"
      :height="navHeight"
      :statusBarHeight="statusBarHeight"
      :isBack="true"
    >
    </cui-logo-navbar>
    <view class="coupon_list" :style="{ paddingTop: navHeight + 'px' }">
      <view
        v-for="item in coupons"
        class="coupon_item"
        :key="item"
        @click.stop="couponClick(item)"
      >
        <view class="l-tickets">
          <view>
            <text class="title">优惠券</text><br />
            <text style="font-size: 16px">满{{ item.fillPrice }}元使用</text>
          </view>
          <view class="price">{{ item.couponPrice }}</view>
        </view>
        <view class="r-tickets validTime">
          {{ item.couponStart }}
          <view> - </view>
          {{ item.couponEnd }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { onLoad } from "@dcloudio/uni-app";
import cuiLogoNavbar from "@/components/cui-logo-navbar.vue";
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  components: { cuiLogoNavbar },
  setup() {
    const store = useStore();
    let coupons = store.getters.coupons;
    let isSelectMode = ref(false);
    let selectModeTotalMoney = 0;

    onLoad((options) => {
      console.log("上一个界面传过来的值：", options);
      if (options.msg == "onSelectCouponClick") {
        selectModeTotalMoney = options.totalMoney;
        isSelectMode.value = true;
      }
    });

    function couponClick(coupon) {
      if (isSelectMode) {
        if (selectModeTotalMoney >= coupon.fillPrice) {
          console.log("选择了优惠券：", coupon.desc);
          store.commit("updateSelectCoupon", coupon);
        }else{
          uni.showToast({title:"未满足使用条件",icon:"none"})
        }
        uni.navigateBack();
      }
    }

    return {
      coupons,
      couponClick,
      navHeight: useStore().getters.nvaHeight,
      statusBarHeight: useStore().getters.statusBar,
    };
  },
};
</script>

<style>
.coupon_list {
  width: 100vw;
  height: 100vh;
  padding: 10px;
  /* background-color: #ccc; */
}
.coupon_item {
  /* width: 100%; */
  height: 130px;
  margin: 10px;
  display: flex;
  text-align: center;
  font-family: fantasy;
}
.coupon_item_desc {
  background-color: red;
  color: rgb(255, 217, 0);
  font-size: 30px;
  flex: 1;
  /* -webkit-mask: radial-gradient(circle at left center, transparent 10px, red 10px); 
        */
}

.l-tickets {
  width: 75%;
  position: relative;
  background: radial-gradient(
        circle at right top,
        transparent 16rpx,
        red 0,
        rgb(255, 100, 39) 100%
      )
      right top / 100% 50% no-repeat,
    radial-gradient(
        circle at right bottom,
        transparent 16rpx,
        red 0,
        rgb(255, 100, 39) 100%
      )
      right bottom / 100% 50% no-repeat;
  filter: drop-shadow(-3px 0 3px rgba(255, 100, 0, 0.8));
  display: flex;
  /* flex-direction: column; */
  color: rgb(255, 230, 0);
  padding: 10px;
}
.l-tickets::after {
  content: "";
  position: absolute;
  height: 100%;
  width: 8rpx;
  top: 0;
  left: -8rpx;
  background: radial-gradient(circle at left center, transparent 8rpx, red 0) left center /
    8rpx 20rpx;
}
.r-tickets {
  flex: 1;
  position: relative;
  background: radial-gradient(
        circle at left top,
        transparent 16rpx,
        rgb(255, 75, 75) 0,
        red 100%
      )
      right top / 100% 50% no-repeat,
    radial-gradient(
        circle at left bottom,
        transparent 16rpx,
        rgb(255, 100, 100) 0,
        red 100%
      )
      right bottom / 100% 50% no-repeat;
  filter: drop-shadow(-3px 0 3px rgba(255, 100, 0, 0.8));
  padding: 10px;
}
.r-tickets::before {
  content: "";
  width: 1rpx;
  background: linear-gradient(to top, #fff 0%, #fff 50%, transparent 50%) top left / 1rpx
    20rpx repeat-y;
  position: absolute;
  left: 0;
  top: 16rpx;
  bottom: 16rpx;
}
.r-tickets::after {
  content: "";
  position: absolute;
  height: 100%;
  width: 8rpx;
  top: 0;
  right: -8rpx;
  background: radial-gradient(circle at right center, transparent 8rpx, red 0) right
    center / 8rpx 20rpx;
}

.l-tickets .title {
  text-align: center;
  font-size:  xx-large;
  margin: auto;
  color: white;
  /* font-weight: bold; */
}
.l-tickets text {
  text-align: center;
  margin: auto;
  color: rgb(255, 230, 0);
}

/* .r-tickets view {
  font-size: 40px;
  height: 100%;
  margin: auto;
  color: rgb(255, 237, 79);
  font-weight: bold;
} */

.validTime {
  text-align: center;
  color: white;
  flex: 1;
  font-size: 16px;
  margin: auto;
  height: 100%;
}
.price {
  font-size: 60px;
  margin: auto;
}
.price::before {
  content: "￥";
  margin-right: -10px;
}
</style>
