import './assets/layout/layout.scss'
// import './assets/layout/flags/flags.css'
// import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import AutoComplete from 'primevue/autocomplete'
import Avatar from 'primevue/avatar'
import Breadcrumb from 'primevue/breadcrumb'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Card from 'primevue/card'
import Carousel from 'primevue/carousel'
import Chart from 'primevue/chart'
import Checkbox from 'primevue/checkbox'
import Chip from 'primevue/chip'
import Chips from 'primevue/chips'
import ColorPicker from 'primevue/colorpicker'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ConfirmDialog from 'primevue/confirmdialog'
import ContextMenu from 'primevue/contextmenu'
import DataTable from 'primevue/datatable'
import DataView from 'primevue/dataview'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import Fieldset from 'primevue/fieldset'
import FileUpload from 'primevue/fileupload'
import Galleria from 'primevue/galleria'
import InlineMessage from 'primevue/inlinemessage'
import Inplace from 'primevue/inplace'
import InputMask from 'primevue/inputmask'
import InputNumber from 'primevue/inputnumber'
import InputSwitch from 'primevue/inputswitch'
import InputText from 'primevue/inputtext'
import Listbox from 'primevue/listbox'
import MegaMenu from 'primevue/megamenu'
import Menu from 'primevue/menu'
import Menubar from 'primevue/menubar'
import Message from 'primevue/message'
import MultiSelect from 'primevue/multiselect'
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
import ScrollTop from 'primevue/scrolltop'
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
import { App } from 'vue'

export const loadPrimeVue = (app: App): void => {
  app.use(PrimeVue)

  app.use(ToastService)
  app.use(ConfirmationService)

  app.directive('tooltip', Tooltip)
  app.directive('ripple', Ripple)

  app.component('PAccordion', Accordion)
  app.component('PAccordionTab', AccordionTab)
  app.component('PAutoComplete', AutoComplete)
  app.component('PAvatar', Avatar)
  app.component('PBreadcrumb', Breadcrumb)
  app.component('PButton', Button)
  app.component('PCalendar', Calendar)
  app.component('PCard', Card)
  app.component('PCarousel', Carousel)
  app.component('PChart', Chart)
  app.component('PCheckbox', Checkbox)
  app.component('PChip', Chip)
  app.component('PChips', Chips)
  app.component('PColorPicker', ColorPicker)
  app.component('PColumn', Column)
  app.component('PColumnGroup', ColumnGroup)
  app.component('PConfirmDialog', ConfirmDialog)
  app.component('PContextMenu', ContextMenu)
  app.component('PDataTable', DataTable)
  app.component('PDataView', DataView)
  app.component('PDataViewLayoutOptions', DataViewLayoutOptions)
  app.component('PDialog', Dialog)
  app.component('PDropdown', Dropdown)
  app.component('PFieldset', Fieldset)
  app.component('PFileUpload', FileUpload)
  app.component('PGalleria', Galleria)
  app.component('PInlineMessage', InlineMessage)
  app.component('PInplace', Inplace)
  app.component('PInputMask', InputMask)
  app.component('PInputNumber', InputNumber)
  app.component('PInputSwitch', InputSwitch)
  app.component('PInputText', InputText)
  app.component('PListbox', Listbox)
  app.component('PMegaMenu', MegaMenu)
  app.component('PMenu', Menu)
  app.component('PMenubar', Menubar)
  app.component('PMessage', Message)
  app.component('PMultiSelect', MultiSelect)
  app.component('POrderList', OrderList)
  app.component('POrganizationChart', OrganizationChart)
  app.component('POverlayPanel', OverlayPanel)
  app.component('PPaginator', Paginator)
  app.component('PPanel', Panel)
  app.component('PPanelMenu', PanelMenu)
  app.component('PPassword', Password)
  app.component('PPickList', PickList)
  app.component('PProgressBar', ProgressBar)
  app.component('PRadioButton', RadioButton)
  app.component('PRating', Rating)
  app.component('PScrollTop', ScrollTop)
  app.component('PSelectButton', SelectButton)
  app.component('PSidebar', Sidebar)
  app.component('PSlider', Slider)
  app.component('PSplitButton', SplitButton)
  app.component('PSteps', Steps)
  app.component('PTabMenu', TabMenu)
  app.component('PTabPanel', TabPanel)
  app.component('PTabView', TabView)
  app.component('PTextarea', Textarea)
  app.component('PTieredMenu', TieredMenu)
  app.component('PToast', Toast)
  app.component('PToggleButton', ToggleButton)
  app.component('PToolbar', Toolbar)
  app.component('PTree', Tree)
  app.component('PTreeTable', TreeTable)
  app.component('PTriStateCheckbox', TriStateCheckbox)
}
