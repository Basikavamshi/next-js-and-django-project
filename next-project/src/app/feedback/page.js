'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { MdHome } from 'react-icons/md'
import '../css/feedback.css'
import { useRef } from 'react'
import Techno_txt from '../media/Techno (4).svg'
import Cookies from 'universal-cookie'
import axios from 'axios'
import {RiSendPlane2Fill} from "react-icons/ri"
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { BsTwitter, BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import Image from 'next/image'
import Navbar from '../components/navbar'
function Feedback() {
  const [input,setinput]=useState('')
  const [rows,setrows]=useState(0)
  const cookies=new Cookies
  const textareaRef=useRef();
  
  const handleinput=(e)=>{
    setinput(e.target.value)
    console.log(e)
    
  
  }
  const handlerows=(text)=>{
    console.log(text)
    return (text.match(/\n/g)||[]).length+1
  }


  const handlefeedback=()=>{
    axios.post('http://127.0.0.1:8000/feedback/',{'feedback':input,'email':cookies.get('email')}).then((r)=>console.log('succefully feddback submited'))
  }
  return (
    <div id='main_divf'>
      <Navbar/>
    <div id='sub_div_F'>
      <div id='header_div_f'>
          <span id='feedback_header'>We value Your Feedback</span>
      </div>
      <div id='sub_divf'>
        
        <div id='div_para_f'>
          <p id='para_f_1'>At TechX, we believe that your feedback is invaluable. It helps us improve and provide you with a better experience.
             Whether 
            you have suggestions, questions, or comments, we want to hear from you!
          </p>
          <span id='para_f_2'>How was your experience ?</span>
          <p id='para_f_3'>We want to know about your experience on our website. Did you find the information you were looking for? Was our content helpful? Your insights are crucial in shaping the future of TechX.
          </p>
       
        </div>
        <div id='child_divf'>
          <textarea type='text' placeholder='Please take a moment to share your thoughts, ideas, or concerns with us' id='feedbackinput' ref={textareaRef} value={input} onChange={handleinput} rows={handlerows(input)} ></textarea>
          <button id='submit_btn_f'  onClick={()=>{handlefeedback}}><RiSendPlane2Fill id='send_icon'/></button>
        </div>
     
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

export default Feedback