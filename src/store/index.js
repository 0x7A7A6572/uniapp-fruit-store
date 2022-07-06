import { createStore } from 'vuex';
export default createStore({
  //需要共享的组件状态
  state: {
    showLog: false,
    drawerAction: true,
    goodsClass: [],
    shoppingCart: {
      goodsList: [{
        goodsId: 1,
        buyCount: 1
      },
      {
        goodsId: 2,
        buyCount: 3
      },
      ]
    },
    //用户数据
    userInfo: {
      id: null, /* 后端用code获取openid和session_key之后绑定到业务系统返回用户id */
      type: 'admin', /*用户类型 user，admin */
      vip: true,
      avatarUrl: '/static/images/avatar.png', /* 用户头像 */
      nickName: '未登录',
      loveGoods: '暂无喜欢的商品',
      oders: [{
        orderId: "订单id",
        orderStatu: "订单状态",
        waybillNumber: "KD0000000000000",
          goodsId: 1,
          buyCount: 1
      }],
      addrs: [{
        name: "姓名",
        phone: "电话",
        region: ["广东省", "广州市", "海珠区"],
        address: "详细地址",
        isDefault: false
      }]
    },
    systemInfo: {
      customBar: 0,
      statusBar: 0,
    }
  },
  mutations: {
    updatedDrawerAction(state, statu) {
      console.log("i'm change", statu)
      state.drawerAction = statu;
    },
    updatedCustomBar(state, num) {
      state.systemInfo.customBar = num;
    },
    updatedStatusBar(state, num) {
      state.systemInfo.statusBar = num;
    },
    updatedUserInfo(state, obj) {
      if (obj.id != null && obj.id != "") {
        // state.userInfo = obj;
        state.userInfo.id = obj.id;
        state.userInfo.type = obj.type;
        state.userInfo.vip = obj.vip;
        // mock只简单设置了get 所以把名字头像和用户数据分开了，get的是同一个用户
        // state.userInfo.avatarUrl = obj.avatarUrl;
        // state.userInfo.nickName = obj.nickName;
        state.userInfo.oders = obj.oders;
        state.userInfo.addrs = obj.addrs;
        state.userInfo.coupons = obj.coupons;
        state.userInfo.msgs = obj.msgs;
        state.userInfo.shoppingCart = obj.shoppingCart;    
        saveDate("userInfo", state.userInfo, () => { console.log("save userInfo") }); 
      }
    },
    updatedUserBaseInfo(state, obj) {
      if (obj.avatarUrl != null && obj.nickName != null) {
        state.userInfo.avatarUrl = obj.avatarUrl;
        state.userInfo.nickName = obj.nickName;
        saveDate("userInfo", state.userInfo, () => { console.log("save userInfo") });
      }
    },
    updateAddrs(state, addrs){
      if(Array.isArray(addrs))
      state.userInfo.addrs = addrs;
    },
    updateAddrIndex(state, editor){
      state.userInfo.addrs[editor.index] = editor.addr;
    },
    pushAddr(state, addr){
      if(typeof addr == "object"){
        checkPutAddrs(state.userInfo.addrs,addr);
      }
    },
    updateGoodsClass(state, array){
      if(Array.isArray(array) && array[0].className != null){
        state.goodsClass = array;
      }else{
        console.error("updateGoodsClass error",array);
      }
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    isLogined(state){
      if (state.userInfo.id != null && state.userInfo.id != "") {
        return true;
      }else{
        return false;
      }
    },
    drawerAction(state) {
      return state.drawerAction;
    },
    shoppingCart(state) {
      return state.shoppingCart;
    },
    userInfo(state) {
      return state.userInfo;
    },
    userBaseInfo(state) {
      return {
        avatarUrl: state.userInfo.avatarUrl,
        nickName: state.userInfo.nickName
      }
    },
    addrs(state){
      return state.userInfo.addrs;
    },
    defaultAddr(state){
      return getDefaultAddr(state.userInfo.addrs);
    },
    coupons(state){
      return state.userInfo.coupons;
    },
    systemInfo(state) {
      return state.systemInfo;
    },
    nvaHeight(state) {
      return state.systemInfo.customBar + state.systemInfo.statusBar;
    },
    statusBar(state) {
      return state.systemInfo.statusBar;
    },
    showLog(state) {
      return state.showLog;
    },
    goodsClass(state){
      return state.goodsClass;
    },
    goodsListById(state){
      return function(id){
        return getGoodsListById(state.goodsClass, id);
      }
    }
  },
})

/** 保存数据到本地 */
function saveDate(key, data, callback) {
  uni.setStorage({
    key: key,
    data: data,
    success: function () {
      if (callback) {
        callback()
      }
    }
  });
}

/** id查询商品详情 */
function getGoodsListById(goodsClass, id){
  for(let index in goodsClass){
    for(let _index in goodsClass[index].classGoods){
      if(goodsClass[index].classGoods[_index].id == id){
        return goodsClass[index].classGoods[_index];
      }
    }
  }
  return null;
}

/** 检查是否更改默认地址 */
function checkPutAddrs(addrs, addr){
  if(addr.isDefault){
    for(let index in addrs){
      if(addrs[index].isDefault){
        addrs[index].isDefault = false;
      }
    }
  }
  addrs.push(addr);
}

/** 获取默认地址 */
function getDefaultAddr(addrs){
  for(let index in addrs){
    if(addrs[index].isDefault){
      return addrs[index];
    }
  }
  return addrs[0]
}
