import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import AddIssue from './Pages/AddIssue.jsx'
import DonatedUser from './Pages/DonatedUser.jsx'
import HomePage from './Pages/HomePage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import NGOMain from './Pages/NGOMain.jsx'
import ShowIssueNGO from './Pages/ShowIssueNGO.jsx'
import ShowIssueUser from './Pages/ShowIssueUser.jsx'
import SignupPage from './Pages/SignupPage.jsx'
import UserMain from './Pages/UserMain.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import QRScanner from './Pages/QRScanner.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        index:true,
        element:<HomePage/>
      },
      {
        path:"login",
        element:(
          <AuthLayout authentication={false}>
             <LoginPage/>
          </AuthLayout>
        )
      },
      {
        path:"/register",
        element:(
          <AuthLayout authentication={false}>
            <SignupPage/>
          </AuthLayout>
        )
      },
      {
        path:"user",
        children:[
        {index:true,
        element:(<AuthLayout authentication>
          <UserMain/>
        </AuthLayout>)},
        {
          path:"viewDonation",
          element:(
            <AuthLayout authentication>
              <DonatedUser/>
            </AuthLayout>
          )
        },
        {
          path:"issues/:postId",
              element:(<AuthLayout authentication>
               <ShowIssueUser/>
              </AuthLayout>)
        },
        {
          path:"scanQR",
          element:(<AuthLayout authentication>
            <QRScanner/>
          </AuthLayout>

          )
        }
          ]
        },
              {
        path:"ngo",
        children:[
          {
            index:true,
            element:(<AuthLayout authentication>
              <NGOMain/>
            </AuthLayout>)
          },
          {
            path:"issues/:postId",
            element:(<AuthLayout authentication>
              <ShowIssueNGO/>
              </AuthLayout>
            )
          },
          {
            path:"addIssue",
            element:(<AuthLayout authentication>
             <AddIssue/>
            </AuthLayout>)
          }
        ]
      }
        ]
      },

    ]
)





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
