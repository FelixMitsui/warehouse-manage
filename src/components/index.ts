import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
import Table from './Table/index.vue'
import SearchBar from './SearchBar/index.vue'
import Dialog from './Dialog/index.vue'
import Logo from './Logo/index.vue'
import BarChart from './BarChart/index.vue'
import Form from './Form/index.vue'
import Children from './Children/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allGlobalComponent: any = {
  SvgIcon,
  Pagination,
  Table,
  SearchBar,
  Dialog,
  Logo,
  BarChart,
  Form,
  Children,
}

export default {
  install(app: any) {
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
