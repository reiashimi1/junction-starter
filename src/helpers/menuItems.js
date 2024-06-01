import {
  Category,
  ContactPhone,
  Inventory,
  ListAlt,
  PeopleAlt,
  Dashboard,
  ShoppingCartCheckout,
  ManageAccounts,
  Apps,
} from "@mui/icons-material";

export const userMenuItems = [
  {
    label: "Products",
    route: "/user/products",
    icon: <Inventory />,
  },
  {
    label: "My orders",
    route: "/user/orders",
    icon: <ListAlt />,
  },
  {
    label: "My Cart",
    route: "/user/cart",
    icon: <ShoppingCartCheckout />,
  },
  {
    label: "Contact us",
    route: "/contact-us",
    icon: <ContactPhone />,
  },
];

export const merchantMenuItems = [
  {
    label: "Dashboard",
    route: "/merchant",
    icon: <Dashboard />,
    admin: true,
  },
  {
    label: "Stations",
    route: "/merchant/stations",
    icon: <Inventory />,
    admin: true,
  },
  {
    label: "Orders",
    route: "/merchant/orders",
    icon: <ListAlt />,
    admin: true,
  },
];

export const adminMenuItems = [
  {
    label: "Dashboard",
    route: "/admin",
    icon: <Dashboard />,
    admin: true,
  },
  {
    label: "Stations",
    route: "/merchant/stations",
    icon: <Inventory />,
    admin: true,
  },
  {
    label: "Orders",
    route: "/admin/orders",
    icon: <ListAlt />,
    admin: true,
  },
  {
    label: "Users",
    route: "/admin/users",
    icon: <PeopleAlt />,
    admin: true,
  },
  {
    label: "Categories",
    route: "/admin/categories",
    icon: <Category />,
    admin: true,
  },
];
