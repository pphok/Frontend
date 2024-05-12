import {
  CircleIcon,
  UserIcon,
  WindmillIcon,
  TypographyIcon,
  ShadowIcon,
  PaletteIcon,
  KeyIcon,
  BugIcon,
  DashboardIcon,
  BrandChromeIcon,
  HelpIcon,
  AppsIcon
} from 'vue-tabler-icons';

export interface menu {
  header?: string;
  title?: string;
  icon?: object;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  {
    title: 'Dashboard',
    icon: DashboardIcon,
    to: '/dashboard/default'
  },
  {
    title: 'Users',
    icon: UserIcon,
    to: '/users'
  },
  {
    title: 'Subscription',
    icon: AppsIcon,
    to: '/auth',
    children: [
      {
        title: 'Subscription and User',
        to: '/subscription'
      },
      {
        title: 'Subscription Type',
        to: '/subscription-type'
      }
    ]
  },
  {
     title: 'Login',
     icon: CircleIcon,
     to: '/auth/login'
  },
  {
    title: 'Sample Page',
    icon: BrandChromeIcon,
    to: '/starter'
  },
];

export default sidebarItem;
