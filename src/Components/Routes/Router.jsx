import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ErrorPage from "../ErrorPage/ErrorPage";
import ProductDetails from "../Products/ProductDetails";
import Collections from "../Products/Collections";
import AddProduct from "../../Pages/Dashboard/Seller/AddProduct";
import DashboardLayout from "../../LayOut/DashboardLayout";
import AdminStatistics from "../Dashboard/Statistics/AdminStatistics";
import ManageOrders from "../Dashboard/ManageOrders/ManageOrders";
import ManageUsers from "../Dashboard/ManageUsers/ManageUsers";
import MyOrders from "../Dashboard/MyOrders/MyOrders";
import Profile from "../Dashboard/Profile/Profile";
import MyInventory from "../Dashboard/MyInventory/MyInventory";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ContactUs from "../Contact/Contact";
import About from "../About/About";
import MyCarts from "../MyCarts/MyCarts";
import Checkout from "../MyCarts/Checkout";


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/collections',
        element: <Collections></Collections>
      },
      {
        path: '/contact',
        element: <ContactUs/>
      },
      {
        path: '/about',
        element: <About/>
      },
      {
        path: '/cart',
        element: <MyCarts/>
      },
      {
        path: '/checkout',
        element: <Checkout/>
      },
      {
        path: '/product/:id',
        element: <ProductDetails></ProductDetails>
      }

    ]
  },
  {
    path: '/dashboard',
    element: (
      <DashboardLayout />
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminStatistics />
            </AdminRoute>
          </PrivateRoute>

        ),
      },
      {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        )
      },
      {
        path: 'add-product',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          </PrivateRoute>
        )
      },
      {
        path: 'manage-orders',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageOrders />
            </AdminRoute>
          </PrivateRoute>

        )
      },
      {
        path: 'manage-users',
        element: (

          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        )
      },
      {
        path: 'my-inventory',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <MyInventory />
            </AdminRoute>
          </PrivateRoute>

        )
      },
      {
        path: '/dashboard/profile',
        element: (
          <PrivateRoute>

            <Profile />
          </PrivateRoute>
        )
      },


    ],
  },
])
export default router;

