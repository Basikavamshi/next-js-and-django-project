'use client'
import React, { useMemo } from "react";
import axios from "axios";
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
import { useSearchParams } from "next/navigation";
import Lava from "../../media/lava.jpeg";
import Cookies from "universal-cookie";

import "../../css/content.css";
import { useRef } from "react";
function Content_EVcars() {
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
  useEffect(() => {
    const handlescroll = () => {
      const scrollleft = container.current.scrollLeft;
      const scrollwidth = container.current.scrollWidth;
      const containerwidth = container.current.offsetWidth;
      const scrollper = scrollleft / Math.max(1, scrollwidth - containerwidth);
      const circleindex = Math.floor(scrollper * 6);
      setactivecircle(circleindex);
    };
    container.current.addEventListener("scroll", handlescroll);

    setimage(data["thumbimg"]);
  }, [change]);
  const memo = useMemo(() => {
    axios
      .get(
        `http://127.0.0.1:8000/content/5/${params.get("id")}/`,
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
    <div id="bodyc">
      <div id="mainc">
        <div id="maindiv_2">
          
        <div id="mainimgdiv">
          <div id="mimgdiv">
            <img src={`http://127.0.0.1:8000/media/${image}`} id="mainimg" />
          </div>
          <div id="subimgdiv" ref={container}>
            <img
              src={`http://127.0.0.1:8000/media/${data["thumbimg"]}`}
              id="subimg"
              onClick={() =>{ handleimages(data["thumbimg"]),handleactiveimg(0)}}
               style={handleactiveimgages(0)}
            ></img>
            <img
              src={`http://127.0.0.1:8000/media/${data["subimge1"]}`}
              id="subimg"
              onClick={() => {handleimages(data["subimge1"]),handleactiveimg(1)}}
              style={handleactiveimgages(1)}
            />
            <img
              src={`http://127.0.0.1:8000/media/${data["subimge2"]}`}
              id="subimg"
              onClick={() => {handleimages(data["subimge2"]),handleactiveimg(2)}}
               style={handleactiveimgages(2)}
            />
            <img
              src={`http://127.0.0.1:8000/media/${data["subimge3"]}`}
              id="subimg"
              onClick={() =>{handleimages(data["subimge3"]),handleactiveimg(3)}}
               style={handleactiveimgages(3)}
            />
            <img
              src={`http://127.0.0.1:8000/media/${data["subimge4"]}`}
              id="subimg"
              onClick={() =>{ handleimages(data["subimge4"]),handleactiveimg(4)}}
               style={handleactiveimgages(4)}
            />
            <img
              src={`http://127.0.0.1:8000/media/${data["subimge5"]}`}
              id="subimg"
              onClick={() =>{ handleimages(data["subimge5"]),handleactiveimg(5)}}
               style={handleactiveimgages(5)}
            />
          </div>
          
          <div id="scrooldotsdiv">
            <li id={`dots${activecircle == 0 ? "active" : ""}`}></li>
            <li id="dots"></li>
            <li id="dots"></li>
          </div>
        </div>
   
        <div id="discriptiondiv">
          <div id="sub_discriptiondiv">
          <span id="discription">{data["thumbtxt"]}</span>
          <span id='price_div'>50000-60000</span>
          </div>
          <div id="btnsdiv">
            <button
              id="btnc1"
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

          <div id="commentbox_div">
            <textarea
              type="text"
              id="commentbox"
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
        <div id="specdiv">
          <div id="border-main-div">
          <h1 id="htxt">Specifications</h1>
          <div id="border-div">
          
          {Array.isArray(data["specifications"])
            ? data["specifications"].map((value) => {
                return (
                  <h1 id="smalltxt" key={value.id}>
                    {value}
                  </h1>
                );
              })
            : console.log("its ok")}
            </div>
          </div>
          <div>
            <h1 id="htxt">safety Features</h1>
            <div>
              <div id="border-div">
              <h1 id="smalltxt">games in 90fps</h1>
              <h1 id="smalltxt">it is good for genral purpose</h1>
             </div>
            </div>
          </div>
        </div>

        <div id="A_I_div">
          
          <div id="border-main-div">
          <h1 id="htxt">Riding_modes</h1>
          <div id="border-div">
          {Array.isArray(data["Riding_modes"])
            ? data["Riding_modes"].map((value) => {
                return (
                  <h1 id="smalltxt" key={value.id}>
                    {value}
                  </h1>
                );
              })
            : console.log("its ok")}
            </div>
          </div>
          
          <div>
          <h1 id="htxt">rating</h1>
          <div id="border-div">
          
          {Array.isArray(data["Rating"])
            ? data["Rating"].map((value) => {
                return (
                  <h1 id="smalltxt" key={value.id}>
                    {value}
                  </h1>
                );
              })
            : console.log("its ok")}
          </div>
          </div>
        </div>
        <div id="prosconsdiv">
          <div id="prodiv">
            <h1 id="htxt">Pros</h1>
            <div id='border-div'>
            {Array.isArray(data["pros"])
            ? data["pros"].map((value) => {
                return (
                  <h1 id="smalltxt" key={value.id}>
                    {value}
                  </h1>
                );
              })
            : console.log("its ok")}
            </div>
          </div>
        </div>
        <div id="prosconsdiv">
          <div id="prodiv">
            <h1 id="htxt">cons</h1>
            <div id='border-div'>
            {Array.isArray(data["cons"])
            ? data["cons"].map((value) => {
                return (
                  <h1 id="smalltxt" key={value.id}>
                    {value}
                  </h1>
                );
              })
            : console.log("its ok")}
            </div>
          </div>
        </div>
        <div id="commentdiv">
          <h1 id="htxt">comments</h1>
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

export default Content_EVcars;
