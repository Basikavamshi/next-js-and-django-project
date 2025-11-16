'use client'
import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import {MdOutlineFavoriteBorder,MdMoreVert,MdLogin,MdFavorite,MdFeedback} from "react-icons/md"
import { useState } from 'react';
import Techno_txt from '../media/Techno (4).svg'
import Techno_wish from '../media/Techno_wish.svg'
import Link from 'next/link'
import { MdHome } from 'react-icons/md';
import Cookies from 'universal-cookie';
import '../css/whishlist.css'
import Image from 'next/image'
import Navbar from '../components/navbar'
function Whislist() {
  const [data,setdata]=useState([false])
  const change=false
  const cookies=new Cookies()
  console.log(cookies.getAll())
  const memo=useEffect(()=>{axios.get('http://127.0.0.1:8000/wishlist/',{
    headers:{
      Authorization: `Bearer ${cookies.get('access')}` 
    }
  }).then((data)=>setdata(data.data))},[false])
  
  return (
    <div>
      <Navbar/>
      <span id='whilisth'>wishlist</span>
    <div id='main'>

    {
      
      data.map((value)=>{
     return(value?<div id='main_content' key={value.id}>
      
      <Link href={'/content'} id='main_img_w' state={value.id} id='link_All'><Image id='main_img'src={`http://127.0.0.1:8000/media/${value.thumbimg}`} key={value.id}></Image></Link>
      <div id='childcontent2'>
        <Link href={'/content'} id='link_child' state={value.id}><text id='text'>{value.thumbtxt}</text></Link>
        <button id='menubtn'><MdMoreVert/></button>
      </div>
     
    </div>:<div id='n_p_w'><Image src={Techno_wish} id='techno_wish'></Image></div>)
     })
    }
    
    </div>

  </div>
  )
}

export default Whislist