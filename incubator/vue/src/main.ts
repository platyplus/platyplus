import './registerServiceWorker'
import '@platyplus/humanitarian-icons/icons.css'

import { createHasuraBackendPlus } from '@platyplus/vue-hasura-backend-plus'
import { createVueRxDBHasuraPlugin } from '@platyplus/vue-rxdb-hasura'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

const hbp = createHasuraBackendPlus({
  endpoint: 'http://hbp.localhost',
  router
})

const rxdbHasura = createVueRxDBHasuraPlugin({
  name: 'incubator',
  endpoint: 'http://hasura.localhost/v1/graphql',
  store,
  hbp
})

const app = createApp(App)
app.use(store)
app.use(hbp)
app.use(rxdbHasura)

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
// import 'prismjs/themes/prism-coy.css'
import './assets/layout/layout.scss'
import './assets/layout/flags/flags.css'

import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import AutoComplete from 'primevue/autocomplete'
import Breadcrumb from 'primevue/breadcrumb'
import Card from 'primevue/card'
import Carousel from 'primevue/carousel'
import Chips from 'primevue/chips'
import ColorPicker from 'primevue/colorpicker'
import ScrollTop from 'primevue/components/scrolltop/ScrollTop'
import ConfirmationService from 'primevue/confirmationservice'
import ConfirmDialog from 'primevue/confirmdialog'
import ContextMenu from 'primevue/contextmenu'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import Fieldset from 'primevue/fieldset'
import FileUpload from 'primevue/fileupload'
import Galleria from 'primevue/galleria'
import InlineMessage from 'primevue/inlinemessage'
import Inplace from 'primevue/inplace'
import InputMask from 'primevue/inputmask'
import InputSwitch from 'primevue/inputswitch'
import Listbox from 'primevue/listbox'
import MegaMenu from 'primevue/megamenu'
import Menu from 'primevue/menu'
import Menubar from 'primevue/menubar'
import Message from 'primevue/message'
import OrderList from 'primevue/orderlist'
import OrganizationChart from 'primevue/organizationchart'
import OverlayPanel from 'primevue/overlaypanel'
import Paginator from 'primevue/paginator'
import Panel from 'primevue/panel'
import PanelMenu from 'primevue/panelmenu'
import Password from 'primevue/password'
import PickList from 'primevue/picklist'
import ProgressBar from 'primevue/progressbar'
import RadioButton from 'primevue/radiobutton'
import Rating from 'primevue/rating'
import Ripple from 'primevue/ripple'
import SelectButton from 'primevue/selectbutton'
import Sidebar from 'primevue/sidebar'
import Slider from 'primevue/slider'
import SplitButton from 'primevue/splitbutton'
import Steps from 'primevue/steps'
import TabMenu from 'primevue/tabmenu'
import TabPanel from 'primevue/tabpanel'
import TabView from 'primevue/tabview'
import Textarea from 'primevue/textarea'
import TieredMenu from 'primevue/tieredmenu'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import ToggleButton from 'primevue/togglebutton'
import Toolbar from 'primevue/toolbar'
import Tooltip from 'primevue/tooltip'
import Tree from 'primevue/tree'
import TreeTable from 'primevue/treetable'
import TriStateCheckbox from 'primevue/tristatecheckbox'
router.beforeEach(function(to, from, next) {
  window.scrollTo(0, 0)
  // * Authentication guard
  if (to.meta.auth && !hbp.authenticated.value) next('/login')
  if (hbp.authenticated.value && to.path === '/') next('/home')
  else next()
})

app.use(ToastService)
app.use(ConfirmationService)
app.use(router)

app.directive('tooltip', Tooltip)
app.directive('ripple', Ripple)
app.component('ConfirmDialog', ConfirmDialog)
app.component('Accordion', Accordion)
app.component('AccordionTab', AccordionTab)
app.component('AutoComplete', AutoComplete)
app.component('Breadcrumb', Breadcrumb)
app.component('Card', Card)
app.component('Carousel', Carousel)
app.component('Chips', Chips)
app.component('ColorPicker', ColorPicker)
app.component('ContextMenu', ContextMenu)
app.component('DataViewLayoutOptions', DataViewLayoutOptions)
app.component('Fieldset', Fieldset)
app.component('FileUpload', FileUpload)
app.component('InlineMessage', InlineMessage)
app.component('Inplace', Inplace)
app.component('InputMask', InputMask)
app.component('InputSwitch', InputSwitch)
app.component('Galleria', Galleria)
app.component('Listbox', Listbox)
app.component('MegaMenu', MegaMenu)
app.component('Menu', Menu)
app.component('Menubar', Menubar)
app.component('Message', Message)
app.component('OrderList', OrderList)
app.component('OrganizationChart', OrganizationChart)
app.component('OverlayPanel', OverlayPanel)
app.component('Paginator', Paginator)
app.component('Panel', Panel)
app.component('PanelMenu', PanelMenu)
app.component('Password', Password)
app.component('PickList', PickList)
app.component('ProgressBar', ProgressBar)
app.component('RadioButton', RadioButton)
app.component('Rating', Rating)
app.component('ScrollTop', ScrollTop)
app.component('SelectButton', SelectButton)
app.component('Slider', Slider)
app.component('Sidebar', Sidebar)
app.component('SplitButton', SplitButton)
app.component('Steps', Steps)
app.component('TabMenu', TabMenu)
app.component('TabView', TabView)
app.component('TabPanel', TabPanel)
app.component('Textarea', Textarea)
app.component('TieredMenu', TieredMenu)
app.component('Toast', Toast)
app.component('Toolbar', Toolbar)
app.component('ToggleButton', ToggleButton)
app.component('Tree', Tree)
app.component('TreeTable', TreeTable)
app.component('TriStateCheckbox', TriStateCheckbox)

app.mount('#app')
