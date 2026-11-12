import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider,createBrowserRouter } from 'react-router'
import {Cart,Catagory,Products,Profile,Home,LoginPage} from "./Pages/Pages.js"
import ProductsInfo from './Components/ProductsInfo.jsx'
import WhiteList from './Components/WhiteList.jsx'
import {Provider} from 'react-redux'
import Store from './Store/Store.js'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import CheckOut from './Components/CheckOut.jsx'
import Payment from './Components/Payment.jsx'
import Admin from './Components/Admin.jsx'
import ProductCreate from './Components/ProductCreate.jsx'
import ProductDelete from './Components/ProductDelete.jsx'
import ProductUpdate from './Components/ProductUpdate.jsx'
import Form from './Components/Form.jsx'
import MyOrders from './Components/Myordrs.jsx'
import DeliveryStatus from './Components/DelieryStatus.jsx'
const route=createBrowserRouter([
  {
      path:"/",
      element:<App/>,
      children:
    [
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/login",
        element:<LoginPage/>
      },
      {
        path:"/cart",
        element:(
        <ProtectedRoute>
          <Cart/>
        </ProtectedRoute>
        )
      },
      {
        path:"/catagory",
        element:<Catagory/>
      },
      {
        path:"/products",
        element:<Products/>,
      },
      {
            path:"/products/catagory/:catagory",
            element:<Products/>
      },
      {
        path:"/products/info/:id",
        element:<ProductsInfo/>
      }, 
      {
        path:"/profile",
        element:(
          <ProtectedRoute>
          <Profile/>
          </ProtectedRoute>
      )
      },
      {
        path:"/profile/my-ordes",
        element:(
          <ProtectedRoute>
          <MyOrders/>
          </ProtectedRoute>
      )
      },
      {
        path:"/profile/admin",
        element:(
          <ProtectedRoute>
          <Admin/>
          </ProtectedRoute>
      )
      },
      {
        path:"/profile/admin/delivery-status",
        element:(
          <ProtectedRoute>
          <DeliveryStatus/>
          </ProtectedRoute>
      )
      },
      {
        path:"/profile/admin/create-product",
        element:(
          <ProtectedRoute>
          <ProductCreate/>
          </ProtectedRoute>
      )
      },
      {
        path:"/profile/admin/delete-product",
        element:(
          <ProtectedRoute>
          <ProductDelete/>
          </ProtectedRoute>
      )
      },
      {
        path:"/profile/admin/update-product",
        element:(
          <ProtectedRoute>
          <ProductUpdate/>
          </ProtectedRoute>
      )
      },
      {
        path:"/profile/admin/update-product/:id",
        element:(
          <ProtectedRoute>
          <Form/>
          </ProtectedRoute>
      )
      },
      {
        path:"/checkout",
        element:(
          <ProtectedRoute>
            <CheckOut/>
          </ProtectedRoute>
        )
      },
      {
        path:"/payment",
        element:(
          <ProtectedRoute>
            <Payment/>
          </ProtectedRoute>
        )
      },
      {
        path:"/profile/whitelist",
        element:(
          <ProtectedRoute>
          <WhiteList/>
          </ProtectedRoute>
      )
      }
    ]
  }
]
)

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <RouterProvider router={route}>
       <App/>
    </RouterProvider>
   </Provider>
   
)
