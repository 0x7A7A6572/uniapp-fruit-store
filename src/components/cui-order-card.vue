<template>
  <view class="cu-card article">
    <view class="cu-item shadow">
      <view class="title"
        ><view class="text-cut"
          >{{orders.goodsName}}</view
        ></view
      >
      <view class="content">
        <image
          src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
          mode="aspectFill"
        ></image>
        <view class="desc">
          <view class="text-content">
            {{orders.goodsDesc}}
			</view
          >
          <view>
            <view class="cu-tag bg-red light round">{{orders.orderStatu}}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "cui-order-card",
  setup() {
    return {};
  },
  props: {
    orders: {
      type: Array,
      default: [
        {
          orderId: "订单id",
          orderStatu: "待付款", //订单状态
          waybillNumber: "KD0000000000000",
          goodsId: 1,
		  goodsName: "商品名",
		  goodsDesc: "商品详情.........................................",
		  goodsImage: "",
          buyCount: 1,
        },
      ],
    },
  },
};
</script>

<style></style>
