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
    pageUrl: "addrAdmin",
  },
  {
    icon: 'cuIcon-ticket',
    text: '优惠券',
    pageUrl: "coupon",
  },
  {
    icon: 'cuIcon-creative',
    text: '建议反馈',
    pageUrl: "feedback",
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
  //swiper  360*180 (2:1) mini(4:1) logo(1) screen-swiper
  swiperImage: [/*"https://zzerx.cn/Artwork/artslow/photography/photography40.png", 
  "https://zzerx.cn/Artwork/artslow/photography/photography29.png", 
  "https://zzerx.cn/Artwork/artslow/photography/photography30.png", */
  'https://img.alicdn.com/imgextra/i3/2483119654/O1CN01anLxU02LBaHMo72du_!!2483119654.jpg_640x640q80_.webp', 
  'https://img.alicdn.com/imgextra/i1/2483119654/O1CN01ZVFBbq2LBaHGm1ikE_!!2483119654.jpg_640x640q80_.webp'],
}