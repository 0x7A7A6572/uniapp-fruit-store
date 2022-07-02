/**
 *  存放固定的一些内容,样式
 */
import defaultLogoImg from "/static/images/logo.png";
export default {
  logosrc: defaultLogoImg,
  //固定的菜单列表
  menuList: [{
    icon: 'cuIcon-like',
    text: '我的收藏',
    pageUrl: null,
  },
  {
    icon: 'cuIcon-text',
    text: '我的订单',
    pageUrl: "orders",
  },
  {
    icon: 'cuIcon-location',
    text: '地址管理',
    pageUrl: "addrManage",
  },
  {
    icon: 'cuIcon-ticket',
    text: '优惠券',
    pageUrl: "addrManage",
  },
  {
    icon: 'cuIcon-creative',
    text: '建议反馈',
    pageUrl: "suggest",
  },
  {
    icon: 'cuIcon-question',
    text: '关于桔乐小铺',
    pageUrl: "about",
  }],
  //index.vue fab样式
  changeDrawerOffset: "5vw",
  shopingCartOffset: "25vw",
  shopingCartFabStyle: {
    /* 购物车Fab样式*/
    on: 'cuIcon-cart',
    off: 'cuIcon-cart',
    onColor: 'red',
    offColor: 'white',
    offBg: 'red',
    onBg: 'red'
  },
  orderTab: ["待付款", "待发货", "待收货", "已完成"],
  goodsClass: [
    {
      // id:0,
      className: '新鲜水果',
      classGoods: [
        {
          id: "SG0101",
          goodsName: '沙糖桔',
          goodsPrice: 45.00,
          goodsWeight: 10,   //单位斤
          goodsPack: '箱', //包装方式
          stock: 0,      //库存
          state: '售空',           //获取状态 热卖/下架/售空
          image: ['https://gd3.alicdn.com/imgextra/i1/2483119654/O1CN01yHP9LG2LBaGjiWxYW_!!2483119654.jpg_400x400.jpg']
        },
        {
          id: "SG0102",
          goodsName: '皇帝柑',
          goodsPrice: 45.00,
          goodsWeight: 10,
          goodsPack: '箱',
          stock: 0,
          state: '售空',
          image: ['https://gd3.alicdn.com/imgextra/i3/2483119654/O1CN019uJw762LBaGmLGYv5_!!2483119654.jpg_400x400.jpg']
        },
        {
          id: "SG0103",
          goodsName: '沃柑',
          goodsPrice: 58.00,
          goodsWeight: 10,
          goodsPack: '箱',
          stock: 100,
          state: '热卖',
          image: ['https://img.alicdn.com/bao/uploaded/i2/2483119654/O1CN01JzGkLU2LBaH6K0nJK_!!2483119654.jpg_240x240.jpg']
        }
      ]
    },
    {
      // id:1,
      className: '新鲜蔬菜',
      classGoods: [
        {
          id: "SC0101",
          goodsName: '油麦菜',
          goodsPrice: 2.80,
          goodsWeight: 0.5,   //单位斤
          goodsPack: '扎', //单位
          stock: 10,      //库存
          state: null,
          image: []
        },
        {
          id: "SC0201",
          goodsName: '薄荷',
          goodsPrice: 2.80,
          goodsWeight: 0.5,   //单位斤
          goodsPack: '扎', //单位
          stock: 10,      //库存
          state: null,
          image: []
        },
      ]
    },
    {
      className: '其他',
      classGoods: [
        {
          id: "QT0101",
          goodsName: '果盘',
          goodsPrice: 8.80,
          goodsWeight: 0.5,   //单位斤
          goodsPack: '个', //单位
          stock: 10,      //库存
          state: '热卖',
          image: ['https://gd4.alicdn.com/imgextra/i1/2483119654/O1CN01909Zfu2LBaHGRTTZ5_!!2483119654.jpg_400x400.jpg']
        },
      ]
    }
  ],
  //swiper  360*180 (2:1) mini(4:1) logo(1) screen-swiper
  swiperImage: [/*"https://zzerx.cn/Artwork/artslow/photography/photography40.png", 
  "https://zzerx.cn/Artwork/artslow/photography/photography29.png", 
  "https://zzerx.cn/Artwork/artslow/photography/photography30.png", */
  'https://img.alicdn.com/imgextra/i3/2483119654/O1CN01anLxU02LBaHMo72du_!!2483119654.jpg_640x640q80_.webp', 
  'https://img.alicdn.com/imgextra/i1/2483119654/O1CN01ZVFBbq2LBaHGm1ikE_!!2483119654.jpg_640x640q80_.webp'],
}