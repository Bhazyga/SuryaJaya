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
    <nav style={{
      position: 'absolute' }}>
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
          <Link to="/index" className='btn rounded-4' style={{ marginTop: '-80px', marginLeft: '200px', position: 'absolute', background: '#001000' }}>
            Beranda
          </Link>
          <Link to="/BeliMaterial" className='btn rounded-4' style={{ width:'100%', marginTop: '-80px', marginLeft: '400px', position: 'absolute', background: '#001000' }}>
            Beli Material
          </Link>
          { user.role != null ? null : (
          <Link to="/register" style={{ marginTop: '-80px', marginLeft: '1000px', position: 'absolute', display: 'flex', alignItems: 'center',textDecoration:'none' }}>
            <span style={{ marginLeft: '5px', background: '#001000', color: 'white', padding: '8px', borderRadius: '20px' }}>
              <FontAwesomeIcon className='' icon={faUserSecret} />
              Register
            </span>
          </Link>
          )}
          <Link to="/Tools" style={{ marginTop: '-75px', marginLeft: '900px', position: 'absolute' , textDecoration:'none' }}>
               <span style={{ marginLeft: '5px', background: '#001000', color: 'white', padding: '8px', borderRadius: '20px'  }}>
              <FontAwesomeIcon className='' icon={faUserSecret} />
              Tools
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
