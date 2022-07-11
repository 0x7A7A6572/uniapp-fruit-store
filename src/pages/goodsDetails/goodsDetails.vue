<template>
  <view class="layout_details" :style="{ paddingTop: navHeight + 'px' }">
    <cui-logo-navbar
      class="logo-nav"
      :height="navHeight"
      :statusBarHeight="statusBarHeight"
      :isBack="true"
      :title="goods.goodsName"
    >
    </cui-logo-navbar>
    <image
      v-if="goods.video == null"
      class="radius-style"
      :src="goods.imgMain"
      mode="widthFix"
    />
    <video v-else :show-fullscreen-btn="true" :src="goods.video" object-fit="cover" />

    <view class="cu-list menu sm-border card-menu margin bg-white">
      <view class="cu-item">
        <view class="content">
          <text class="goods-style-desc text-grey">品名：</text>
          <text class="goods-style-select padding-left">{{ goods.goodsName }}</text>
        </view>
      </view>

      <view class="cu-item">
        <view class="content">
          <text class="goods-style-desc text-grey">价格：</text>
          <text class="goods-style-select padding-left text-orange text-bold"
            >￥{{ goods.goodsPrice }}</text
          >
        </view>
      </view>

      <view class="cu-item">
        <view class="content">
          <text class="goods-style-desc text-grey">规格：</text>
          <text class="goods-style-select padding-left">{{
            goods.goodsWeight + "斤/" + goods.goodsPack
          }}</text>
        </view>
      </view>

      <view class="cu-item">
        <view class="content">
          <text class="goods-style-desc text-grey">详细：</text>
        </view>
      </view>
      <image
        class="max-width"
        v-for="item in swiperImage"
        :src="item"
        mode="widthFix"
        :key="item"
      />
    </view>

    <view class="flxed-bottom cu-bar bg-white tabbar border shop text-larger">
      <view class="action text-red"> <view class="cuIcon-likefill"></view> 已收藏 </view>
      <view class="action" @click.stop="gotoShopingcart">
        <view class="cuIcon-cart">
          <!-- <view class="cu-tag badge">{{ shopingcartLenght }}</view> -->
        </view>
        购物车
      </view>
      <view class="btn-group">
        <button class="cu-btn bg-orange round shadow-blur" @click.stop="tobuy(goods)">
          加入购物车
        </button>
        <button class="cu-btn bg-red round shadow-blur">立即购买</button>
      </view>
    </view>
    <!-- 点击购物后出现的弹窗 -->
    <cui-shoping-cart-dialog
      v-if="shopingCartDialogShow"
      v-model:show="shopingCartDialogShow"
      :item="goods"
      :orgiinStock="orgiinStock"
      :onSelectCouponClick="onSelectCouponClick"
      :onSelectAddrClick="onSelectAddrClick"
      :onClickAddShopingcart="onClickAddShopingcart"
      :onClickBuyNow="onClickBuyNow"
    />
  </view>
</template>

<script>
import cuiLogoNavbar from "@/components/cui-logo-navbar.vue";
import cuiRotationChart from "@/components/cui-rotation-chart.vue";
import combButton from "@/components/comb-button.vue";
import cuiCounter from "@/components/cui-counter.vue";
import cuiShopingCartDialog from "@/components/cui-shoping-cart-dialog.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { onLoad } from "@dcloudio/uni-app";
export default {
  components: {
    cuiLogoNavbar,
    cuiRotationChart,
    combButton,
    cuiCounter,
    cuiShopingCartDialog,
  },
  setup() {
    const store = useStore();
    let goods = ref({});
    let swiperImage = ref([]);
    let shopingcartLenght = store.getters.shoppingCart.length;

    /** 加购 购买弹窗数据 */
    let orgiinStock = ref(0);
    let shopingCartDialogShow = ref(false);

    onLoad((options) => {
      console.log("上一个界面传过来的值：", options);
      goods.value = store.getters.goodsListById(options.id);
      swiperImage.value = goods.value.imgDetails;
    });


    /** 以下与index.vue 重复*/

    // 打开购物车页面
    function gotoShopingcart() {
      if (!isLogin(true)) {
        return;
      }
      console.log("NavChange -> gotoShopingcart");
      uni.navigateTo({
        url: "/pages/shopingcart/shopingcart",
      });
    }

    /** 打开购买弹窗 */
    function tobuy(item) {
      if (!isLogin(true)) {
        return;
      }
      console.log("show shoping cart", item.id);
      shopingCartDialogShow.value = true;
      orgiinStock.value = item.stock;
    }

    /* 选择优惠券 */
    function onSelectCouponClick(totalMoney) {
      if (!isLogin(false)) {
        return;
      }
      console.log("i ckick SelectCoupon", totalMoney);
      uni.navigateTo({
        url: "/pages/coupon/coupon?msg=onSelectCouponClick&totalMoney=" + totalMoney,
      });
    }
    /* 选择发货地址 */
    function onSelectAddrClick() {
      console.log("i ckick SelectAddr");
      uni.navigateTo({
        url: "/pages/addrAdmin/addrAdmin?msg=onSelectAddrClick",
      });
    }

    /** 购物dialog 的添加进购物车按钮和立即购买按钮*/
    function onClickAddShopingcart(shopingcart) {
      console.log("i need add to shopingcart", shopingcart);
      store.commit("addShopingcart", shopingcart);
      //关闭弹窗
      shopingCartDialogShow.value = false;
      uni.showToast({
        title: "已加入购物车",
      });
    }

    function onClickBuyNow(shopingcart) {
      console.log("goto buy now");
    }

        /** 判断是否登录 */
    function isLogin(toChangeDrawer) {
      if (store.getters.userInfo.id != null) {
        //check cookice
        return true;
      } else {
        indexToast("请先登录", 1000, "error");
        if (toChangeDrawer) {
          changeDrawer();
        }
        return false;
      }
    }

    return {
      goods,
      shopingcartLenght,
      swiperImage,
      navHeight: useStore().getters.nvaHeight,
      statusBarHeight: useStore().getters.statusBar,
      orgiinStock,shopingCartDialogShow,
      tobuy,gotoShopingcart,
      onSelectCouponClick,
      onSelectAddrClick,
      onClickAddShopingcart,
      onClickBuyNow,
    };
  },
};
</script>

<style>
.layout_details {
  background-color: lightgray;
  text-align: center;
  height: 100%;
  padding-bottom: 10%;
}

uni-video {
  width: 100% !important;
}

.radius-style {
  border-radius: 15px;
}
/* .max-width {
  width: 90%;
} */
.layout_details .cu-item {
  text-align: left;
}
.flxed-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
