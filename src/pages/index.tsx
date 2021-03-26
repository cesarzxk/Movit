import { useRouter } from 'next/router'
import { useEffect } from "react";

export default function App(){
  const router = useRouter()

  return(
    <>
    {useEffect(()=>{ 
    router.push("./login");
  },[])}
    </>
  )
}