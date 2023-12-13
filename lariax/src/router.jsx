import {createBrowserRouter} from "react-router-dom";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import Login from "./views/Login";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import Register from "./views/register";
import UserForm from "./views/userForm";
import Bangunrumah from "./views/bangunrumah";
import Index from "./views/Index";


const router = createBrowserRouter(    [

   {
            path: '/',
            element: <DefaultLayout/>,
            //children nya default
            children:  [
              {
                path: '/dashboard',
                element: <Dashboard />
            },

            {
              path: '/users',
              element: <Users />
          },
          {
            path: '/bangunrumah',
            element: <Bangunrumah />
          },
          {
            path: '/users/new',
            element: <UserForm key="userCreate"/>
        },
        {
          path: '/users/:id',
          element: <UserForm key="userUpdate"/>
      }

            ]
   },


   {
          path: '/',
          element: <GuestLayout/>,
          children: [

            {
              path: '/login',
              element: <Login />
          },
          {
            path: '/register',
            element: <Register />
        },
        {
          path: '/index',
          element: <Index/>
        }


          ]
   },



{
  path: '/*',
  element: <NotFound />
},

])

export default router;
