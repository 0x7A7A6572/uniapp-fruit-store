<template>
  <view class="cu-list menu card-menu shadow-lg">
    <view class="user-info">
      <view class="head-imge cu-avatar xl text-xsl round">
        <button
          class="cu-avatar xl round"
          :style="{ backgroundImage: 'url(' + userInfo.avatarUrl + ')' }"
          @tap="toLogin"
        ></button>
        <view
          :class="
            'cu-tag  badge cuIcon-crownfill ' + (userInfo.vip ? 'bg-yellow' : 'bg-grey')
          "
        >
        </view>
      </view>
      <view class="user-name">
        <text class="text-white text-bold text-xxl">{{ userInfo.nickName }} </text>
      </view>
    </view>
    <view class="cu-list menu user-list sm-border card-menu">
      <view
        v-for="item in menuList"
        :class="'cu-item ' + isPageAction(item.pageUrl)"
        @click="pageChange(item.pageUrl)"
        :key="item.text"
      >
        <view class="content">
          <text :class="[item.icon, getItemColor(item.color)]"></text>
          <text :class="getItemColor(item.color)">{{ item.text }}</text>
        </view>
      </view>
      <slot></slot>
    </view>
  </view>
</template>

<script>
import { useStore } from "vuex";
import login from "@/api/login";

export default {
  name: "cui-user-drawer",
  setup() {
    const store = useStore();

    function isPageAction(pageurl) {
      return pageurl == null ? "" : "arrow";
    }
    function getItemColor(color) {
      return color == null ? "text-grey" : color;
    }
    function pageChange(pageurl) {
      console.log("NavChange ->", pageurl);
      uni.navigateTo({
        url: "/pages/" + pageurl + "/" + pageurl,
      });
    }
    function toLogin() {
      try {
        let userinfo = uni.getStorageSync("userInfo");
        if (userinfo) {
          console.log("toLogin >userinfo:",userinfo)
          login.do((res) => {
            console.log(">>>>", res);
          });
          store.commit("updatedUserBaseInfo", {
            avatarUrl: userinfo.avatarUrl,
            nickName: userinfo.nickName,
          });
        } else {
          login.do((res) => {
            console.log(">>>>", res);
            store.commit("updatedUserBaseInfo", {
              avatarUrl: res.userInfo.avatarUrl,
              nickName: res.userInfo.nickName,
            });
          });
          login.getUserProfile((res) => {
            console.log("getUserProfile", res);
            store.commit("updatedUserBaseInfo", {
              avatarUrl: res.userInfo.avatarUrl,
              nickName: res.userInfo.nickName,
            });
          });
        }
      } catch (e) {
        // error
        console.error("getStorageSync error:", e);
      }
    }

    return {
      isPageAction,
      getItemColor,
      pageChange,
      toLogin,
    };
  },

  props: {
    menuList: {
      type: Array,
    },
    userInfo: {
      type: Object,
      default: {
        type: "",
        vip: false,
        avatarUrl: "/static/images/avatar.png",
        nickName: "未登录",
        loveGoods: "暂无喜欢的商品",
        oderrs: [
          {
            orderId: "订单id",
            orderStatu: "订单状态",
            waybillNumber: "KD0000000000000",
            goodsId: 1,
            buyCount: 1,
          },
        ],
        adds: [
          {
            name: "方先生",
            addr: "xx市xx区xx小区xx号",
            namber: "13888888888",
          },
        ],
        coupons: [
          {
            id: "优惠券id",
            name: "满200减20优惠券",
            full: 200,
            reduction: 20,
          },
        ],
      },
    },
  },
  components: {
    useStore,
  },
};
</script>

<style>
.user-info {
  text-align: center;
}

.user-info .head-imge {
  margin-top: 10vh;
}

.user-list {
  margin-top: 5vh;
}

.user-name {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 50vw;
  margin: 0 auto;
}

/* .user-name text {
  white-space: nowrap;
} */
</style>
