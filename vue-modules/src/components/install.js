import menuDXY from './dxy/menuUI/menu-dxy'
import CheckboxDXY from './dxy/checkbox-dxy'
import TransferDXY from './dxy/transfer-dxy'
import RankingUI from './dxy/RankingUI'
import RankingUI1 from './dxy/RankingUI/index1'
import ProgressUI from './dxy/ProgressUI'
import RowLineUI from './dxy/RowLineUI'

import ElTabsUI from './ele/ElTabsUI'

let components = { menuDXY, CheckboxDXY, TransferDXY, RankingUI, RankingUI1, ProgressUI, RowLineUI, ElTabsUI,  }

export default {
  install(Vue) {
    Object.keys(components).forEach(key => {
      Vue.component(key, components[key])
    })
  }
}