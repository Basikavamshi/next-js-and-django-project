'use client'
import React, { useMemo } from "react";
import axios from "axios";
import '../../css/content_Technews.css';
import { useEffect } from "react";
import {
  MdThumbUpOffAlt,
  MdThumbUp,
  MdThumbDownOffAlt,
  MdSend,
  MdComment,
  MdMoreVert,
  MdLogin,
  MdFavorite,
  MdFeedback,
  MdSearch,
  MdExpandMore,
  MdShare,
  MdThumbDown,
  MdFavoriteBorder,
} from "react-icons/md";
import { useState } from "react";
import Lava from "../../media/lava.jpeg";
import Cookies from "universal-cookie";
import "../../css/content.css";
import { useRef } from "react";
import { useSearchParams } from "next/navigation";
function Content_Technews() {
  const [data, setdata] = useState([]);
  const change = false;
  const params=useSearchParams();
  const container = useRef();
  const comment_txt = useRef();
  const [image, setimage] = useState(data["thumbimg"]);
  const [activecircle, setactivecircle] = useState();
  const [likes, setlikes] = useState(0);
  const [wish,setwish]=useState(false)
  const [dislike, setdislike] = useState(0);
  const [background1, setbackground1] = useState(false);
  const [background2, setbackground2] = useState(false);
  const [comment, setcomment] = useState("");
  const [db_comments, set_db_comments] = useState([]);
  const [pre_div, set_pre_div] = useState(false);
  const [imageactive,setimageactive]=useState(0)
  const cookies = new Cookies();
  const [input,setinput]=useState('')
 
  const memo = useMemo(() => {
    axios
      .get(
        `http://127.0.0.1:8000/content/8/${params.get('id')}/`,
        cookies.get("auth") == 'true'
          ? {
              headers: {
                Authorization: `Bearer ${cookies.get("access")}`,
              },
            }
          : {}
      )
      .then((data) => {
        console.log(data);
        setdata(data.data.data);
        setimage(data.data.data["thumbimg"]);
        setlikes(data.data.likes);
        setdislike(data.data.dislikes);
        console.log(data.data.checkwish)
        data.data.checkwish ? setwish(data.data.checkwish['added_whishlist']):setwish(false)
        set_db_comments(data.data.product_comments);
        if (data.data.is_like == null) {
          setbackground1(false);
          setbackground2(true);
          console.log(data.data)
        } else {
          setbackground1(data.data.is_like);
          setbackground2(data.data.is_like);
          console.log(background1)
        }
      });
  }, [false]);
  const handleimages = (url) => {
    setimage(url);
  };
  const handlelikes = (categorys, id) => {
    if(cookies.get('auth')=='true'){
      if (background1 == false) {
        axios
          .post(
            `http://127.0.0.1:8000/likes/${categorys}/${id}/L/`,
            {},
            {
              headers: {
                Authorization: `Bearer ${cookies.get("access")}`,
              },
            }
          )
          .then((value) => {
            setlikes(value.data.likes);
            setdislike(value.data.dislikes);
            setbackground1(true);
            setbackground2(true);
          });
      } else {
        axios
          .post(
            `http://127.0.0.1:8000/likes/${categorys}/${id}/L/`,
            {},
            {
              headers: {
                Authorization: `Bearer ${cookies.get("access")}`,
              },
            }
          )
          .then((value) => {
            setlikes(value.data.likes);
            setdislike(value.data.dislikes);
            setbackground1(false);
          });
      }
    }else{
      alert('you should login to like the content')
    }
    
  };
  const handledislikes = (categorys, id) => {
    if (cookies.get("auth") == 'true') {
      if (background2 == false) {
        axios
          .post(
            `http://127.0.0.1:8000/likes/${categorys}/${id}/D/`,
            {},
            {
              headers: {
                Authorization: `Bearer ${cookies.get("access")}`,
              },
            }
          )
          .then((value) => {
            setlikes(value.data.likes);
            setdislike(value.data.dislikes);
            
            setbackground2(false);
            setbackground1(false);
          });
      } else {
        axios
          .post(
            `http://127.0.0.1:8000/likes/${categorys}/${id}/D/`,
            {},
            {
              headers: {
                Authorization: `Bearer ${cookies.get("access")}`,
              },
            }
          )
          .then((value) => {
            setlikes(value.data.likes);
            setdislike(value.data.dislikes);
            setbackground2(false);
            setbackground1(false);
          });
      }
    } else {
      alert("you should login to like or dislike the content");
    }
  };
  const handleinput = (e) => {
    setcomment(e.target.value);
  };
  const handlecomments = (categorys, id) => {
    if (comment == "") {
      alert("write comment");
    } else {
      axios
        .post(
          `http://127.0.0.1:8000/comment/${categorys}/${id}/`,
          {
            text: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${cookies.get("access")}`,
            },
          }
        )
        .then((value) => {
          setcomment("");
        });
    }
  };
  const handleshare = (text) => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        "https://www.youtube.com/"
      )}&quote=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const handleactiveimg=(id)=>{
    setimageactive(id)

  }
  const handleactiveimgages=(id)=>{
    return {
      borderColor: imageactive==id ? '#095ee7':'#ccc',
      
    }
  }
  const handlerows=(text)=>{
    return (text.match(/\n/g)||[]).length+1
  }
  const addwishlist=(id,categorys)=>{
    if(wish==true){
    axios.post('http://127.0.0.1:8000/wishlist/',{'product':id,'categorys':categorys},
    {
      headers:{
        Authorization: `Bearer ${cookies.get('access')}`
    }
    
  }).then((error)=>{console.log(error)})
   setwish(false)
}
  else{
    axios.post('http://127.0.0.1:8000/wishlist/',{'product':id,'categorys':categorys},
    {
      headers:{
        Authorization: `Bearer ${cookies.get('access')}`
    }
    
  })
    setwish(true)
  } 
}
  return (
    <div id="bodyc_t">
      <div id="mainc_t">
        <div id="maindiv_2_t">
          
        <div id="mainimgdiv_t">
  
            <img src={`http://127.0.0.1:8000/media/${image}`} id="mainimg_t" />
        
        </div>
   
        <div id="discriptiondiv_t">
          <div id="sub_discriptiondiv">
          <span id="discription_t">{data["thumbtxt"]}</span>
          <span id='price_div_t'>50000-60000</span>
          </div>
          <div id="btnsdiv_t">
            <button
              id="btnc1_t"
              onClick={() => {
                handlelikes(data["categorys"], data["id"]);
              }}
            >
              {background1 == false ? (
                <MdThumbUpOffAlt id="logo1" />
              ) : (
                <MdThumbUp id="logo1" />
              )}
              <span id="lcount">{likes}</span>
            </button>
            <button
              id="btnc2"
              onClick={() => {
                handledislikes(data["categorys"], data["id"]);
              }}
            >
              {background2 == false ? (
                <MdThumbDown id="logo2" />
              ) : (
                <MdThumbDownOffAlt id="logo2" />
              )}
              <span id="lcount">{dislike}</span>
            </button>
            <button
              id="btncs"
              onClick={()=>addwishlist(data['id'],data['categorys'])}
            >
            {
              wish==true? (<MdFavorite id="logo3" style={{color:'red',fontSize:'1.5em',transition:'0.2s'}}/>
              ):
              (<MdFavoriteBorder id="logo3"/>)
           }  
            </button>
            <button
              id="btncs"
              onClick={() => {
                handleshare(data["thumbtxt"]);
              }}
            >
              <MdShare id="logo3" />
            </button>
          </div>

          <div id="commentbox_div_t">
            <textarea
              type="text"
              id="commentbox_t"
              placeholder="Comment Your Opinion"
              ref={comment_txt}
              value={comment}
              onChange={(e) => {
                handleinput(e);
              }}
              onFocus={() => {
                set_pre_div(true);
              }}
              onBlur={() => {
                set_pre_div(false);
              }}
             
              rows={handlerows(comment)}

              wrap="soft"
            ></textarea>
            <button
              id="send_comment"
              onClick={() => {
                handlecomments(data["categorys"], data["id"]);
              }}
            >
              <MdSend />
            </button>
          </div>
        </div>
        </div>
    <div id="maindiv_3">
       
        <div id="prosconsdiv_t">
          <div id="prodiv">
            <h1 id="htxt"></h1>
            
            <p id="smalltxt">{data["about_news"]}</p>

          </div>
        <div id="sampleimg_div">
          <img src={`http://127.0.0.1:8000/media/${data['sample_img']}`} id="sampleimg"></img>
        </div>
        <div id="consdiv">
            <p id="smalltxt">{data["sample_img_txt"]}</p>
        </div>
        <div id="samplevideo_div">
            
           <video src={`http://127.0.0.1:8000/media/${data['video']}`} controls={true} id="samplevideo"></video>
            
        </div>

        <div id="consdiv">
            <p id="smalltxt">{data["sample_video_txt"]}</p>
        </div>


        </div>
        <div id="commentdiv">
          <h1 id="htxt">Comments</h1>
          {db_comments ? (
            db_comments.map((com) => {
              return (
                <div id="sub_div_com">
                  <div id="list_com">
                    <div id="userAimgdiv">
                    <img src={Lava} id="userimg_com"></img>
                    <span id="username_com">{com["username"]}</span>
                    </div>
                    <div id="border-div-c">
                      <text id="commenttxt">{com["comments"]}</text>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>no comments</div>
          )}
        </div>
    </div>
      </div>
    </div>
  );
}

export default Content_Technews;
