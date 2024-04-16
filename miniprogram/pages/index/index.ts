
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
    CustomBar,
    modalShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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
  // 监听上传用户资料弹框滚动穿透
  modalFlagChange(event: { detail: { modalShow: any; }; }){
    let that = this;
    let {modalShow} = event.detail;
    that.setData({modalShow})
  },
  // 打开隐藏魔盒
  showModal(event: { currentTarget: { dataset: { value: any; }; }; }) {
    let that = this;
    let {value} = event.currentTarget.dataset;
    that.setData({modalName:value})
  },
  // 关闭隐藏魔盒
  hideModal() {
    let that = this;
    that.setData({modalName: ""})
  },
})