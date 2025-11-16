'use client'
import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import {MdThumbUpOffAlt,MdThumbDownOffAlt,MdComment,MdMoreVert,MdLogin,MdFavorite,MdFeedback,MdSearch,MdExpandMore, MdAccessAlarm,MdOutlineFavorite, MdOutlineFavoriteBorder} from "react-icons/md";
import { useState } from 'react';
import Cookies from 'universal-cookie';
import { formatDistanceToNow, parse, parseISO } from 'date-fns';
//import {Navigate} from 'react-router-dom';
import Link from 'next/link'
export const cookies=new Cookies()
export const addwishlist=(id,categorys)=>{
  axios.post('http://127.0.0.1:8000/wishlist/',{'product':id,'categorys':categorys},
  {
    headers:{
      Authorization: `Bearer ${cookies.get('access')}`
  }
  
})}

/* export const open=()=>{
  return <Navigate href={'/mobiles'}/>
} */
 export const handledate=(date)=>{
  const formated_date=parseISO(date)
  const hdate=formatDistanceToNow(formated_date)
  return hdate
}
function All({path}) {
  const [data,setdata]=useState([])
  const change=false
  const [wishcolor,setwishcolor]=useState([])
  const [product_id,set_product_id]=useState(null)
  useEffect(()=>{
    setdata([])
    axios.get(`http://127.0.0.1:8000/${path}`).then((res)=>{setdata(res.data['data'])
    console.log("data getted=",res)
   });
   
},[path])
  console.log("datain useState=",data)
  
  const handlewish=(id)=>{
     console.log(wishcolor)
  }
  return (
    <div>
      <div id='main'>
      {
        data.map((value)=>{
       return(<div id='main_content' key={value.id}>
        
          <Link href={`/content/content_${value.categorys}/?id=${value.id}`} id='link_All'><img id='main_img'src={`http://127.0.0.1:8000/media/${value.thumbimg}`} key={value.id}></img></Link>
       
        <div id='childcontent2'>
          <text id='text'><Link id='link_child' href={'/content'} state={value.id}>{value.thumbtxt}</Link></text>
          <button id='menubtn'><MdMoreVert/></button>
          <text id='timetxt'>{handledate(value.upload_date)} {value.id}</text>
        </div>
       
      </div>)
       })
    
      }
      </div>
    </div>
  )
}

export default All