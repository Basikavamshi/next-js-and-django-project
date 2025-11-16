'use client'
import React, { useEffect } from 'react'
import '../css/login.css'
import Link from 'next/link'
import { useState ,createContext} from 'react'
import axios from 'axios';
import { handledata } from '../redux_store/reducer'
//import GoogleLogin from 'react-simple-oauth2-login';
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import login_bgm from '../media/login_bgm.png'
import techno_mobile_2 from '../media/Techno_mobile_2.svg'
import Image from 'next/image'
import Navbar from '../components/navbar'
function Login() {
  const [userdata,setuserdata]=useState({
    'username':'',
    'password':''
  })
 
  const dispatch=useDispatch()
  const cookie=new Cookies
  
  const [error,seterror]=useState({})
  const [data,setdata]=useState('')
  const [,refresh]=useState();
  const {username,password}=userdata
  const inputHandler=(e)=>{
       setuserdata({...userdata,[e.target.name]:e.target.value})
  }
  const auth=cookie.get('auth')
  console.log(auth)
  //const element=<Home name={data.user}/>
  const login=(e)=>{
    e.preventDefault()
    axios.post('http://127.0.0.1:8000/log/',{
          'username':username,'password':password
        }).then((data)=>{
           
           cookie.set('access',data.data['access'],{path:'/'})
           cookie.set('refresh',data.data['refresh'],{path:'/'})
           cookie.set('user',data.data['user'],{path:'/'})
           cookie.set('email',data.data['email'],{path:'/'})
           cookie.set('auth',data.data['auth'],{path:'/'})
           dispatch(handledata({payload:{
            auth:data.data['auth'],
            user:data.data['user'],
            access:data.data['access'],
            refresh:data.data['refresh'],
          }}))
        }).then(()=>{
          refresh({})
        }).catch((e)=>{seterror(e.response['data'])})
  }
  const handlecallback=(response)=>{
    console.log(response)
  }
  console.log(auth)
  const backgroundStyle = {
    backgroundImage: `url(${login_bgm})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    /* Add more background properties as needed */
  };
  useEffect(()=>{
     
  },[])
  return (
    <div  id='main_body_L'>
      <div id='mainlog' >
         <Navbar/>
      <div id='sub_main_log_div' >
        <div id='sub_main_log_div_1'>
            <Image src={techno_mobile_2} id='techno_mobile_Image' height={300} width={600}></Image>
        </div>
        <div id='sub_main_log_div_2'>
         <form method='post' onSubmit={login} id='formdiv_l'>
           <div id="sub_header_div_L">
             <span id='headertxt'>welcome back !</span>
          </div>
          <div id='form_div_l'>
              <label id='labellog'>username</label>
              <input placeholder =' enter your user name' id='inputlog' name='username' value={username} onChange={inputHandler} />
              <label id='labellog'>password</label>
              <input type='password' placeholder=' password' id='inputlog' name='password' value={password} onChange={inputHandler}/>
          </div>
          <button type='submit' id='form_submit_btn'><span id='login_txt'>Login</span></button>
         </form>
         <div id='error_div'>
          <text id='error'>
              {error['detail']}
          </text>
         </div>
         <div id='password_forgetten_div'>
          <Link href={'/passwordf'} id='passwordf'>password forgotten !</Link>
          <p id='singuptxt'>are you  a new user ?<Link href={'/singup'}>  create_account</Link></p>
          {
            auth=='true' &&(<Navigate href={'/'} state={auth}/>)
          }
        </div>
        </div>
        
      </div>
      </div>
      <div id='googlediv'></div>
    </div>
  )
}

export default Login