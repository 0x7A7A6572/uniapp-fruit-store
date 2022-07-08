<template>
  <view>
    <cui-logo-navbar
      class="logo-nav"
      :height="navHeight"
      :statusBarHeight="statusBarHeight"
      :isBack="true"
    >
    </cui-logo-navbar>
    <zx-water-fall :arts="getShopingcartItem()" :column="2" :onSelectItem="onSelectItem">
    </zx-water-fall>
    <view class="settlement-bar text-xxl">
      <text
        :class="[
          'settlement-bar-selectall',
          isSelectAll ? 'cuIcon-roundcheckfill text-orange' : 'cuIcon-round',
        ]"
        @tap="selectAll"
      ></text>
      <text class="settlement-bar-price">￥{{ totalMoney }}</text>
      <button>结算</button>
    </view>
  </view>
</template>

<script>
import cuiLogoNavbar from "@/components/cui-logo-navbar.vue";
import zxWaterFall from "@/components/zx-water-fall.vue";
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  components: { cuiLogoNavbar, zxWaterFall },
  setup() {
    const store = useStore();
    let shoppingCart = store.getters.shoppingCart;
    let shopingcartList = ref([]);
    let isSelectAll = ref(false);   //是否全选
    let totalMoney = ref(0); //当前选择的购物车商品总价

    function getShopingcartItem() {
      shoppingCart.forEach((e) => {
        let goods = store.getters.goodsListById(e.goodsId);
        shopingcartList.value.push({
          name: goods.goodsName,
          image: goods.imgMain,
          price: e.buyCount * goods.goodsPrice,
          count: e.buyCount,
          selected: false,
        });
      });
      console.log("shopingcartList", shopingcartList.value);
      return shopingcartList.value;
    }

    /** 选择购物车单商品 */
    function onSelectItem(item) {
      item.selected = !item.selected;
      if (item.selected) {
        totalMoney.value += item.price;
      } else {
        totalMoney.value -= item.price;
      }
      console.log(item);
    }

    /** 全选购物车商品 */
    function selectAll() {
      isSelectAll.value = !isSelectAll.value;
      for (let index in shopingcartList.value) {
        shopingcartList.value[index].selected = isSelectAll.value;
        if (isSelectAll.value) {
          totalMoney.value += shopingcartList.value[index].price;
        } else {
          totalMoney.value -= shopingcartList.value[index].price;
        }
      }
    }

    return {
      shoppingCart,
      getShopingcartItem,
      onSelectItem,
      isSelectAll,
      selectAll,
      totalMoney,
      navHeight: store.getters.nvaHeight,
      statusBarHeight: store.getters.statusBar,
    };
  },
};
</script>

<style>
.settlement-bar {
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100vw;
  text-align: center;
  justify-content: center;
  justify-items: center;
  background-color: white;
  padding: 10px;
}
.settlement-bar-selectall {
  flex: auto;
  text-align: left;
  margin: auto;
}

.settlement-bar-selectall::after {
  content: "全选";
  font-size: small;
  color: black;
  padding: 10px;
  margin: auto;
}

.settlement-bar-price {
  color: orangered;
  font-weight: bold;
  padding: 10px;
}

.settlement-bar-price::before {
  content: "合计:";
  font-size: small;
  color: black;
}

.settlement-bar button {
  background: var(--pageBackgroundColor);
  color: white;
  border-radius: 2em;
  min-width: 30vw;
  max-width: 30vw;
}
</style>
