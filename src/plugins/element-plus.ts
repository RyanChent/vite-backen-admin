import 'element-plus/lib/theme-chalk/index.css'
import ElAlert from 'element-plus/lib/el-alert'
import ElAside from 'element-plus/lib/el-aside'
import ElAutocomplete from 'element-plus/lib/el-autocomplete'
import ElAvatar from 'element-plus/lib/el-avatar'
import ElBacktop from 'element-plus/lib/el-backtop'
import ElBreadcrumb from 'element-plus/lib/el-breadcrumb'
import ElBreadcrumbItem from 'element-plus/lib/el-breadcrumb-item'
import ElButton from 'element-plus/lib/el-button'
import ElCarousel from 'element-plus/lib/el-carousel'
import ElCheckbox from 'element-plus/lib/el-checkbox'
import ElCascader from 'element-plus/lib/el-cascader'
import ElCascaderPanel from 'element-plus/lib/el-cascader-panel'
import ElDialog from 'element-plus/lib/el-dialog'
import ElContainer from 'element-plus/lib/el-container'
import ElColorPicker from 'element-plus/lib/el-color-picker'
import ElDatePicker from 'element-plus/lib/el-date-picker'
import ElDrawer from 'element-plus/lib/el-drawer'
import ElDropdown from 'element-plus/lib/el-dropdown'
import ElDropdownItem from 'element-plus/lib/el-dropdown-item'
import ElDropdownMenu from 'element-plus/lib/el-dropdown-menu'
import ElFooter from 'element-plus/lib/el-footer'
import ElForm from 'element-plus/lib/el-form'
import ElFormItem from 'element-plus/lib/el-form-item'
import ElHeader from 'element-plus/lib/el-header'
import ElIcon from 'element-plus/lib/el-icon'
import ElImage from 'element-plus/lib/el-image'
import ElInput from 'element-plus/lib/el-input'
import ElInputNumber from 'element-plus/lib/el-input-number'
import ElMain from 'element-plus/lib/el-main'
import ElMenu from 'element-plus/lib/el-menu'
import ElMenuItem from 'element-plus/lib/el-menu-item'
import ElOption from 'element-plus/lib/el-option'
import ElPageHeader from 'element-plus/lib/el-page-header'
import ElPagination from 'element-plus/lib/el-pagination'
import ElPopconfirm from 'element-plus/lib/el-popconfirm'
import ElPopover from 'element-plus/lib/el-popover'
import ElPopper from 'element-plus/lib/el-popper'
import ElProgress from 'element-plus/lib/el-progress'
import ElRadio from 'element-plus/lib/el-radio'
import ElRadioButton from 'element-plus/lib/el-radio-button'
import ElSelect from 'element-plus/lib/el-select'
import ElSlider from 'element-plus/lib/el-slider'
import ElStep from 'element-plus/lib/el-step'
import ElSteps from 'element-plus/lib/el-steps'
import ElSubmenu from 'element-plus/lib/el-submenu'
import ElSwitch from 'element-plus/lib/el-switch'
import ElTabPane from 'element-plus/lib/el-tab-pane'
import ElTable from 'element-plus/lib/el-table'
import ElTableColumn from 'element-plus/lib/el-table-column'
import ElTabs from 'element-plus/lib/el-tabs'
import ElTag from 'element-plus/lib/el-tag'
import ElTimePicker from 'element-plus/lib/el-time-picker'
import ElTimeSelect from 'element-plus/lib/el-time-select'
import ElTimeline from 'element-plus/lib/el-timeline'
import ElTimelineItem from 'element-plus/lib/el-timeline-item'
import ElTooltip from 'element-plus/lib/el-tooltip'
import ElTransfer from 'element-plus/lib/el-transfer'
import ElTree from 'element-plus/lib/el-tree'
import ElUpload from 'element-plus/lib/el-upload'
import ElLoading from 'element-plus/lib/el-loading'
import ElMessage from 'element-plus/lib/el-message'
import ElMessageBox from 'element-plus/lib/el-message-box'
import ElNotification from 'element-plus/lib/el-notification'
import ElInfiniteScroll from 'element-plus/lib/el-infinite-scroll'

const components = [
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElCarousel,
  ElCheckbox,
  ElCascader,
  ElCascaderPanel,
  ElDialog,
  ElContainer,
  ElColorPicker,
  ElDatePicker,
  ElDrawer,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElFooter,
  ElForm,
  ElFormItem,
  ElHeader,
  ElIcon,
  ElImage,
  ElInput,
  ElInputNumber,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElOption,
  ElPageHeader,
  ElPagination,
  ElPopconfirm,
  ElPopover,
  ElPopper,
  ElProgress,
  ElRadio,
  ElRadioButton,
  ElSelect,
  ElSlider,
  ElStep,
  ElSteps,
  ElSubmenu,
  ElSwitch,
  ElTabPane,
  ElTable,
  ElTableColumn,
  ElTabs,
  ElTag,
  ElTimePicker,
  ElTimeSelect,
  ElTimeline,
  ElTimelineItem,
  ElTooltip,
  ElTransfer,
  ElTree,
  ElUpload
]

const plugins = [ElLoading, ElMessage, ElMessageBox, ElNotification, ElInfiniteScroll]

export default (app: any) => {
  components.forEach((component) => {
    app.component(component.name, component)
  })
  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}
