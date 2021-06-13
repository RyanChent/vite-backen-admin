import {
  Button,
  Cell,
  CellGroup,
  Icon,
  Image,
  Popup,
  Toast,
  Field,
  Radio,
  RadioGroup,
  Uploader,
  ActionSheet,
  Dialog,
  DropdownMenu,
  DropdownItem,
  Loading,
  Notify,
  Overlay,
  ShareSheet,
  Badge,
  Collapse,
  CollapseItem,
  Divider,
  Empty,
  ImagePreview,
  NoticeBar,
  Popover,
  Skeleton,
  Step,
  Steps,
  Sticky,
  Swipe,
  SwipeItem,
  Tab,
  Tag,
  Grid,
  GridItem,
  NavBar,
  Pagination,
  Sidebar,
  SidebarItem,
  Tabbar,
  TabbarItem,
  TreeSelect
} from 'vant'

const vant = [
  Button,
  Cell,
  CellGroup,
  Icon,
  Image,
  Popup,
  Toast,
  Field,
  Radio,
  RadioGroup,
  Uploader,
  ActionSheet,
  Dialog,
  DropdownMenu,
  DropdownItem,
  Loading,
  Notify,
  Overlay,
  ShareSheet,
  Badge,
  Collapse,
  CollapseItem,
  Divider,
  Empty,
  ImagePreview,
  NoticeBar,
  Popover,
  Skeleton,
  Step,
  Steps,
  Sticky,
  Swipe,
  SwipeItem,
  Tab,
  Tag,
  Grid,
  GridItem,
  NavBar,
  Pagination,
  Sidebar,
  SidebarItem,
  Tabbar,
  TabbarItem,
  TreeSelect
]

export default (app: any) => vant.forEach((component: any) => app.use(component))
