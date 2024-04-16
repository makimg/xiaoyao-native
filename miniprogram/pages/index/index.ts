
import {showToast} from "../../utils/util";
const XIAOYAO_APP = getApp(); 
let {StatusBar,CustomBar} = XIAOYAO_APP.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalName: "",
    StatusBar,
    CustomBar
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    showToast("哈哈","none",1500);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(opts: { target: any }): WechatMiniprogram.Page.ICustomShareContent {
    console.log(opts.target)
    return {}
  },
  showModal(event: { currentTarget: { dataset: { target: any; }; }; }) {
    let that = this;
    that.setData({
      modalName: event.currentTarget.dataset.target
    })
  },
  onChangeModal(event: any){
    let that = this;
    let {value} = event.detail;
    that.setData({modalName:value})
  },
  hideModal() {
    let that = this;
    that.setData({
      modalName: null
    })
  },
})