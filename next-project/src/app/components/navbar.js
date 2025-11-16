'use client'
import React, { useEffect } from 'react'
import '../css/navbar.css'
import Link from 'next/link'
import { MdHome, MdNoEncryption } from 'react-icons/md'
import { useState ,createContext} from 'react'
import Techno_txt from '../media/Techno (4).svg'
import Image from 'next/image'
import { House } from 'lucide-react'
function Navbar() {
  return (
    <div id='header_w_nav'>
        <div id='header-name-div-nav'>
         <Image src={Techno_txt} id='main_logo_nav' ></Image>
        </div>
        <button id='home_w_nav'><Link href={'/'} id='nav_link'><House size={30} id='house'/></Link></button>
    </div>
     
  )
}

export default Navbar