Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    _modal: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onCloseModal(){
      let that = this;
      this.setData({_modal:false},()=>{
        that.triggerEvent("onChangeModalFlag",{modalShow:false});
      });
    },
    _onShowModal(){
      let that = this;
      this.setData({_modal:true},()=>{
        that.triggerEvent("onChangeModalFlag",{modalShow:true});
      });
    }
  }
})