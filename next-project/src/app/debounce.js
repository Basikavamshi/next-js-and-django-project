import React from 'react'
import { useEffect,useState } from 'react'
function useDebounce(debounce,val) {
  const [debounceval,setdebounceval]=useState()
  useEffect(()=>{
    const timefun=setTimeout(() => {
        setdebounceval(debounce)
    }, val);
    return ()=>{
        clearTimeout(timefun)
    }
  },[debounce])
  return debounceval
}

export default useDebounce