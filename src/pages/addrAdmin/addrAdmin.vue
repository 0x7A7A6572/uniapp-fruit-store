<template>
  <view>
    <cui-logo-navbar
      class="logo-nav"
      :height="navHeight"
      :statusBarHeight="statusBarHeight"
      :isBack="true"
    >
    </cui-logo-navbar>

  </view>
</template>

<script>
import cuiLogoNavbar from "@/components/cui-logo-navbar.vue";
import { useStore } from "vuex";
export default {
  components: { cuiLogoNavbar },
  setup() {
    return {
      navHeight: useStore().getters.nvaHeight,
      statusBarHeight: useStore().getters.statusBar,
    };
  },
};
</script>

<style></style>