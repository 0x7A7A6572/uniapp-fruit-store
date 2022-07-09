<template>
    <button
      :class="'float-button cu-btn shadow-blur button-hover  text-sl'"
      :style="{ right: offset, backgroundColor: bg }"
    >
      <text :class="icon" :style="{ color: color }"></text>
      <slot></slot>
    </button>
</template>

<script>
export default {
  name: "cui-float-action-button",
    props: {
    action: {
      type: Boolean,
      default: false,
    },
    offset: {
      type: String,
      default: "5vw",
    },
    icon: {type: String, default: "cuIcon-cascades"},
    color: {type: String,  default: "white"},
    bg: {type: String, default: "orange"},
    // actionStyle: {
    //   type: Object,
    //   default: {
    //     on: "cuIcon-right",
    //     off: "cuIcon-cascades",
    //     onColor: "orange",
    //     offColor: "white",
    //     onBg: "white",
    //     offBg: "orange",
    //   },
    // },
  },
  setup(props){
    // function getFabBackgroundColor() {
    //   return props.action ? props.actionStyle.onBg : props.actionStyle.offBg;
    // }
    // function getFabIcon() {
    //   return props.action ? props.actionStyle.on : props.actionStyle.off;
    // }
    // function getFabIconColor() {
    //   return props.action ? props.actionStyle.onColor : props.actionStyle.offColor;
    // }
    // return{
    //   getFabBackgroundColor,
    //   getFabIcon,
    //   getFabIconColor
    // }

  },
  // computed: {
  //   getFabBackgroundColor() {
  //     return this.action ? this.actionStyle.onBg : this.actionStyle.offBg;
  //   },
  //   getFabIcon() {
  //     return this.action ? this.actionStyle.on : this.actionStyle.off;
  //   },
  //   getFabIconColor() {
  //     return this.action ? this.actionStyle.onColor : this.actionStyle.offColor;
  //   },
  // },
  // onLoad() {
  //   console.log("propr status:", this.actionStyle);
  // },

};
</script>

<style>
.float-button {
  z-index: 9;
  position: fixed;
  bottom: 5%;
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
}
</style>
