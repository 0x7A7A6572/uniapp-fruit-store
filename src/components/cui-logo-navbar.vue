<template>
  <view
    class="cui-log-nav"
    :style="{ height: height + 'px', paddingTop: statusBarHeight + 'px' }"
  >
    <text v-if="isBack" class="cuIcon-back navbar-func" @tap="BackPage"></text>
    <image v-if="logo != null" class="logo margin-top-xl" :src="logo" mode="heightFix">
    </image>
	<slot  class="navbar-func"></slot>
  </view>
</template>

<script>
export default {
  name: "cui-logo-navbar",
  data() {
    return {};
  },
  props: {
    logo: {
      type: String,
    },
    isBack: {
      type: Boolean,
    },
    height: {
      type: Number,
    },
    statusBarHeight: {
      type: Number,
    },
  },
  methods: {
    NavChange: function (e) {
      this.PageCur = e.currentTarget.dataset.cur;
    },

    BackPage() {
      uni.navigateBack();
    },
  },
};
</script>

<style>
.cui-log-nav {
  width: 100vw;
  z-index: 1;
  background: linear-gradient(180deg, #ff9700, #ff970000);
  /* height: 60px; */
  /* padding: 0.5em; */
  /* padding-top: var(--status-bar-height); */
}
.cui-log-nav .logo {
  position: absolute;
  height: 5vh;
  width: 100vw;
  margin-left: 2vw;
  z-index: 1;
}
.navbar-func {
  font-size: 2em;
  color: white;
  padding: 0.5em;
  padding-top: var(0.5em + 5px);
}
</style>
