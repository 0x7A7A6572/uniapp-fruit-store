<template>
  <view id="_zx_water_fall" class="zx-water-fall">
    <view class="zx-water-fall__col" v-for="(_item, _index) in artsGroup" :key="_index">
      <view class="zx-water-fall__card" v-for="(item, index) in _item" :key="index" @tap="onSelectItem(item)">
        <img :src="item.image" />
        <view class="zx-water-fall__card__desc">
          <span class="__desc_title">{{ item.name }}</span>
          <span class="__desc_summary">x{{ item.count }}</span>
          <span class="__desc_date">￥{{ item.price }}</span>
        </view>
        <view class="text-grey text-xxl">
          <text :class="(item.selected ? 'cuIcon-roundcheckfill text-orange' : ' cuIcon-round')"></text>
        </view>
      </view>
    </view>

  </view>
</template>
<script>
export default {
  data() {
    return {
      artsGroup: groupByColumn(this.arts, this.column),
    };
  },
  props: {
    arts: {
      type: Object,
    },
    column: {
      type: Number,
    },
    onSelectItem: Function
  },
  mounted() {},
  methods: {},
  components: {},
};
function groupByColumn(array, column) {
  let indexCount = 0;
  let arr = [];
  for (var i = 0; i < column; i++) {
    arr[i] = [];
  }
  //console.log(array.length,);
  while (indexCount < array.length) {
    for (let i = 0; i < column; i++) {
      arr[i].push(array[indexCount]);
      indexCount++;
      if (indexCount >= array.length) {
        break;
      }
    }
  }
  return arr;
}
</script>
<style>
.zx-water-fall {
  padding-top: 10%;
  display: flex;
  background-color: rgb(235, 235, 235);
  height: 100vh;
  /* font-size: larger; */
}
.zx-water-fall__col {
  /* width: 50%; */
  flex: 1;
  margin: 2vw;
  width: 42vw;
}
.zx-water-fall__card {
  /* border-top-color: orangered;
  border-top-style: inset !important;
  border-top-width: 5px !important; */
  background-color: white;
  border-radius: 8px;
  padding: 2vw;
}

.zx-water-fall__card img,
.zx-water-fall__card image {
  height: 40vw;
  border-color: orangered;
  background-color: white;
  border-style: dotted;
  border-width: 1vw;
  border-radius: 8px;
}

.zx-water-fall__card .el-card__body {
  height: fit-content;
  padding: 5px;
}
.zx-water-fall__card .__desc_title {
  font-weight: bold;
  font-size: 1.2em;
}
.zx-water-fall__card .__desc_summary {
  color: orange;
  font-size: 1.2em;
  font-weight: bold;
  padding-left: 5px;
  flex: 1;
  text-align: left;
}
.zx-water-fall__card .__desc_date {
  font-size: 1.5em;
  font-weight: bold;
  color: orangered;
}

.zx-water-fall__card__desc::before {
  content: "|";
  font-weight: bold;
  color: orangered;
}
.zx-water-fall__card__desc {
  display: flex;
  flex-wrap: wrap;
}
</style>
