'use client'
import React, { useState } from 'react'
import '../css/singup.css'
import Link from 'next/link'
import { MdHome } from 'react-icons/md'
import axios from 'axios'
import { handledata } from '../redux_store/reducer'
import Techno_txt from '../media/Techno (4).svg'
import { useDispatch,useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import techno_sing from '../media/Techno_sing.svg'
import Image from 'next/image'
import Navbar from '../components/navbar'
function Signup() {
  const dispatch=useDispatch()
  const cookie=new Cookies()
  const auth=cookie.get('auth')
  const [data,setdata]=useState({
    'username':'',
    'email':'',
    'password':'',
    'conform_password':''
  })
  const {username,email,password,conform_password}=data
  const [error,seterror]=useState({})
  const handle_input=(e)=>{
       setdata(
        {
          ...data,
          [e.target.name]:e.target.value
        }
       )
  }
  const handle_submit=(e)=>{
        e.preventDefault()
        axios.post('http://127.0.0.1:8000/sing_up/',{'username':username,'email':email,'password':password,'conform_password':conform_password}).then((data)=>{
           
        cookie.set('access',data.data['access'],{path:'/'})
        cookie.set('refresh',data.data['refresh'],{path:'/'})
        cookie.set('user',data.data['user'],{path:'/'})
       
        dispatch(handledata({payload:{
         auth:data.data['auth'],
         user:data.data['user'],
         access:data.data['access'],
         refresh:data.data['refresh'],
       }}))
     }).catch((e)=>{if(e){seterror(e.response['data'])}})
        

  }
  return (
    <div id='body_sin'>
      
      <Navbar/>
    <div id='main_div_sin_2'>
       <div id='techno_sing_div'>
          <Image src={techno_sing} id='techno_sing_img'></Image>

        </div>
      <div id='mainsin'>
          
         <span id='headersin'>Create Account</span>
         <form id='formsin'  onSubmit={handle_submit}>
           <div id='formdiv'>
           <label id='labelsin'>username </label><br/>
           <input  placeholder='username' id='inputsin' name='username' value={username} onChange={(e)=>{handle_input(e)}}></input><br/>
           <label id='labelsin'>Email </label><br/>
           <input id='inputsin' type='Email' placeholder='xxxx@gmail.com' name='email' value={email} onChange={(e)=>{handle_input(e)}}></input><br/>
           <label id='labelsin'>password </label><br/>
           <input id='inputsin' type='password' placeholder='create strong password' name='password' value={password} onChange={(e)=>{handle_input(e)}} required></input><br/>
           <label id='labelsin'>conform-password </label><br/>
           <input id='inputsin' type='password' placeholder='Renter password' name='conform_password' value={conform_password} onChange={(e)=>{handle_input(e)}}></input><br/>

           </div>
           <button type='submit' id='singupbtn'>DONE !</button>
           
         </form>
        <text id='error'>
          {error['detail']}
        </text>
         <p id='loginlink'> already have an account ! <Link href={'/login'}>Login</Link></p>
      </div>
    </div>
      
      
    </div>
  )
}

export default Signup