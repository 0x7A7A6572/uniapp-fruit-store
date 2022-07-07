<template>
  <view class="layout-addr-admin">
    <cui-logo-navbar
      class="logo-nav"
      :height="navHeight"
      :statusBarHeight="statusBarHeight"
      :isBack="true"
    >
    </cui-logo-navbar>
    <cui-float-action-button
      :actionStyle="addFabStyle"
      @tap="showModal"
    ></cui-float-action-button>
    <view class="card-list" :style="{ paddingTop: statusBarHeight + navHeight + 'px' }">
      <view
        v-for="(item, index) in addrs"
        class="card-item solid-bottom action"
        :key="index"
        @click="addrClick(item,index)"
      >
        <view class="addr-msg">
          <text class="text-xl text-bold padding">{{ item.name }}</text>
          <text>{{ item.phone }}</text>
          <text v-if="item.isDefault" class="cu-tag line-orange round margin">默认</text>
          <!-- 地址用view换行 -->
          <view class="padding-left">{{ item.region.join(" ") + item.address }}</view>
        </view>
        <text class="addr-del cuIcon-delete" @click.stop="delAddr(item)"></text>
      </view>
    </view>
  </view>

  <!-- 手动添加订单弹窗 -->
  <view :class="['cu-modal', 'bottom-modal', modalName == 'bottomModal' ? 'show' : '']">
    <view class="cu-dialog">
      <view class="cu-bar bg-white">
        <text class="action text-green" @click="addAddr">确认</text>
        <text class="action text-bold text-xl">{{isEditItem ? "修改地址" : "添加地址"}}</text>
        <text class="action text-red" @click="hideModal">取消</text>
      </view>
      <view class="padding-xl text-left">
        <view class="line-bottom">
          <text class="text-xl text-bold text-orange">快速添加</text>
          <!-- <uni-easyinput
            borderColor="orange"
              type="textarea"
              v-model="value"
              placeholder="输入一段包含姓名手机号详细地址的文本，将会自动识别"
            ></uni-easyinput> -->

          <view class="cu-form-group margin-top lineBlue">
            <textarea
              maxlength="-1"
              @input="textareaAInput"
              placeholder="输入一段包含姓名手机号详细地址的文本，将会自动识别，名字与地址之前需要有分隔"
            ></textarea>
          </view>
        </view>

        <view class="action sub-title padding-top">
          <text class="text-xl text-bold text-orange">手动创建</text>
          <text class="bg-blue"></text>
        </view>

        <view class="cu-form-group">
          <view class="title text-bold">姓名</view>
          <input placeholder="name" :value="create_name" @input="inputNameChange" />
          <view class="title text-bold">手机号</view>
          <input
            placeholder="phone"
            :value="create_phone"
            @input="inputPhoneChange"
            type="tel"
          />
        </view>
        <view class="cu-form-group">
          <view class="title text-bold">地址选择</view>
          <picker
            @change="RegionChange"
            mode="region"
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
          <input
            placeholder="XX路XX小区XX栋"
            :value="create_address"
            @input="inputAddressChange"
          />
        </view>

        <view class="cu-form-group">
          <view class="action">
            <text class="cuIcon-titles text-orange"></text> 设为默认
          </view>
          <view class="action">
            <switch
              :class="[isDefaultAddr ? 'checked' : '', 'orange']"
              @change="changeDefault"
              color="#FFCC33"
            ></switch>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import cuiLogoNavbar from "@/components/cui-logo-navbar.vue";
import cuiFloatActionButton from "@/components/cui-float-action-button.vue";
// import smart from "address-smart-parse";
import otherApi from "@/api/other.js";
import utils from "@/utils/utils.js";
import { onLoad } from "@dcloudio/uni-app";
import { useStore } from "vuex";
import { ref } from "vue";
// import uniEasyinput from "@/components/uni-easyinput/uni-easyinput.vue";
// import uniSection from "@/components/uni-section/uni-section.vue";
export default {
  components: { cuiLogoNavbar, cuiFloatActionButton },
  setup() {
    const store = useStore();
    let isEditItem = ref(false); //是修改还是添加
    let editIndex = -1;  //修改的下标
    let addrs = store.getters.addrs;
    let modalName = ref("");
    let region = ref(["广东省", "广州市", "海珠区"]);
    let create_address = ref("");
    let create_name = ref("");
    let create_phone = ref("");
    let isDefaultAddr = ref(false);
    let isSelectMode = ref(false);

    onLoad((options) => {
      console.log("上一个界面传过来的值：", options);
      if (options.msg == "onSelectAddrClick") {
        isSelectMode.value = true;
      }
    });

  /** 地址item点击事件 */
   function addrClick(addr, index) {
      if (isSelectMode.value) {
          console.log("选择了地址：", addr.toString());
          store.commit("updateSelectAddr", addr);
          uni.navigateBack();
          isSelectMode.value = false; //重置
      }else{
        editAddr(addr, index);
      }
    }

    /** 自动识别收货地址 */
    function textareaAInput(e) {
      // console.log(e.detail)
      if (e.detail.cursor > 20) {
        //防抖
        otherApi.smAddress(e.detail.value, (res) => {
          if (res.status == 0) {
            console.log("smAddress ->", res);
            let smartaddr = res.result;
            create_name.value = smartaddr.person_name;
            create_phone.value = smartaddr.tel;
            create_address.value = smartaddr.short_address;
            region.value = [
              smartaddr.address_components.province,
              smartaddr.address_components.city,
              smartaddr.address_components.district,
            ];
          } else {
            uni.showToast({
              title: res.message,
              icon: "none",
            });
            console.log("smAddress ->", res);
          }
        });
      }
    }

    /** 手动改变地址监听 */
    function RegionChange(e) {
      region.value = e.detail.value;
    }
    /** 输入事件监听 */
    function inputNameChange(e) {
      create_name.value = e.detail.value;
    }
    function inputPhoneChange(e) {
      create_phone.value = e.detail.value;
    }
    function inputAddressChange(e) {
      create_address.value = e.detail.value;
    }

    /** 是否设为默认 */
    function changeDefault(e) {
      isDefaultAddr.value = e.detail.value;
    }
    /** 隐藏弹窗 */
    function hideModal() {
      modalName.value = null;
      // console.log("隐藏弹窗");
      isEditItem.value = false;
       editIndex = -1;
    }

    function showModal(clear,index) {
      if (clear == true) {
        _presetDataWindow(null);
      }
      modalName.value = "bottomModal";
      // console.log("显示弹窗");
    }

    /**添加地址 */
    function addAddr() {
      if (
        create_name.value != "" &&
        create_phone.value != "" &&
        create_address.value != ""
      ) {
        let needAddr = {
          name: create_name.value,
          phone: create_phone.value,
          region: region.value,
          address: create_address.value,
          isDefault: isDefaultAddr.value,
        };
        if (isEditItem.value) {
          store.commit("updateAddrIndex", {index: editIndex, addr: needAddr});
          uni.showToast({
            title: "已更新地址",
            duration: 1000,
          });
          hideModal();
        } else if (!_isRepeatAddress(addrs, needAddr)) {
          store.commit("pushAddr", needAddr);
          hideModal();
        } else {
          uni.showToast({
            title: "已有相同地址",
            duration: 1000,
            icon: "error",
          });
        }
      } else {
        console.log(create_name.value, create_phone.value, create_address.value);
        uni.showToast({
          title: "格式错误",
          duration: 1000,
          icon: "error",
        });
      }
    }

    /** 删除地址 */
    function delAddr(addr) {
      console.log("删除地址：", addr);
      // store.commit("delAddr",addr);
    }

    /** 修改地址 */
    function editAddr(addr,index) {
      isEditItem.value = true;
      editIndex = index;
      // console.log("修改地址：", addr);
      _presetDataWindow(addr);
      showModal(false,index);
    }

    /** 预置弹窗数据 */
    function _presetDataWindow(addr) {
      if (addr == null) {
        // region.value = ["广东省", "广州市", "海珠区"];
        create_address.value = "";
        create_name.value = "";
        create_phone.value = "";
        isDefaultAddr.value = false;
      } else {
        region.value = addr.region;
        create_address.value = addr.address;
        create_name.value = addr.name;
        create_phone.value = addr.phone;
        isDefaultAddr.value = addr.isDefault;
      }
    }

    /** 判断是否重复地址 */
    function _isRepeatAddress(addrs, addr) {
      let isRepeat = false;
      addrs.forEach((e) => {
        if (utils.deepEqual(e, addr)) {
          isRepeat = true;
        }
      });
      return isRepeat;
    }

    return {
      textareaAInput,
      RegionChange,
      hideModal,
      showModal,
      addAddr,
      delAddr,
      // editAddr,
      inputNameChange,
      inputPhoneChange,
      inputAddressChange,
      changeDefault,
      addrs,
      region,isEditItem,
      modalName,
      create_address,
      create_name,
      create_phone,
      isDefaultAddr,addrClick,
      addFabStyle: {
        off: "cuIcon-add",
        offColor: "white",
        offBg: "orange",
      },
      navHeight: useStore().getters.nvaHeight,
      statusBarHeight: useStore().getters.statusBar,
      customItem: "全部",
    };
  },
};
</script>

<style scope>
.layout-addr-admin {
  text-align: center;
  height: 100vh;
  background-color: #c6c7c7;
}
.card-list {
  width: 96%;
  min-height: 80vh;
  background-color: white;
  margin: 0 auto;
  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;
}
.card-item {
  justify-items: center;
  text-align: left;
  justify-content: center;
  padding: 0.8em;
  display: flex;
}
.addr-del {
  text-align: center;
  min-width: 10%;
  max-width: 10%;
  margin: auto;
  color: red;
  font-size: x-large;
  font-weight: bold;
}
.addr-msg {
  flex: 1;
  border-left: 5px solid orange;
  border-radius: 3px;
}
</style>
