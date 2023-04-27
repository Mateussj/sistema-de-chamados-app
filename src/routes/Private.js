import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/auth' 

export default function Private({ children }){
  const { signed, loading } = useContext(AuthContext);

  if(loading){
    return(
      <div></div>
    )
  }

  if(!signed){
    return  <Navigate to="/" />
  }


  return children;

}