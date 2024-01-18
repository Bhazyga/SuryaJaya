import {createBrowserRouter} from "react-router-dom";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import Login from "./views/Login";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import Register from "./views/register";
import UserForm from "./views/userForm";
import Bangunrumah from "./views/Bangunrumah";
import Index from "./views/Index.jsx";
import Materials from "./views/Materials";
import BeliMaterial from "./views/BeliMaterial";
import MaterialForm from "./views/materialForm";


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
            path: '/Materials',
            element: <Materials/>
          },
          {
            path: '/Materials/new',
            element: <MaterialForm key="materialCreate"/>
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
    path: '/index',
    element: <Index/>
  },
  {
    path: '/BeliMaterial',
    element: <BeliMaterial/>
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


          ]
   },



{
  path: '/*',
  element: <NotFound />
},

])

export default router;
