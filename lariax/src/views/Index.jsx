import { useEffect, useState } from 'react';
import { useStateContext } from '../context/ContextProvider';
import Navbar from '../views/Navbar';
import axiosClient from '../axios-Client';

export default function Index()
{
  return(

   <div>
   <Navbar/>
    <div  className='' style={{backgroundColor:'#00023'}}></div>
    <img src="rumahnenekks.jpg" alt="" style={{width:'100%'}} />
    </div>


  )
}
