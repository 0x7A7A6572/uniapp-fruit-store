<template>
  <!-- 弹窗 -->
  <view>
    <button
      class="float-button cu-btn bg-blue shadow-blur button-hover text-sl"
      @click="addOrder"
    >
      <text class="cuIcon-add text-white"></text>
    </button>

    <button
      class="float-button2 cu-btn bg-green shadow-blur button-hover text-sl"
      @click="copyOrders"
    >
      <text class="cuIcon-copy text-white"></text>
    </button>

    <button
      class="float-button3 cu-btn bg-yellow shadow-blur button-hover text-sl"
      @click="screenOrder"
    >
      <text class="cuIcon-filter text-white"></text>
    </button>

    <view :class="['cu-modal', modalName == 'DialogModal1' ? 'show' : '']">
      <view class="cu-dialog">
        <view class="cu-bar bg-white justify-end">
          <view class="content">订单复制成功</view>
          <view class="action" @click="hideModal">
            <text class="cuIcon-close text-red"></text>
          </view>
        </view>
        <view class="padding-xl">
          <text class="text-bold text-red" u
            >待处理{{ orders.length }}单 \n--------------\n</text
          >
          <text ser-select="true">{{ copyText }}</text>
        </view>
        <view class="cu-bar bg-white justify-end">
          <view class="action">
            <button class="cu-btn line-green text-green" @click="hideModal">取消</button>
            <button
              class="cu-btn bg-green margin-left"
              @click="hideModal"
              open-type="share"
            >
              确定
            </button>
          </view>
        </view>
      </view>
    </view>
  <!-- 手动添加订单弹窗 -->
    <view :class="['cu-modal', 'bottom-modal', modalName == 'bottomModal' ? 'show' : '']">
      <view class="cu-dialog">
        <view class="cu-bar bg-white">
          <view class="action text-green">确定</view>
          <view class="action text-bold">创建订单</view>
          <view class="action text-blue" @click="hideModal">取消</view>
        </view>
        <view class="padding-xl text-left">
          <view class="line-bottom">
            <text class="text-xl text-bold text-blue">快速创建</text>

            <view class="cu-form-group margin-top lineBlue">
              <textarea
                maxlength="-1"
                bindinput="textareaAInput"
                placeholder="多行文本输入框"
              ></textarea>
            </view>
          </view>

          <view class="action sub-title padding-top">
            <text class="text-xl text-bold text-blue">手动创建</text>
            <text class="bg-blue"></text>
          </view>

          <view class="cu-form-group">
            <view class="title text-bold">姓名</view>
            <input placeholder="name" :value="create_name" />
            <view class="title text-bold">手机号</view>
            <input placeholder="phone" :value="create_phone" />
          </view>
          <view class="cu-form-group">
            <view class="title text-bold">地址选择</view>
            <picker
              mode="region"
              @change="RegionChange"
              :value="region"
              :custom-item="customItem"
            >
              <view class="picker">
                {{ region[0] }}，{{ region[1] }}，{{ region[2] }}
              </view>
            </picker>
          </view>

          <view class="cu-form-group">
            <view class="title text-bold">详细地址</view>
            <input class="" placeholder="XX路XX小区XX栋" :value="create_address" />
          </view>

          <view class="cu-form-group">
            <view class="title text-bold">规格</view>
            <picker
              :mode="multiSelector"
              :bindchange="MultiChange"
              :bindcolumnchange="MultiColumnChange"
              :value="multiIndex"
              :range="multiArray"
            >
              <view class="picker">
                <!-- {{ multiArray[0][multiIndex[0]] }}，{{ multiArray[1][multiIndex[1]] }} -->
              </view>
            </picker>
          </view>

          <view class="cu-form-group">
            <view class="title text-bold">备注</view>
            <input placeholder="喜好丶要求" :value="create_remarks" />
          </view>
        </view>
      </view>
    </view>

    <view class="cu-bar" style="margin-top: 60rpx">
      <view class="action sub-title" style="display: block">
        <text
          class="cuIcon-back text-xl text-bold text-blue"
          @click="navigateBack"
        ></text>
        <text class="text-xl text-bold text-blue">后台数据管理</text>
        <text class="text-ABC text-blue">admin</text>
        <!-- last-child选择器-->
      </view>
    </view>

    <scroll-view scroll-x class="nav">
      <view class="flex text-center">
        <view
          :class="
            'text-bold cu-item flex-sub ' + (index == TabCur ? 'text-orange cur' : '')
          "
          v-for="(item,index) in navTab"
          @click="tabSelect"
          :data-id="index"
          :key="item"
        >
          {{ navTab[index] }}
        </view>
      </view>
    </scroll-view>

    <view
      v-for="(item, index) in orders"
      :class="'cu-card case' + (isCard ? 'no-card' : '')"
      :key="index"
    >
      <view class="cu-item shadow image">
        <view class="cu-form-group">
          <view class="title">单号</view>
          <input placeholder="手动填写或扫描录入单号" :value="num" />
          <text class="text-bold cuIcon-scan text-blue" @click="scanCode"></text>
        </view>

        <view class="solid-bottom padding-left padding-bottom">
          <text
            class="text-bold cuIcon-copy text-blue"
            style="margin-right: 10rpx"
            @click="copyThis"
            :data-item="index"
          ></text>
          <text class="text-bold"> {{ orders[index].name }} </text>
          <text class=""> {{ orders[index].phone }} </text>
          <text class="text-bold text-orange">
            {{ orders[index].type }} {{ orders[index].weight }}斤
          </text>
          <text class="text-bold text-green block"> {{ orders[index].address }} </text>
          <text class="text-grey text-sm">备注： {{ orders[index].remarks }}</text>
        </view>

        <view class="solid-bottom text-sm padding bg-oaky-Botton">
          <text class="text-grey">创建时间 {{ orders[index].time }} </text>
          <view class="mtag text-sl">
            <text class="cuIcon-icloading text-white" style="margin-right: 10rpx"> </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { ref } from "vue";
import admin from "@/api/admin";
export default {
  setup() {
    let navTab = ["待处理", "已完成", "异常"];

    let create_address = ref("");
    let create_name = ref("");
    let create_phone = ref("");
    let create_spec = ref([]);
    let create_remarks = ref("");
    let multiArray = ref([
      ["沙糖桔", "皇帝柑", "沃柑", "其他"][("10斤", "5斤", "各5斤")],
    ]);
    let multiIndex = [0, 0];
    let TabCur = ref(0);
    let scrollLeft = ref(0);
    let num = ref("");
    let orders = ref([]);
    let modalName = ref("");
    let region = ref(["广西省","南宁市","江南区"]);
    let copyText = ref("");

    admin.adminData((res)=>{
       console.log("res:",res);
       orders.value = res.data.orders;
    });

    function RegionChange(e) {
       region.value = e.detail;
    }

    function tabSelect(e) {
      TabCur.value = e.currentTarget.dataset.id;
      scrollLeft.value = (e.currentTarget.dataset.id - 1) * 60;
      console.log(e)
    }

    function hideModal() {
      modalName.value = null;
    }

    function addOrder() {
      modalName.value = "bottomModal";
    }
    function screenOrder() {
      uni.showToast({
        title: "筛选功能未开发",
        icon: "error",
      });
    }

    function MultiChange(e) {
        multiIndex.values = e.detail.value;
    }

    
    function MultiColumnChange(e) {
      multiIndex[e.detail.column].value = e.detail.value;
    }
 function scanCode(e) {
      var that = this;
      wx.scanCode({
        success(res) {
          var num = res.result;
          that.setData({
            num: num,
          });
          // exNum = num
        },
      });
    }
    function copyThis(e) {
      let obj = orders[e.currentTarget.dataset.item];
      let orderText =
        obj.name +
        " " +
        obj.phone +
        " " +
        obj.address +
        " " +
        obj.type +
        " " +
        obj.weight +
        "斤" +
        "/n" +
        "备注：" +
        obj.remarks;

      wx.setClipboardData({
        data: orderText,
        success: function (res) {
          wx.showToast({
            title: "订单信息已复制",
          });
        },
        fail: function (res) {
          wx.showToast({
            title: "订单复制失败",
            icon: "error",
          });
        },
      });
    }
    function copyOrders(e) {
      const E = e;
      let orderText = "";
      for (let i = 0; i < orders.length; i++) {
        let obj = orders[i];
        orderText =
          orderText +
          obj.name +
          " " +
          obj.phone +
          " " +
          obj.address +
          " " +
          obj.type +
          " " +
          obj.weight +
          "斤" +
          "\n" +
          "备注：" +
          obj.remarks +
          "\n\n";
      }

      wx.setClipboardData({
        data: orderText,
        success: (res) => {
            copyText.value = orderText
            modalName.value ="DialogModal1"

        },
        fail: function (res) {
          wx.showToast({
            title: "订单复制失败",
            icon: "error",
          });
        },
      });
    }
    function textareaAInput(e) {
      let textar = e.detail.value.split("\n");
      if (textar.length > 0 && textar[1].indexOf("斤") != -1) {
        let essInfor = app.smart(textar[0]);
        console.log(essInfor);
        let spec = textar[1].split(" ");
        let remarks = textar.length > 1 && textar[2] != "" ? textar[2] : "无";
       
          region.value = [essInfor.province, essInfor.city, essInfor.county];
          create_address.value = essInfor.address;
          create_name.value = essInfor.name;
          create_phone.value = essInfor.phone;
          create_spec.value = [spec[0], spec[1]];
          create_remarks.value = remarks;
     
      } else {
        wx.showToast({
          title: "解析文本失败！",
          icon: "error",
        });
      }
    }


    function navigateBack(e) {
      wx.navigateBack();
    }
    return {
      addOrder,
      navTab,
      region,
      create_address,
      create_name,
      create_phone,
      create_spec,
      create_remarks,
      multiArray,
      multiIndex,
      TabCur,
      scrollLeft,
      num,
      orders,
      modalName,
      copyText,
      RegionChange,
      tabSelect,
      hideModal,
      screenOrder,
      MultiChange,
      MultiColumnChange,
      scanCode,
      copyThis,
      copyOrders,
      textareaAInput,
      navigateBack,
    };
  },
};
</script>

<style scope>

.mtag {
  position: absolute;
  display: inline-flex;
  right: 0%;
  bottom: 0%;
}

.bg-oaky-Botton {
  background-image: var(--oakyButton);
  color: var(--white);
}

.float-button {
  z-index: 9;
  position: fixed;
  bottom: 5%;
  right: 5vw;
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
}

.float-button2 {
  z-index: 9;
  position: fixed;
  bottom: 5%;
  right: 25vw;
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
}

.float-button3 {
  z-index: 9;
  position: fixed;
  bottom: 5%;
  right: 45vw;
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
}

.lineBlue {
  border: 2px solid #009efa;
}

.line-bottom {
  padding-bottom: 15rpx;
  border-bottom: 2px solid gray;
}

.line-top {
  border-top: 2px solid gray;
}
</style>
