<template>
  <view class="cu-card article">
    <view class="cu-item shadow">
      <view class="content margin-top">
        <image :src="orderGoods.imgMain" mode="widthFix"></image>
        <view class="desc">
          <view class="text-black text-xl text-bold"
            >{{ orderGoods.goodsName }}
            <text class="__count text-sm text-red"> x{{ order.buyCount }} </text></view
          >
          <view class="__desc-price text-xxl text-red text-bold">
            ￥{{ totalMoney(orderGoods.goodsPrice, order.buyCount) }}
          </view>
          <view class="__spec">
            <text class="cu-tag light bg-grey text-bold">
              {{ orderGoods.goodsWeight + "斤/" + orderGoods.goodsPack }}
            </text>
          </view>
          <view>
            <view class="cu-tag bg-orange light round text-bold">
              <text class="cuIcon-deliver"> 物流查询 </text>
              </view>
          </view>
          <view :class="[
          getShowDateilsText('icon'),
          'padding-left-xs',
           'text-right', 
           'text-grey']" @click.stop="showDetails">{{getShowDateilsText('text')}}</view>
        </view>
      </view>
      <view v-if="isShowDetails" class="__details padding-top">
        <view class="text-bold flex padding-left padding-right">
          <text class="flex-sub">创建时间：</text>
          <text class="flex-twice text-right text-grey">{{
            getDate(order.time)
          }}</text>
        </view>
        <view class="text-bold flex padding">
          <text class="flex-sub">订单号：</text>
          <text class="flex-twice text-right text-grey">{{
            order.id 
          }}</text>
        </view>
    <view class="text-bold flex padding-left padding-right">
          <text class="flex-sub">运单号：</text>
          <text class="flex-twice text-right text-grey">{{
            order.waybillNumber 
          }}</text>
        </view>
     <view class="text-bold flex padding">
          <text class="flex-sub">收货地址：</text>
          <text class="flex-twice text-right text-grey">{{
            order.address 
          }}</text>
        </view>
            <view class="text-bold flex padding-left padding-right">
          <text class="flex-sub">备注：</text>
          <text class="flex-twice text-right text-grey">{{
            order.remarks 
          }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import utils from "@/utils/utils.js";
import { useStore } from "vuex";
import { ref } from 'vue';
export default {
  name: "cui-order-card",
  setup(props) {
    const store = useStore();
    let isShowDetails = ref(false);
    let orderGoods = store.getters.goodsListById(props.order.goodsId);

    /** 时间戳转时间 */
    function getDate(time) {
      return utils.getData(time);
    }

    /** 计算总价 */
    function totalMoney(unitPrice, count) {
      return (unitPrice * count).toFixed(2);
    }

    /** 点击展开/收起 更多信息 */
    function showDetails(){
      isShowDetails.value = !isShowDetails.value;
    }

    function getShowDateilsText(type){
      if(type == "icon"){
        return  isShowDetails.value ? "cuIcon-fold" : "cuIcon-unfold" ;
      }else if(type == "text"){
        return isShowDetails.value ? "收起" : "查看更多";
      }else{
        return "";
      }
    }

    return {
      orderGoods,isShowDetails,showDetails,
      getDate,getShowDateilsText,
      totalMoney,
    };
  },
  props: {
    order: { type: Object },
  },
};
</script>

<style scope>
.desc {
  position: relative;
}
.__desc-price {
  position: absolute;
  right: 0;
  font-size: x-large;
}

.__spec {
  display: flex;
  text-align: center;
  align-items: center;
}
.__count {
  margin-right: 10px;
  position: relative;
  left: 0;
  text-align: right;
  color: orange;
  font-weight: bold;
  border: 2px solid orange;
  width: fit-content;
  height: fit-content;
  padding: 0.1em;
  border-radius: 0.5em;
}
</style>
