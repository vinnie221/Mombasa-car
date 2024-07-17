import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import SignUp from '../pages/SignUp'

import AllUsers from '../pages/AllUsers'

import PaymentMpesaPage from '../pages/PaymentMpesaPage'
import AutomobileAdmin from '../pages/AutomobileAdmin'
import AllUploads from '../pages/AllUploads'
import CaregoryAutoProduct from '../pages/CaregoryAutoProduct'
import ProductDetailsAuto from '../pages/ProductDetailsAuto'
import SearchProductAuto from '../pages/SearchProductAuto'
import Contact from '../pages/Contact'
import AboutUs from '../pages/AboutUs'






const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "about-us",
                element : <AboutUs/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassword/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },

           
            {
                path : "autoproduct-category",
                element : <CaregoryAutoProduct/>
            },

           
            {
                path : "autoproduct/:id",
                element : <ProductDetailsAuto/>
            },
            
            {
                path : "search-auto",
                element : <SearchProductAuto/>
            },
            {
                path : "Mpesa-payment",
                element : <PaymentMpesaPage/>
            },
            {
                path : "contact",
                element : <Contact/>

            },

            {
                path : "automobileadmin-panel",
                element : <AutomobileAdmin/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-uploads",
                        element : <AllUploads/>
                    }
                ]
            },

            // {
            //     path : "admin-panel",
            //     element : <AdminPanel/>,
            //     children : [
            //         {
            //             path : "all-users",
            //             element : <AllUsers/>
            //         },
            //         {
            //             path : "all-products",
            //             element : <AllProducts/>
            //         }
            //     ]
            // },
            
        ]
    }
])

export default router