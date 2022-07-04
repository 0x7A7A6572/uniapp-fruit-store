<template>
  <view class="row text-bold padding-lr">
    <text>购买数量</text>
    <view class="quantity-position">
      <!-- 主容器 -->
      <view class="stepper">
        <!-- 减号 -->
        <button :class="'sign ' + (count < min+1 ? 'disabled' : 'normal')" @click="delCount">
          -
        </button>
        <!-- 数值 -->
        <input class="number" type="number" :value="count" disabled="disabled" />
        <!-- 加号 -->
        <button
          :class="'sign ' + (count > max ? 'disabled' : 'normal')"
          @click="addCount"
        > +
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
    props:{
        text: String,
        count: Number,
        max: Number,
        min: Number,
        addCount: Function,
        delCount: Function
    }
};
</script>

<style>
/*主容器*/
.stepper {
  /* width: 90px; */
  height: 26px;
  margin: 0 auto;
}
button.sign::after{
  content: none;
}

/*加号和减号*/
.stepper .sign {
  color: white;
  width: 24px;
  line-height: 26px;
  text-align: center;
  float: left;
  font-size: larger;
  border-radius: 0.2em;
  padding: inherit;
}

/*数值*/
.stepper .number {
  width: 40px;
  height: 26px;
  float: left;
  margin: 0 auto;
  text-align: center;
  font-weight: bold;
  font-size: larger;
}

/*普通样式*/
.stepper .normal {
  /* color: black; */
  background-color: orangered;
}

/*禁用样式*/
.stepper .disabled {
  color: white;
  background-color: #ccc;
}
</style>
