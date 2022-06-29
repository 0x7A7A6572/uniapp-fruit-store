import { createStore } from 'vuex';
import login from '../api/login';
export default createStore({
  //需要共享的组件状态
  state: {
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
      openid: null,
      type: 'admin', /*用户类型 user，admin */
      vip: true,
      avatarUrl: '/static/images/avatar.png', /* 用户头像 */
      nickName: '未登录',
      loveGoods: '暂无喜欢的商品',
      oderrs: [{
        orderId: "订单id",
        orderStatu: "订单状态",
        waybillNumber: "KD0000000000000",
        goodsList: [{
          goodsId: 1,
          buyCount: 1
        }]
      }]
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  getters: {
    shoppingCart(state) {
      return state.shoppingCart;
    },
    userInfo(state) {
      login.do((res,loginRes,infoRes)=>{
         if(res.statu){
            console.log("登录并获取数据成功",loginRes,infoRes);
         }else{
          uni.showToast({
            title: '登录失败',
            duration: 2000
          });
          console.warn(res.msg)
         }
      })
      return state.userInfo;
    }
  }
})