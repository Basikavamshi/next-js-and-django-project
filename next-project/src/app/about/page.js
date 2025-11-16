'use client'
import React from 'react'
import '../css/about.css';
import Techno_txt from '../media/Techno (4).svg'
import Link from 'next/link';

import { House } from 'lucide-react';
import { useEffect,useMemo } from 'react';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { BsTwitter, BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import Image from 'next/image';
import Navbar from '../components/navbar';
import '../home'
function About() {
  console.log('printed')
  return (
    <div id='main_div_A'>
        <Navbar/>
        <div id='sub_div_A'>
          <span id='about_header_A'>Welcome to TechX</span>
          <div id='para_div_A'>
            <p id='para_A'>At TechX, we're passionate about bringing the latest in technology to you. Our mission is to empower individuals with the knowledge they need to make informed choices about mobiles, laptops, and stay up-to-date with the latest tech news.
            </p>
          </div>
          <span id='about_header_A'>What We Offer</span>
          <div id='para_div_A'>
            
            <p id='para_A'>Latest Mobiles and Laptops: Explore comprehensive reviews and comparisons of the newest mobile phones and laptops, helping you choose the perfect device for your needs.
               Tech News: Stay in the know with our up-to-the-minute tech news articles, covering the latest innovations, trends, and updates in the tech world.
            </p>
          </div>
          <span id='about_header_A'>Our Commitment</span>

          <div id='para_div_A'>
            <p id='para_A'>We're committed to delivering accurate, unbiased, and easy-to-understand information. We understand that technology can be overwhelming, so we're here to simplify it for you.
            </p>
          </div>
          </div>
          <div id='footer'>
            
               <button id='footer_btn'><Link href={'https://www.instagram.com/_c_h_i_n_t_u_____x/'} id='link_footer'><FaInstagram/></Link></button>
               <button id='footer_btn'><FaFacebook/></button>
               <button id='footer_btn'><BsTwitter/></button>
               <button id='footer_btn'><Link href={'https://www.linkedin.com/in/vamshi-basika-386872268?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'} id='link_footer'><FaLinkedin/></Link></button>
               
              
          </div>
    </div>
   

  )
}

export default About