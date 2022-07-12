<template>
  <view>
    <!-- fab导航按钮 -->
    <cui-float-action-button
      :action="changeDrawerButton.action"
      :offset="changeDrawerOffset"
      :color="changeDrawerButton.color"
      :icon="changeDrawerButton.icon"
      :bg="changeDrawerButton.bg"
      @tap="changeDrawer"
    >
    </cui-float-action-button>
    <cui-float-action-button
      :color="shopingCartButton.color"
      :icon="shopingCartButton.icon"
      :bg="shopingCartButton.bg"
      :offset="shopingCartOffset"
      @tap="gotoShopingcart"
    >
      <text class="cuIcon-null cu-tag badge bg-yellow text-xsl">{{
        getShopingcartLenght()
      }}</text>
    </cui-float-action-button>
    <!-- 抽屉主页 -->
    <scroll-view scroll-y :class="['DrawerPage',drawerStatus]">
      <!-- 顶部logo -->
      <cui-logo-navbar :logo="logosrc" @tap="changeDrawer"></cui-logo-navbar>
      <!-- 轮播图 -->
      <cui-rotation-chart :swiperImage="swiperImage"></cui-rotation-chart>
      <!-- 公告通知 -->
      <view class="cuIcon-notification notify-bar">{{ notice }}</view>
      <!-- 福利专区 -->
      <welfare-zone></welfare-zone>
      <!-- 商品展示 -->
      <cui-verticalnav
        :tobuy="tobuy"
        :itemclick="toGoodsDetails"
        :goodsClass="goodsClass"
      >
      </cui-verticalnav>
    </scroll-view>
    <!-- 点击抽屉外关闭抽屉 -->
    <view :class="['DrawerClose',drawerStatus]" @tap="changeDrawer">
    </view>
    <!-- 抽屉内 -->
    <scroll-view scroll-y  :class="['DrawerWindow',drawerStatus]">
      <cui-user-drawer :menuList="menuList">
        <view
          v-if="userInfo.type == 'admin' && userInfo.id != null"
          class="cu-item arrow"
          @click="toAdmin"
        >
          <view class="content">
            <text class="cuIcon-crownfill text-yellow"></text>
            <text class="text-yellow">后台数据管理</text>
          </view>
        </view>
      </cui-user-drawer>
    </scroll-view>
    <!-- 点击购物后出现的弹窗 -->
    <cui-shoping-cart-dialog
      v-if="shopingCartDialogShow"
      v-model:show="shopingCartDialogShow"
      :item="shopingCartItem"
      :orgiinStock="orgiinStock"
      :onSelectCouponClick="onSelectCouponClick"
      :onSelectAddrClick="onSelectAddrClick"
      :onClickAddShopingcart="onClickAddShopingcart"
      :onClickBuyNow="onClickBuyNow"
    />
  </view>
</template>

<script>
import { useStore } from "vuex";
import { ref} from "vue";
import CONST from "@/utils/const.js";
import apiGoods from "@/api/goods.js";
import cuiVerticalnav from "@/components/cui-verticalnav.vue";
import cuiFloatActionButton from "@/components/cui-float-action-button.vue";
import cuiLogoNavbar from "@/components/cui-logo-navbar.vue";
import cuiUserDrawer from "@/components/cui-user-drawer.vue";
import cuiShopingCartDialog from "@/components/cui-shoping-cart-dialog.vue";
import cuiRotationChart from "@/components/cui-rotation-chart.vue";
import welfareZone from "@/components/welfare-zone.vue";
export default {
  components: {
    cuiVerticalnav,
    cuiFloatActionButton,
    cuiLogoNavbar,
    cuiUserDrawer,
    cuiShopingCartDialog,
    cuiRotationChart,
    welfareZone,
    useStore,
  },
  setup() {
    const store = useStore();
    let userInfo = store.getters.userInfo;
    let menuList = CONST.menuList;
    let logosrc = CONST.logosrc;
    /** 基本信息 */
    let goodsClass = ref([]);
    let swiperImage = ref([]);
    let notice = ref("");

    let drawerStatus = ref("");
    let changeDrawerButton = {
      action: false,
      color: "white",
      bg: "orange",
      icon: "cuIcon-cascades",
    };

    let shopingCartButton = {
      action: false,
      color: "white",
      bg: "red",
      icon: "cuIcon-cart",
    };

    let shopingCartItem = ref({});
    let orgiinStock = ref(0);
    let shopingCartAction = false;
    let shopingCartDialogShow = ref(false);

    /* 购物车数据 */
    let shoppingCart = store.getters.shoppingCart;
    let changeDrawerOffset = CONST.changeDrawerOffset;
    let shopingCartOffset = CONST.shopingCartOffset;
    let shopingCartFabStyle = CONST.shopingCartFabStyle;

    apiGoods.getGoodsList((res) => {
      console.log("update goodsClass", res.data);
      goodsClass.value = res.data.goodsClass;
      swiperImage.value = res.data.swiperImage;
      notice.value = res.data.notice;
      store.commit("updateGoodsClass", res.data.goodsClass);
    });
    
    // 打开/关闭Drawer
    function changeDrawer() {
      drawerStatus.value = drawerStatus.value == "" ? "show" : "";
      changeDrawerButton.action = !changeDrawerButton.action;
      changeDrawerButton.icon = changeDrawerButton.action ? "cuIcon-right" : "cuIcon-cascades";
      changeDrawerButton.color = changeDrawerButton.action ? "orange" : "white";
      changeDrawerButton.bg = changeDrawerButton.action ? "white" : "orange";
    }
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
      shopingCartItem.value = item;
      orgiinStock.value = item.stock;
    }
    /** 打开商品详情页面 */
    function toGoodsDetails(item) {
      console.log("NavChange -> toGoodsDetails", item.id);
      uni.navigateTo({
        url: "/pages/goodsDetails/goodsDetails?id=" + item.id,
      });
    }

    /** 后台管理页面 */
    function toAdmin() {
      console.log("NavChange -> toAdmin");
      uni.navigateTo({
        url: "/pages/admin/admin",
      });
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

    /** 用于其他页面tosat返回index.vue， toast一闪而过 */
    function indexToast(str, duration, icon) {
      uni.showToast({
        title: str,
        duration: duration || 1000,
        icon: icon || "none",
      });
    }

function getShopingcartLenght(){
  return store.getters.shoppingCartLenght;
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

   /** 购物dialog 的添加进购物车按钮和立即购买按钮*/
    function onClickAddShopingcart(shopingcart){
      console.log("i need add to shopingcart",shopingcart);
      store.commit("addShopingcart",shopingcart);
      //关闭弹窗
      shopingCartDialogShow.value = false;
      uni.showToast({
        title:"已加入购物车"
      })
    }
/** 立即购买 */
    function onClickBuyNow(shopingcart){
      console.log("goto buy now")
    }

    // onMounted(() => {
    //   setTimeout(() => {
    //     if (drawerStatus.value == false && userInfo.nickName == null) {
    //       changeDrawer();
    //     }
    //   }, 1000);
    //   if (userInfo.nickName != null) {
    //     //已登录
    //   }
    //   console.log("----onMounted");
    // });

    return {
      drawerStatus,
      changeDrawerButton,
      shopingCartButton,
      userInfo,
      menuList,
      logosrc,
      shopingCartDialogShow,
      shopingCartItem,
      shopingCartAction,
      shoppingCart,
      changeDrawerOffset,
      shopingCartOffset,
      shopingCartFabStyle,
      goodsClass,
      swiperImage,
      notice,
      orgiinStock,
      changeDrawer,
      tobuy,
      toAdmin,
      toGoodsDetails,
      onSelectCouponClick,
      onSelectAddrClick,
      gotoShopingcart,
      indexToast,
      onClickAddShopingcart,
      onClickBuyNow,getShopingcartLenght,
      //菜单列表
      menuList: [
        {
          icon: "cuIcon-like",
          text: "我的收藏",
          pageUrl: null,
          beforeToPage: isLogin,
        },
        {
          icon: "cuIcon-text",
          text: "我的订单",
          pageUrl: "orders",
          beforeToPage: isLogin,
        },
        {
          icon: "cuIcon-location",
          text: "地址管理",
          pageUrl: "addrAdmin",
          beforeToPage: isLogin,
        },
        {
          icon: "cuIcon-ticket",
          text: "优惠券",
          pageUrl: "coupon",
          beforeToPage: isLogin,
        },
        {
          icon: "cuIcon-creative",
          text: "建议反馈",
          pageUrl: "feedback",
          beforeToPage: isLogin,
        },
        {
          icon: "cuIcon-question",
          text: "关于桔乐小铺",
          pageUrl: "about",
        },
      ],
    };
  },
};
</script>

<style>
page {
  background: var(--pageBackgroundColor);
}

.main {
  margin-top: 50rpx;
  /* text-align: center; */
}

.notice {
  background-color: rgb(253, 242, 204);
  text-align: left;
  padding-left: 5vw;
  padding: 15rpx;
}

.about-info {
  /* width: 95vw; */
  /* position: relative; */
  padding-top: 5vh;
  /* padding-bottom: 5vh; */
  bottom: 0vh;
  text-align: center;
}

.DrawerPage {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0vw;
  transition: all 0.4s;
  background-color: #eee;
}

.DrawerPage.show {
  transform: scale(0.9, 0.9);
  left: 85vw;
  box-shadow: 0 0 60rpx rgba(0, 0, 0, 0.2);
  transform-origin: 0;
}

.DrawerWindow {
  position: absolute;
  width: 85vw;
  height: 100vh;
  left: 0;
  top: 0;
  transform: scale(0.9, 0.9) translateX(-100%);
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s;
}

.DrawerWindow.show {
  transform: scale(1, 1) translateX(0%);
  opacity: 1;
  pointer-events: all;
}

.DrawerClose {
  position: absolute;
  width: 40vw;
  height: 100vh;
  right: 0;
  top: 0;
  color: transparent;
  /* padding-bottom: 30rpx; */
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
  letter-spacing: 5px;
  font-size: 50rpx;
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s;
}

.DrawerClose.show {
  opacity: 1;
  pointer-events: all;
  width: 15vw;
  color: #fff;
}

/* zdy */

.user-info {
  text-align: center;
}

.user-info .head-imge {
  margin-top: 5vh;
}

.user-list {
  margin-top: 8vh;
}

/* 购物车*/
.cartStyle {
  text-align: center;
}

/**折叠 */

.li {
  background: #fff;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx 20rpx 30rpx 30rpx;
}

.toggle {
  font-size: 32rpx;
  border-bottom: 1rpx solid #eee;
}

.li-align {
  display: flex;
  align-content: center;
  align-items: center;
}

.content {
  font-size: 24rpx;
  padding-right: 50rpx;
}

.li-wrap .line {
  border-bottom: 1rpx solid #eee;
}

.entry {
  width: 18rpx;
  height: 32rpx;
  margin-left: 20rpx;
}

.common {
  font-size: 32rpx;
  padding-right: 50rpx;
  border-bottom: 1rpx solid #eee;
}

.float-button {
  z-index: 9;
  position: absolute;
  bottom: 5%;
  right: 5vw;
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
}

.inside-float-buttom {
  z-index: 9;
  position: absolute;
  bottom: 5%;
  right: 25vw;
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
}

.fill {
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* margin-top: -50rpx; */
}

/*new tab
/* pages/component/nav/nav.wxss */
.VerticalNav.nav {
  width: 200rpx;
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
  width: 8rpx;
  height: 30rpx;
  border-radius: 10rpx 0 0 10rpx;
  position: absolute;
  background-color: orangered;
  top: 0;
  right: 0rpx;
  bottom: 0;
  margin: auto;
}

.VerticalBox {
  display: flex;
}

.VerticalMain {
  background-color: #f1f1f1;
}

/* 修改原样式*/
.cu-avatar.lg {
  width: 196rpx;
  height: 196rpx;
  font-size: 2em;
}

.cu-list.menu-avatar > .cu-item {
  position: relative;
  display: flex;
  padding-right: 10rpx;
  height: 240rpx;
  background-color: var(--white);
  justify-content: flex-end;
  align-items: center;
}

.cu-list.menu-avatar > .cu-item .content {
  position: absolute;
  left: auto;
  width: calc(100% - 96rpx - 60rpx - 120rpx - 20rpx);
  line-height: 1.6em;
}

.cuformgroup {
  /* padding: 1rpx 30rpx; */
  display: flex;
  align-items: center;
  min-height: 100rpx;
  justify-content: space-between;
}

.notify-bar {
  background-color: bisque;
  color: orangered;
  padding: 0.5em;
  white-space: nowrap;
}
</style>
