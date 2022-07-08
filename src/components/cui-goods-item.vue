<template>
  <view class="goods-item" @click="itemclick(item)">
    <img class="goods-item-img" :src="item.imgMain" />
    <view class="goods-item-info">
      <text class="__info-name">{{ item.goodsName }}</text>
      <text :class="['__info-state', getInfoStateStyle(item.state)]">{{
        item.state
      }}</text>
      <view>
        <text class="__info-price text-xxl">￥{{ item.goodsPrice }}</text>
        <text class="text-grey text-sm">/{{ item.goodsPack }}</text>
      </view>
      <view class="fit-Round-button" @click.stop="tobuy(item)">
        <text class="__frb-left cuIcon-cart"></text>
        <text class="__frb-right">购买</text>
      </view>
    </view>
    <view v-if="item.state == '售空'" class="goods-item-none">
      <img :src="selloutImage" />
    </view>
  </view>
</template>

<script>
export default {
  name: "cui-goods-item",
  setup(props) {
    function getInfoStateStyle(state) {
      let style;
      switch (state) {
        case "售空":
          style = "text-grey";
          break;
        case "热卖":
          style = "text-red";
          break;
        default:
      }
      return style;
    }
    return {
      getInfoStateStyle,
    };
  },
  props: {
    item: { type: Object },
    selloutImage: { type: String },
    tobuy: {
      type: Function,
      default: () => {
        console.log("not have click even");
      },
    },
    itemclick: {
      type: Function,
      default: () => {
        console.log("not have itemclick even");
      },
    },
  },
};
</script>

<style scope>
.goods-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.goods-item-img {
  width: 25vw;
  height: 25vw;
  margin: 1em;
  border-radius: 0.5em;
}
.goods-item-info {
  margin: 1em 0;
  display: flex;
  flex-wrap: wrap;
  width: 0 auto;
  flex: 1;
  padding: 0.5em;
}
.__info-name {
  font-weight: bold;
}
.__info-price {
  color: orange;
}
.__info-state {
  /* color: white; */
  /* background-color: orange; */
  /* border-radius: 0.8em; */
  font-size: 0.8em;
  padding: 0.2em;
  height: 2em;
  text-align: center;
  margin-left: 1em;
}

.goods-item-none {
  background: linear-gradient(45deg, #ff990062, #ffffff9d);
  position: absolute;
  color: white;
  width: 100%;
  height: 100%;
  text-align: center;
}

.goods-item-none img,
.goods-item-none image {
  /* position: absolute;
  width: 30%;
  height: 50%;
  left: 30%;
  top: 50%;
  */
  /** 更大的馨售 */
  position: absolute;
  width: 25vw;
  height: 25vw;
  filter: brightness(1.6);
  left: 18%;
  top: 26%;
  object-fit: cover;
}

/** 合并圆角按钮 */
.fit-Round-button {
  display: flex;
  height: fit-content;
}

.__frb-left {
  padding: 0.5em 0.5em;
  color: white;
  background: linear-gradient(90deg, #ff9700, #ff6700);
  border-top-left-radius: 1em;
  border-bottom-left-radius: 1em;
  box-shadow: none;
}
.__frb-right {
  font-size: 0.8em;
  padding: 0.5em 1em;
  color: white;
  background: linear-gradient(90deg, #ff5700, #ed1c24);
  border-top-right-radius: 1em;
  border-bottom-right-radius: 1em;
  box-shadow: none;
}
</style>
