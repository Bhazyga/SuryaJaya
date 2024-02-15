import React, { useEffect, useState } from 'react';
import { Box, Clock, Text } from 'grommet';
import { Link, } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axios-Client';

export default function Navbar  () {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const linkToHome = '/';


  const {user,setUser} = useStateContext()

    useEffect( () => {
      axiosClient.get(`/user`)
      .then(({data})  => {
        setUser (data)
      })
     }, [])

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest('.menu-btn') && !target.closest('.relative')) {
        setDropdownOpen(false);
      }
    };
  }, []);

  return (
    <nav style={{position: 'absolute', letterSpacing:'0.5px' }}>
      <div >
        <div >
          <Link to="/index">
            <img className='animasinavbar'
              style={{backgroundColor:''}}
              src="LastSYJYNOBG.png"
              width={130}
              height={100}
              alt="LogoSuryaJaya"
            />
            </Link>
          </div>
          <div className=''>
          <Link to="/index" className='btn bg-sky-200 rounded-4' style={{ marginTop: '-80px', marginLeft: '200px', position: 'absolute',  }}>
            Beranda
          </Link>
          <Link to="/dashboard" className='btn bg-sky-200 rounded-4' style={{ marginTop: '-80px', marginLeft: '700px', position: 'absolute' }}>
            Dashboard
          </Link>
          { user.role != null ? null : (
          <Link to="/login" className='btn bg-sky-200 rounded-4' style={{ marginTop: '-80px', marginLeft: '1100px', position: 'absolute'}}>
            Login
          </Link>
          )}
          <Link to="/BeliMaterial" className='btn bg-sky-200 rounded-4' style={{ width:'100%', marginTop: '-80px', marginLeft: '400px', position: 'absolute' }}>
            Beli Material
          </Link>
          { user.role != null ? null : (
            <div className='btn bg-sky-200 rounded-4'
            style={{width:'100%', marginTop: '-80px', marginLeft: '900px', position: 'absolute'}}
            >
          <Link to="/register">
            <span style={{color: 'black', padding: '8px', borderRadius: '20px'}}>
              <FontAwesomeIcon className='' icon={faUserSecret} />
              Register
            </span>
          </Link>
          </div>
          )}
        </div>
      </div>
    </nav>
  );
};
