const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}






// get请求
function getWxRequest(url: any,data: {} | undefined,isNeedLoading: boolean | undefined){
  let contentType = "application/json";
  return wxRequest(url,data,isNeedLoading,"GET",60000,contentType);
}
// post请求
function postWxRequest(url: any,data: {} | undefined,isNeedLoading: boolean){
  let contentType = "application/x-www-form-urlencoded";
  return wxRequest(url,data,isNeedLoading=false,"POST",60000,contentType);
}

//封装请求
function wxRequest(url: any,data={},isNeedLoading=false,method: string,timeout: number,contentType: string){
  console.log(data);
  if(isNeedLoading) showToast("小默在努力搬砖...","none",20000);
  let promiseData = new Promise((resolve,reject)=>{
    wx.request({
      url,
      data,
      header: {"content-type": contentType,},
      method,
      timeout,
      dataType: 'json',
      forceCellularNetwork: true,
      success(res){
        if(isNeedLoading) hideToast();
        let {statusCode} = res;
        switch(statusCode){
          case 200:
            resolve(res.data);
            break;
          default:
            reject(res.data);
            break;
        }
      },
      fail(){
        showToast(`小默正在开小差儿...`,"none",2000);
      }
    })
  })
  return promiseData;
}

// 页面路由========================================================================
function navigateTo(url: any){
  wx.navigateTo({
    url,
  })
}

function redirectTo(url: any){
  wx.redirectTo({
    url,
  })
}

function navigateBack(delta: any){
  wx.navigateBack({
    delta,
  })
}

function reLaunch(url: any){
  wx.reLaunch({
    url,
  })
}

function switchTab(url: any){
  wx.switchTab({
    url,
  })
}


// 页面交互状态 =============================================================================
//显示toast状态
function showToast(title: string,icon: string,duration: number | undefined){
  wx.showToast({title, icon, mask: true,duration: duration?duration: 60000,})
}

//隐藏toast状态
function hideToast(){
  wx.hideToast()
}

//页面滚动
function pageScrollTo(selector: any, callBack: (arg0: WechatMiniprogram.GeneralCallbackResult) => any,duration: any){
  wx.pageScrollTo({
    selector,
    duration: duration?duration:300,
    success: function(res){
      return callBack(res);
    }
  })
}

//设置页面title
function setNavigationBarTitle(title: any){
  wx.setNavigationBarTitle({
    title,
  })
}

// 使用函数节流防止重复点击
function throttle(fn: { apply: (arg0: any, arg1: IArguments) => void }, gapTime: number | null | undefined) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1000
  }
  let _lastTime: number | null = null
  // 返回新的函数
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}


// 文件====================================================================
//通过下载文件获取微信返回的临时文件地址 以便后续查看文件
function mkDownloadFile (url: any,callBackSucc: (arg0: WechatMiniprogram.DownloadFileSuccessCallbackResult) => void,loadingFlag=true){ //处理文件
  if(loadingFlag) showToast("文件处理中","none",20000);
  wx.downloadFile({
    url, //仅为示例，并非真实的资源
    success (res) {
      // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
      if (res.statusCode === 200) {
        if(loadingFlag) hideToast();
        console.log(res,"res")
        return callBackSucc(res);
      } else {
        console.log(res,"error")
        showToast("文件处理失败，请稍后重试","none",2000);
        return;
      }
    },
    fail(error){
      if (error.errMsg && error.errMsg != ""){
        showToast("文件处理失败，请稍后重试","none",2000);
      }
    }
  })
}

// 查看微信返回临时地址的文件
function mkOpenDocument(filePath: any,showMenu: any){
  wx.openDocument({
    filePath,
    showMenu: showMenu?showMenu:false,
    success: function (res) {
      hideToast();
      console.log('打开文档成功')
      return;
    }
  })
}

// 图片预览==========================================================
function previewImage(current_url: any, urls: any){
  wx.previewImage({
    current: current_url,
    urls: urls,
  })
}

// 剪贴板
function setClipboardData(data: any,callBack: (arg0: string) => any){
  wx.setClipboardData({
    data,
    success (resData) {
      wx.getClipboardData({
        success (res) {
          callBack && callBack(res.data);
        }
      })
    }
  })
}

//小默微服务
function moreCodeMarket(apiUrl: any,dataObj: any,callback: (arg0: any) => any,serviceUrl: any){
  showToast("小默正在识别","none",20000);
  wx.serviceMarket.invokeService({
    service: serviceUrl || 'wxcae50ba710ca29d3', // 'wx_mp_appid',
    api: apiUrl,
    data: dataObj,
  }).then((res: { data: { err_code: number; data_list: any; err_msg: any } }) => {
    console.log('invokeService success', res)
    if(res.data&&res.data.err_code==0){
      showToast("识别成功","none",1500);
      return callback && callback(res.data.data_list);
    }
    showToast(res.data.err_msg||"服务器异常","none",1500);
  }).catch((err: any) => {
    console.error('invokeService fail', err);
    showToast("服务器异常","none",1500);
  })
}

//随机生成rgb格式的色值
function randomRgbColor(filterNums=1){
  const r = Math.floor(255 * Math.random())
  const g = Math.floor(255 * Math.random())
  const b = Math.floor(255 * Math.random())
  let colorStr = `rgb(${r}, ${g}, ${b})`;
  if(filterNums!=1) colorStr = `rgba(${r}, ${g}, ${b},.${filterNums})`;
  return colorStr;
}

//全局事件订阅发布管理
function eventBugs(){
	const eventMap = new Map();
	let eventOn = (action: any, event: any)=>{
		if(eventMap && !eventMap.has(action)) eventMap.set(action, event);
	};
	let eventOff = (action: any)=>{
		if(eventMap && !eventMap.has(action)) eventMap.delete(action);
	};
	let eventEmit = (action: any, arg: any)=>{
		if(eventMap && !eventMap.has(action)) eventMap.get(action) && eventMap.get(action)(arg);
	};
	return {eventOn,eventOff,eventEmit};
}
 function getUserModel(){
  const deviceInfo = wx.getDeviceInfo();
  const windowInfo = wx.getWindowInfo();
  let capsule = wx.getMenuButtonBoundingClientRect();
  let {statusBarHeight} = windowInfo;
  let modelInfo:any = {deviceInfo,windowInfo};
  let needWinDowInfo:any = {StatusBar: statusBarHeight};
  if(capsule) {
    let {bottom,top} = capsule;
    needWinDowInfo["Custom"] = capsule;
    needWinDowInfo["CustomBar"] = (bottom+top) - statusBarHeight;
  } else {
    needWinDowInfo["CustomBar"] = statusBarHeight + 50;
  }
  modelInfo["needWinDowInfo"] = needWinDowInfo;
    return modelInfo;
 }
export {
  formatTime,
  getWxRequest,
  postWxRequest,
  wxRequest,
  navigateTo,
  redirectTo,
  navigateBack,
  reLaunch,
  switchTab,
  showToast,
  hideToast,
  pageScrollTo,
  setNavigationBarTitle,
  throttle,
  mkDownloadFile,
  mkOpenDocument,
  previewImage,
  setClipboardData,
  moreCodeMarket,
	randomRgbColor,
  eventBugs,
  getUserModel,
}