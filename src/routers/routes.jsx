import Main from "../layouts/Main";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register"

const routes=[
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/login',
                element:<Login></Login>
            }
        ]
    }
]

export default routes;