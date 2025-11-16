'use client'
import React, { useEffect, useMemo } from 'react'
import './css/home.css'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { useState} from 'react';
//import { UseSelector } from 'react-redux/es/hooks/useSelector';
import profile from './media/profile.jpg'
//import { redirect } from 'react-router-dom';
import { FaHistory } from "react-icons/fa";
//import store from './store';
import Cookies from 'universal-cookie';
// import { useSelector } from 'react-redux';
// import { router.push } from 'react-router-dom';
// import Feedback from './feedback.js'
//import logo from './logo_l.svg'
import axios from 'axios'
import All from './All.js'
//import { Route, Routes } from 'react-router-dom'
import {MdThumbUpOffAlt,MdThumbDownOffAlt,MdComment,MdMoreVert,MdLogin,MdFavorite,MdFeedback,MdSearch,MdExpandMore,MdOutlineRoundaboutRight, MdRoundaboutRight,MdOutlineFeedback} from "react-icons/md";
import {AiOutlineHeart,AiOutlineSearch,AiOutlineMore, AiOutlineClose} from 'react-icons/ai'
import {GiDiamondsSmile} from 'react-icons/gi'
//import {Open_Search} from './search'
//import Profile from './profile';
//import All from './All.js';
//import {CgMoreVertical} from 'react-icons/cg'
import { useRef } from 'react';
//import { RiEye2Fill } from 'react-icons/ri';
import useDebounce from './debounce.js';
//import { AiOutlineClear } from 'react-icons/ai';
//import debounce from './debounce.js';
import Techno_txt from './media/Techno (4).svg'
import Image from 'next/image';
function Homepage(props) {
  const [close,setclose] = useState(false)
  const [element,setelement]=useState(true)
  const [search,setsearch]=useState('')
  const [,refresh]=useState()
  const [active,setactive]=useState(true)
  const [selectebtn,setselectebtn]=useState(1)
  const cookie=useMemo(()=>new Cookies(),[])
  const [auth,setauth]= useState(cookie.get('auth') === 'true');
  const all=cookie.getAll()
  const router=useRouter();
  const [intail,setintail]=useState(false)
  const Ref=useRef()
  const recentRef=useRef();
  const [path,setpath]=useState("getdata/all/")
  const recentRef_h=useRef()
  const Ref_h=useRef()
  const [searched_data,set_searched_data]=useState([])
  const [search_div,setsearch_div]=useState(false)
  const [search_div_h,setsearch_div_h]=useState(false)
  const debounce=useDebounce(search,100)
  const useClick=()=>{
    if(element){
      document.getElementById('more_div_h').style.height='2em'
      document.getElementById('moreicon').style.transform='rotate(90deg)'
      setelement(false)
      
  }
   else{
      document.getElementById('more_div_h').style.height='0em'
      document.getElementById('moreicon').style.transform='rotate(0deg)'
      setelement(true)
   }

}
  const handleActive=(id,strpath)=>{
    setselectebtn(id)
    setpath(strpath)
  }
  const buttonStyle = (id) => {
    return {
      display: selectebtn === id ? 'block' : 'none',
    }
  }
  const close_profile=()=>{
    if(auth=='true'){
      if(close==false){
        document.getElementById('div_profile_f').style.display='none';
        setclose(true)
      }
      if(close==true){
        document.getElementById('div_profile_f').style.display='block';
        setclose(false)
    }
   }
  }
  const handleinput=(e)=>{
        
        setsearch(e.target.value)
  }
  const Open_Search2=()=>{  
      if(search==''){
         setsearch_div(false)
         return search
      }
      else{
        setsearch_div(false)
        return router.push(`/search?search=${search}`)
      }
}
  const handlesearches=(data)=>{
      setsearch(data)
      setsearch_div(false)
      return router.push(`/search?search=${search}`)

  }
  
  const logout=()=>{
    axios.get('http://127.0.0.1:8000/logout/').then((data)=>{
      cookie.set('access',data.data['access'],{path:'/'})
      cookie.set('refresh',data.data['refresh'],{path:'/'})
      cookie.set('user',data.data['user'],{path:'/'})
      cookie.set('email',data.data['email'],{path:'/'})
      cookie.set('auth',data.data['auth'],{path:'/'})
      setauth(cookie.get('auth'))
    })
    
  }
    
  useEffect(() => {
  if(!auth) return; // ✅ just exit, don't change hook order

  axios.get(`http://127.0.0.1:8000/search/?search=${search}`, {
    headers: { Authorization: `Bearer ${cookie.get('access')}` }
  }).then((res) => {
    set_searched_data(res.data['data']);
  });

}, [debounce, auth]);
  useEffect(
    ()=>{
      const handle_recent_div=(event)=>{
        if(recentRef.current && !recentRef.current.contains(event.target) && Ref.current !== event.target){
          setsearch_div(false)
        }
      }
    
     document.body.addEventListener('click',handle_recent_div);
     return ()=>{document.body.removeEventListener('click',handle_recent_div)}
    },[])
    useEffect(
      ()=>{
        const handle_recent_div_h=(event)=>{
          if(recentRef_h.current && !recentRef_h.current.contains(event.target) && Ref_h.current !== event.target){
            setsearch_div_h(false)
          }
        }
      
       document.body.addEventListener('click',handle_recent_div_h);
       return ()=>{document.body.removeEventListener('click',handle_recent_div_h)}
      },[])
  return (

    <div id='bodyh' >
      
      <div id='header'>
        <div id='header-name-div'>
          
            <Image src={Techno_txt} height={120}  width={250}  id='main_logo'></Image>
          
        </div>

        {
         auth=='true'? <div id='main_div_profile_f'>
        <div id='div_profile_f' >
           <div id='submainp_f'>
           <button id='X' onClick={close_profile}><AiOutlineClose/></button>
           <div id='sub_div_P_f'>
           <Image src={profile} id='imgp_f'></Image>
           <div id='sub_div_p_2f'>
           <span id='ptxt_f'>Vamshi</span>
           <span id='ptxt_f'>baikavamshi@gmail.com</span>
           </div>
           </div>
           
           <button id='filbtnp' onClick={logout} ><span id='logouttxt'>logout</span></button>
        </div>
        </div>
       <Link id='linkprofile'  onClick={close_profile}><Image src={profile} id='profilebtn'/></Link></div>:
       <div id='navlogdiv'><Link href={'/login'} id='linklog'><div id='navlogbtn'><MdLogin size={20}/><p id='navitemstxt'>login</p></div></Link></div>
       }
        
       <button id='searchicon2'> <AiOutlineSearch/> </button>
        
        <div id='search_div_h'>
        <div id='sub_search_div_m_h'>
          <div id='sub_search_div_h' >
            <button id='searchicon3_h' onClick={Open_Search2}> <AiOutlineSearch/> </button>
            <input type='text' id='searchbar2_h' placeholder=" Search" onChange={handleinput} value={search} onFocus={()=>{setsearch_div_h(true)}} ref={Ref_h}></input>
              
          </div>
          <div id='sub_search_div2_h' style={{height:search_div_h? 'max-content':'0px'}} ref={recentRef_h}>
              {
                searched_data.map((data,index)=>{
                     return(
                      <div key={index} id='search_items_div' onClick={()=>handlesearches(data['searched_data'])}>
                         <FaHistory id='history_icon'/><button key={index}  id='previous_sear'>{data['searched_data']}</button>
                      </div>                     )
                })
              }
          </div>
        </div>
      </div>
        <Link id='linklog' href='/about'><div id='navitems'><GiDiamondsSmile  size={20}/><p id='navitemstxt'>aboutUs</p></div></Link>
        <Link href='/feedback' id='linklog'><div id='navitems'><MdOutlineFeedback size={20}/><p id="navitemstxt">feedback</p></div></Link>
       <Link href='/wishlist' id='linklog'><div id='navitems'><AiOutlineHeart size={20}/><p id='navitemstxt'>wishlist</p></div></Link>
        <button id='morebtn' onClick={useClick}><AiOutlineMore id='moreicon'/></button>
        <div id='morediv'>
          <span id='li'>
            wishlist
            </span>
          <h1 id='li'>feedback</h1>
          <h1 id='li'>aboutus</h1>
        </div>
        
      
      </div>
      <div id='more_div_h'>
        <button id='btn_more'><Link id='link_log_more' href={'/about'} prefetch={false}><GiDiamondsSmile/><span id='txt_more'>aboutUs</span></Link></button>
        <div id='vertical-line'></div>
        <button id='btn_more'><Link href={'/feedback'} id='link_log_more' prefetch={false}><MdOutlineFeedback/><span id="txt_more">feedback</span></Link></button>
        <div id='vertical-line'></div>
        <button id='btn_more'i><Link href={'/wishlist'} id='link_log_more' prefetch={false}><AiOutlineHeart/><span id='txt_more'>wishlist</span></Link></button>
      </div>
      <div id='search_div'>
        <div id='sub_search_div_m'>
          <div id='sub_search_div' >
            <button id='searchicon3' onClick={Open_Search2}> <AiOutlineSearch/> </button>
            <input type='text' id='searchbar2' placeholder=" Search" onChange={handleinput} value={search} onFocus={()=>{setsearch_div(true)}} ref={Ref}></input>
              
          </div>
          <div id='sub_search_div2' style={{height:search_div? '200px':'0px'}} ref={recentRef}>
              {
                searched_data.map((data,index)=>{
                     return(
                      <div key={index} id='search_items_div' onClick={()=>handlesearches(data['searched_data'])}>
                         <FaHistory id='history_icon'/><button key={index}  id='previous_sear'>{data['searched_data']}</button>
                      </div>
                     )
                })
              }
          </div>
        </div>
      </div>
      <div id='filterbar' onClick={()=>{
      if(close==false){
        return close_profile();
      }
    }}>
        <span id='filbtn'  onClick={()=>{handleActive(1,'getdata/all/')}}><button id='linkH' > <span id='span-tag'>ALL</span> </button> <span id='span-tag2' style={buttonStyle(1)}></span> </span>
        <span id='filbtn'  onClick={()=>{handleActive(2,'getdata/2/')}} ><button  id='linkH' > <span id='span-tag'>MOBILES</span> </button> <span id='span-tag2' style={buttonStyle(2)}></span> </span>
        <span id='filbtn'  onClick={()=>{handleActive(3,'getdata/3/')}} ><button  id='linkH'><span id='span-tag'>LAPTOPS</span> </button> <span id='span-tag2' style={buttonStyle(3)}></span> </span>
        <span id='filbtn'  onClick={()=>{handleActive(4,'getdata/1/')}} ><butoon  id='linkH'> <span id='span-tag'>GADGETS</span> </butoon><span id='span-tag2' style={buttonStyle(4)} ></span></span>
        <span id='filbtn'  onClick={()=>{handleActive(5,'getdata/4/')}} ><button  id='linkH'><span id='span-tag'>NEW APPS/WEBSITES</span></button><span id='span-tag2' style={buttonStyle(5)}></span></span>
        <span id='filbtn'  onClick={()=>{handleActive(6,'getdata/5/')}} ><button  id='linkH'><span id='span-tag'>New Games</span></button><span id='span-tag2' style={buttonStyle(6)}></span></span>
        <span id='filbtn'  onClick={()=>{handleActive(7,'getdata/6/')}} ><button  id='linkH'><span id='span-tag'>EV BIKES</span></button><span id='span-tag2' style={buttonStyle(7)}></span></span>
        <span id='filbtn'  onClick={()=>{handleActive(8,'getdata/7/')}} ><button  id='linkH'><span id='span-tag'>EV cars</span></button><span id='span-tag2' style={buttonStyle(8)}></span></span>
        <span id='filbtn'  onClick={()=>{handleActive(9,'getdata/8/')}} ><button  id='linkH'><span id='span-tag'>Tech News</span></button><span id='span-tag2' style={buttonStyle(9)}></span></span>

      </div>
      
       <All path={path}/>
    </div>
   
  )
}

export default Homepage