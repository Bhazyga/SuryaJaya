import React, { useEffect, useState } from 'react';
import { Box, Clock, Text } from 'grommet';
import { Link, } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

export default function Navbar  () {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const linkToHome = '/';

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest('.menu-btn') && !target.closest('.relative')) {
        setDropdownOpen(false);
      }
    };
  }, []);


  return (
    <nav style={{ background: 'linear-gradient(180deg, rgba(184,42,32,1) 100%, rgba(255,250,249,1) 100%)' }}>
      <div >

        <div  style={{marginTop:'-30px'}}>
          <Link to="/">
            <img
              className='inline-flex justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0'
              src="TBSYJY.png"
              style={{ marginRight: '25px' , marginTop:'20px' }}
              width={150}
              height={100}
              alt="LogoSuryaJaya"
            />
            </Link>
          </div>
          <div className=''>
          <Link to="/" className='btn rounded-4' style={{ marginTop: '-80px', marginLeft: '200px', position: 'absolute', background: '#001000' }}>
            Beranda
          </Link>
          <Link to="/register" style={{ marginTop: '-80px', marginLeft: '500px', position: 'absolute', display: 'flex', alignItems: 'center',textDecoration:'none' }}>
            <span style={{ marginLeft: '5px', background: '#001000', color: 'white', padding: '8px', borderRadius: '20px' }}>
              <FontAwesomeIcon className='' icon={faUserSecret} />
              Register
            </span>
          </Link>
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
