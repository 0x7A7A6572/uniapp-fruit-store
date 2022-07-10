<template>
  <view class="dialog__layout bottom-modal">
    <view class="dialog__mask" @click="toggleDialog()" />
    <view class="dialog__container">
      <icon class="image-close" @click="toggleDialog()" type="cancel" size="25" />
      <view class="row text-bold">
        <image class="image-sku" :src="item.imgMain"> </image>
        <view class="column text-left">
          <view class="sku-price"
            >￥{{ totalMoney(item.goodsPrice) }}
            <view v-show="discountedPrice" class="sku-discounted-price"
              >{{ discountedPrice() }}</view
            ></view>
          <text class="sku-title">库存: {{ item.stock }} 件</text>
          <text class="sku-title"
            >规格：{{ item.goodsWeight }}斤/{{ item.goodsPack }}</text
          >
        </view>
      </view>
      <text class="border-line"></text>
      <view
        class="coupon-select row text-bold padding-lr"
        @click.stop="onSelectAddrClick"
      >
        <text>收货地址</text>
        <view class="addr-select-preview text-grey text-sm">
               {{showSelectedAddr()}}
        </view>
      </view>
      <text class="border-line"></text>
      <view
        class="coupon-select row text-bold padding-lr"
        @click.stop="onSelectCouponClick(totalMoney(item.goodsPrice))"
      >
        <text>优惠券</text>
        <text class="coupon-select-text"> {{ showSelectedCoupon() }}</text>
      </view>

      <!-- <text class="border-line"></text>
    <text class="text-bold padding-lr">颜色分类</text>
    <view class="color-class">
      <view>大果</view>
      <view>小果</view>
    </view> -->
      <text class="border-line"></text>
      <view class="row text-bold padding-lr">
        <text>购买数量</text>
        <view class="quantity-position">
          <!-- 主容器 -->
          <view class="stepper">
            <!-- 减号 -->
            <button
              :class="'sign ' + (count < 2 ? 'disabled' : 'normal')"
              @click="delCount"
            >
              -
            </button>
            <!-- 数值 -->
            <input class="number" type="number" :value="count" disabled="disabled" />
            <!-- 加号 -->
            <button
              :class="'sign ' + (count > orgiinStock ? 'disabled' : 'normal')"
              @click="addCount"
            >
              +
            </button>
          </view>
        </view>
      </view>
      <text class="border-line"></text>
      <comb-button
        :left="comButtomLeft"
        :right="comButtomRight"
        width="90%"
      ></comb-button>
      <!-- <button  class="button-addCar" bindtap="addCar" formType="submit">加入购物车</button> -->
    </view>
    <!-- </view> -->
  </view>
</template>

<script>
import { ref } from "vue";
import combButton from "@/components/comb-button.vue";
import { useStore } from "vuex";
export default {
  name: "cui-shoping-cart-dialog",
  components: { combButton },
  props: {
    show: Boolean,
    onSelectAddrClick: Function,
    onSelectCouponClick: Function,
    onClickAddShopingcart: Function,
    onClickBuyNow: Function,
    item: { type: Object },
    addr: { type: Object },
    coupon: { type: Object },
    orgiinStock: { type: Number },
  },
  setup(props, ctx) {
    const store = useStore();
    let isLogined = store.getters.isLogined;
    let count = ref(1);
    let currPrice = ref(0); //当前选择的商品总价

    /**处理显示当前选择的优惠券 */
    function showSelectedCoupon() {
      if (store.getters.SelectCoupon.id == null) {
        return store.getters.usefulCoupon(currPrice.value) + "张可用";
      } else {
        /** 从状态管理器拿到当前选择的优惠券 */
        return store.getters.SelectCoupon.desc;
      }
    }
    /** 显示选择的地址/默认地址  */
    function showSelectedAddr(){
      // console.log("isLogined",isLogined)
      if(!isLogined){return "";}
      if(store.getters.SelectAddr.name == null){
        return  store.getters.defaultAddr.name  + " "
        + store.getters.defaultAddr.phone + "\n"
        + store.getters.defaultAddr.region.join(" ") + " "
        + store.getters.defaultAddr.address;
      }else{
        return store.getters.SelectAddr.name + " "
        + store.getters.SelectAddr.phone + "\n"
        + store.getters.SelectAddr.region.join(" ") + " "
        + store.getters.SelectAddr.address;
      }
    }

    function toggleDialog() {
      console.log("send to parent ->");
      ctx.emit("update:show", false);
      count.value = 1; //离开时清除conut计数
      currPrice.value = 0;
    }

    function totalMoney(unitPrice) {
      currPrice.value = (unitPrice * count.value).toFixed(2);
      if(store.getters.usefulCoupon(currPrice.value) == 0){
        /** 重置优惠券选择器 */
         store.commit("updateSelectCoupon", {});
      }
      return currPrice.value;
    }

    function delCount() {
      if (count.value > 1) {
        count.value--;
        props.item.stock++;
      }
    }

    function addCount() {
      if (count.value < props.orgiinStock) {
        count.value++;
        props.item.stock--;
      }
    }


    /** 计算折后价 */
    function discountedPrice() {
      if (store.getters.SelectCoupon.id != null) {
        return currPrice.value - store.getters.SelectCoupon.couponPrice;
      } else {
        return false;
      }
    }

    

    return {
      isLogined,
      toggleDialog,
      count,
      totalMoney,
      comButtomLeft: { text: "加入购物车" , click: props.onClickAddShopingcart},
      comButtomRight: { text: "立即购买" ,click: props.onClickBuyNow},
      delCount,
      addCount,
      showSelectedCoupon,
      discountedPrice,showSelectedAddr
    };
  },
};
</script>

<style>
/*主容器*/
.stepper {
  /* width: 90px; */
  height: 26px;
  margin: 0 auto;
}
button.sign::after {
  content: none;
}

/*加号和减号*/
.stepper .sign {
  color: white;
  width: 24px;
  line-height: 26px;
  text-align: center;
  float: left;
  font-size: larger;
  border-radius: 0.2em;
  padding: inherit;
}

/*数值*/
.stepper .number {
  width: 40px;
  height: 26px;
  float: left;
  margin: 0 auto;
  text-align: center;
  font-weight: bold;
  font-size: larger;
}

/*普通样式*/
.stepper .normal {
  /* color: black; */
  background-color: orangered;
}

/*禁用样式*/
.stepper .disabled {
  color: white;
  background-color: #ccc;
}

/* 加入购物车弹窗样式 */
.dialog__layout {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}

.dialog__mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
  /* display: none; */
}
.dialog__container {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  transition: all 0.4s ease;
  padding: 0.5em;
  z-index: 11;
}
.dialog--show .dialog__container {
  transform: translateY(0);
}
.dialog--show .dialog__mask {
  display: block;
}
.image-sku {
  width: 200rpx;
  height: 200rpx;
  z-index: 12;
  position: absolute;
  left: 20px;
  top: -30px;
  border-radius: 20rpx;
}
.image-close {
  width: 40rpx;
  height: 40rpx;
  position: absolute;
  right: 20rpx;
  top: 10rpx;
}
.column {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.border-line {
  width: 100%;
  height: 2rpx;
  display: inline-block;
  margin: 30rpx 0rpx;
  background-color: gainsboro;
  text-align: center;
}
.sku-title {
  position: relative;
  left: 300rpx;
  margin: 1rpx;
}
.sku-price {
  color: red;
  position: relative;
  left: 300rpx;
  margin: 1rpx;
  font-size: x-large;
  float: left;
}
.sku-discounted-price {
  color: white;
  background-color: orangered;
  font-size: small;
  border-radius: 5px;
  padding: 5px;
  display: inline;
}
.sku-discounted-price::before {
  content: "折后￥";
  font-size: small;
  display: inline;
}

.row .quantity-position {
  position: absolute;
  right: 30rpx;

  display: flex;
  justify-content: center;
  flex-direction: column;
}

/** 颜色分类 */
/* .color-class {
  display: flex;
}

.color-class view {
  border: 2px solid black;
  padding: 2px;
  margin-left: 2em;
  border-radius: 5px;
  font-weight:  bold;
}

.color-class view.select {
  color: orangered;
  border: 2px solid orangered;
  padding: 2px;
  margin-left: 2em;
  border-radius: 5px;
} */
.coupon-select {
  display: flex;
}
.coupon-select-text {
  text-align: right;
  flex: 1;
  color: red;
  font-size: x-small;
}
.addr-select-preview {
  display: flex;
  flex-direction: column;
  text-align: right;
  flex: auto;
  font-weight: unset;
  white-space: pre-wrap; /** 使<text> \n 生效 */
}

.coupon-select:after {
  /* position: absolute; */
  top: 0;
  right: 0.9375rem;
  bottom: 0;
  display: block;
  margin: auto;
  width: 0.9375rem;
  height: 0.9375rem;
  color: black;
  content: "\e6a3";
  text-align: center;
  font-size: 1.0625rem;
  font-family: cuIcon;
  line-height: 0.9375rem;
  padding-left: 10px;
}
</style>
