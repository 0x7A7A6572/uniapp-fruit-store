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
        @click="pageChange(item.pageUrl, item.beforeToPage)"
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
    let userInfo = store.getters.userInfo;

    function isPageAction(pageurl) {
      return pageurl == null ? "" : "arrow";
    }
    function getItemColor(color) {
      return color == null ? "text-grey" : color;
    }
    function pageChange(pageurl, beforeToPage) {
      if (!beforeToPage(false)) {
        return;
      }
      console.log("NavChange ->", pageurl);
      uni.navigateTo({
        url: "/pages/" + pageurl + "/" + pageurl,
      });
    }
    function toLogin() {
      /**已登录状态下退出登录 */
      if (store.getters.isLogined) {
        uni.showModal({
          content: "是否退出登录",
          success:  (res)=> {
            if (res.confirm) {
              store.commit("logOut");
              /** 用于演示登录退出（没有实际完整登录流程） */
              store.commit("updatedUserBaseInfo", {});
            } 
          },
        });
        return;
      }
      /**判断是否有本地登录缓存 */
      let localUserinfo = uni.getStorageSync("userInfo");
      try {
        if (localUserinfo) {
          console.log("toLogin >userinfo:", localUserinfo);
          login.do((res) => {
            console.log(">>>>", res);
          });
          store.commit("updatedUserBaseInfo", {
            avatarUrl: localUserinfo.avatarUrl,
            nickName: localUserinfo.nickName,
          });
        } else {
          /*  #ifdef  H5 */
          login.do((res) => {
            console.log(">>>>", res);
            store.commit("updatedUserInfo", res.data);
          });
          /*  #endif  */
          // #ifdef  MP-WEIXIN
          login.do((res) => {
            console.log(">>>>", res);
            store.commit("updatedUserInfo", res.data);
          });
          login.getUserProfile((res) => {
            console.log("getUserProfile", res);
            store.commit("updatedUserBaseInfo", {
              avatarUrl: res.userInfo.avatarUrl,
              nickName: res.userInfo.nickName,
            });
          });
          //#endif
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
      userInfo,
    };
  },

  props: {
    menuList: {
      type: Array,
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
