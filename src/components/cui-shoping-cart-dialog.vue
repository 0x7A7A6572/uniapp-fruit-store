<template>
  <view class="dialog__layout">
    <view class="dialog__mask" @click="toggleDialog()" />
    <view class="dialog__container">
      <icon class="image-close" @click="toggleDialog()" type="cancel" size="25" />
      <view class="row text-bold">
        <image class="image-sku" :src="getItemImage(item)"> </image>
        <view class="column text-left">
          <text class="sku-price">￥{{ totalMoney(item.goodsPrice) }}</text>
          <text class="sku-title">库存: {{ item.stock }} 件</text>
          <text class="sku-title"
            >规格：{{ item.goodsWeight }}斤/{{ item.goodsPack }}</text
          >
        </view>
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
            <text :class="'sign ' + (count < 2 ? 'disabled' : 'normal')" @tap="delCount"
              >-</text
            >
            <!-- 数值 -->
            <input class="number" type="number" :value="count" disabled="disabled" />
            <!-- 加号 -->
            <text
              :class="'sign ' + (count > orgiinStock ? 'disabled' : 'normal')"
              @tap="addCount"
              >+</text
            >
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
export default {
  name: "cui-shoping-cart-dialog",
  components: { combButton },
  props: {
    show: Boolean,
    item: { type: Object },
    orgiinStock: { type: Number },
  },
  setup(props, ctx) {
    let count = ref(1);
    let comButtomLeft = { text: "加入购物车" };
    let comButtomRight = { text: "立即购买" };

    function toggleDialog() {
      console.log("send to parent ->")
      ctx.emit("update:show", false);
      count.value = 1; //离开时清除conut计数
    }

    function totalMoney(unitPrice) {
      return (unitPrice * count.value).toFixed(2);
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

    function getItemImage(item) {
      if (Array.isArray(item.image)) {
        return item.image[0];
      } else {
        return item.image;
      }
    }

    return {
      toggleDialog,
      count,
      totalMoney,
      comButtomLeft,
      comButtomRight,
      delCount,
      addCount,
      getItemImage,
    };
  },
};
</script>

<style>
/*主容器*/
.stepper {
  width: 90px;
  height: 26px;
  margin: 0 auto;
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
</style>
