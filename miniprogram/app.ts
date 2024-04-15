// app.ts
import { getUserModel } from "./utils/util";
App<IAppOption>({
  globalData: {
    ...getUserModel().needWinDowInfo,
  },
  onLaunch() {
    
  },
})