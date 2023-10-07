import DashboardIcon from "@mui/icons-material/Dashboard";
import { UilClipboardAlt } from "@iconscout/react-unicons";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ProductionQuantityLimitsOutlinedIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";

const links = [
  {
    title: "Home",
    links: [
      {
        name: "Dashboard",
        path: "dashboard",
        icon: <DashboardIcon />,
      },
    ],
  },

  {
    title: "Procurement",
    links: [
      {
        name: "Purchase Libraries",
        path: "purchase-libraries",
        icon: <LibraryAddOutlinedIcon style={{ fontSize: 29 }} />,
      },
      {
        name: "Canvass Sheet",
        path: "purchase-canvass",
        icon: <LocalMallOutlinedIcon style={{ fontSize: 29 }} />,
      },
      {
        name: "Purchase Request",
        path: "purchase-request",
        icon: <AddShoppingCartOutlinedIcon style={{ fontSize: 29 }} />,
      },
      {
        name: "Purchase Order",
        path: "purchase-order",
        icon: <ProductionQuantityLimitsOutlinedIcon style={{ fontSize: 29 }} />,
      },
      {
        name: "Transmittal",
        path: "transmittal",
        icon: <ShoppingCartCheckoutOutlinedIcon style={{ fontSize: 29 }} />,
      },
      {
        name: "Purchase History",
        path: "purchasehistory",
        icon: <HistoryEduIcon style={{ fontSize: 29 }} />,
      },
    ],
  },
  {
    title: "Inventory",
    links: [
      {
        name: "Item Inventory",
        path: "purchaserequest",
        icon: <UilClipboardAlt style={{ fontSize: 29 }} />,
      },
      {
        name: "Item Withdrawal and Transfer",
        path: "canvasssheet",
        icon: <UilClipboardAlt />,
      },
      {
        name: "Item Delivery and Returns",
        path: "purchaseorder",
        icon: <UilClipboardAlt style={{ fontSize: 29 }} />,
      },
    ],
  },
  // {
  //   title: "Procurement",
  //   links: [
  //     {
  //       name: "Purchase Request",
  //       path: "purchaserequest",
  //       icon: <UilClipboardAlt style={{ fontSize: 29 }} />,
  //     },
  //     {
  //       name: "Canvass Sheet",
  //       path: "canvasssheet",
  //       icon: <UilClipboardAlt />,
  //     },
  //     {
  //       name: "Purchase Order",
  //       path: "purchaseorder",
  //       icon: <UilClipboardAlt style={{ fontSize: 24 }} />,
  //     },
  //     {
  //       name: "Received Purchase and Transfer",
  //       path: "receivedpurchaseandtransfer",
  //       icon: <UilClipboardAlt style={{ fontSize: 27 }} />,
  //     },
  //     {
  //       name: "Purchase History",
  //       path: "purchasehistory",
  //       icon: <UilClipboardAlt style={{ fontSize: 27 }} />,
  //     },
  //   ],
  // },
  // {
  //   title: "Procurement",
  //   links: [
  //     {
  //       name: "Purchase Request",
  //       path: "purchaserequest",
  //       icon: <UilClipboardAlt style={{ fontSize: 29 }} />,
  //     },
  //     {
  //       name: "Canvass Sheet",
  //       path: "canvasssheet",
  //       icon: <UilClipboardAlt />,
  //     },
  //     {
  //       name: "Purchase Order",
  //       path: "purchaseorder",
  //       icon: <UilClipboardAlt style={{ fontSize: 24 }} />,
  //     },
  //     {
  //       name: "Received Purchase and Transfer",
  //       path: "receivedpurchaseandtransfer",
  //       icon: <UilClipboardAlt style={{ fontSize: 27 }} />,
  //     },
  //     {
  //       name: "Purchase History",
  //       path: "purchasehistory",
  //       icon: <UilClipboardAlt style={{ fontSize: 27 }} />,
  //     },
  //   ],
  // },
  // {
  //   title: "Procurement",
  //   links: [
  //     {
  //       name: "Purchase Request",
  //       path: "purchaserequest",
  //       icon: <UilClipboardAlt style={{ fontSize: 29 }} />,
  //     },
  //     {
  //       name: "Canvass Sheet",
  //       path: "canvasssheet",
  //       icon: <UilClipboardAlt />,
  //     },
  //     {
  //       name: "Purchase Order",
  //       path: "purchaseorder",
  //       icon: <UilClipboardAlt style={{ fontSize: 24 }} />,
  //     },
  //     {
  //       name: "Received Purchase and Transfer",
  //       path: "receivedpurchaseandtransfer",
  //       icon: <UilClipboardAlt style={{ fontSize: 27 }} />,
  //     },
  //     {
  //       name: "Purchase History",
  //       path: "purchasehistory",
  //       icon: <UilClipboardAlt style={{ fontSize: 27 }} />,
  //     },
  //   ],
  // },
];

export default links;
