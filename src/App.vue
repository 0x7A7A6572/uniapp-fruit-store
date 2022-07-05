<script>
import { useStore } from "vuex";
import login from "@/api/login";
export default {
  onLaunch: function () {
    const store = useStore();
    /** 获取一些系统信息 用于组件样式 */
    uni.getSystemInfo({
      success: (e) => {
        let statusBar = 0;
        let customBar = 0;
        // #ifdef MP-WEIXIN
        statusBar = e.statusBarHeight;
        // @ts-ignore
        const custom = wx.getMenuButtonBoundingClientRect();
        customBar = custom.bottom + custom.top - e.statusBarHeight;
        // #endif
        console.log("customBar:", customBar, " statusBar:", statusBar);
        store.commit("updatedCustomBar", customBar);
        store.commit("updatedStatusBar", statusBar);
      },
    });

    /* 尝试读取本地数据 */
    uni.getStorage({
      key: "userInfo",
      success: (res) => {
        console.log("read localstorage userdata success>", res);
        store.commit("updatedUserBaseInfo", {
          avatarUrl: res.data.avatarUrl,
          nickName: res.data.nickName,
        });
        login.do((res) => {
          console.log("登录成功->", res);
          store.commit("updatedUserInfo", res.data);
        });
        setTimeout(() => {
          //  store.commit("updatedDrawerAction",false);
          uni.showToast({
            title: "欢迎回来" + res.data.nickName,
            duration: 1000,
            icon: "none",
          });
        }, 1500);
      },
      fail: (fail) => {
        console.log("localstorage not have userdata>");
        // 本地无用户数据缓存 需要后续点击头像登录
      },
    });
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
@import "colorui/main.css";
@import "colorui/icon.css";
/* 自定义的全局样式*/
/* @import "index.css"; */
:root,
page,
body,
view {
  --mainColor: #ff430a;
  --pageBackgroundColor: linear-gradient(45deg, #ff9700, #ed1c24);
  --navBackgroundColor: linear-gradient(180deg, #ff9700, #ff970000);
  --disableTextColor: grey;
  --oakyButton: linear-gradient(45deg, #ffffffff, #ffffff, #ffffff, #ffffff, #009efa);
  --okayColor: #ffffff;
}
</style>
