<template>
  <view class="fit-Round-button" :style="{ width: width }" @click.stop="click">
    <text
      class="__frb-left"
      :style="{ color: left.color, background: left.bg }"
      @click="left.click"
      >{{ left.text }}</text
    >
    <text
      class="__frb-right"
      :style="{ color: left.color, background: left.bg }"
      @click="right.click"
      >{{ right.text }}</text
    >
  </view>
</template>

<script>
export default {
  name: "comb-button",
  props: {
    click: { type: Function },
    width: { type: String },
    left: {
      type: Object,
      default: {
        text: "",
        color: "white",
        bg: "linear-gradient(90deg, #ff9700, #ff6700);",
        click: () => {},
      },
    },
    right: {
      type: Object,
      default: {
        text: "",
        color: "white",
        bg: "linear-gradient(90deg, #ff5700, #ed1c24);",
        click: () => {},
      },
    },
  },
  setup() {},
};
</script>

<style scope>
.fit-Round-button {
  display: flex;
  height: fit-content;
  width: max-content;
  margin: 0 auto;
}

.__frb-left {
  flex: auto;
  text-align: center;
  padding: 0.5em 0.5em;
  color: white;
  background: linear-gradient(90deg, #ff9700, #ff6700);
  border-top-left-radius: 1em;
  border-bottom-left-radius: 1em;
  box-shadow: none;
  font-weight: bold;
  font-size: larger;
}
.__frb-right {
  flex: auto;
  text-align: center;
  padding: 0.5em 0.5em;
  color: white;
  background: linear-gradient(90deg, #ff5700, #ed1c24);
  border-top-right-radius: 1em;
  border-bottom-right-radius: 1em;
  box-shadow: none;
  font-weight: bold;
  font-size: larger;
}
</style>
