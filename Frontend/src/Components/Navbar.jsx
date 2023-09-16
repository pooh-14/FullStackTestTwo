
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';

const Navbar = () => {
  
  const { state, dispatch } = useContext(AuthContext);
  const router = useNavigate()

  return (
    <div style={{width:"100%", height:"65px", border:"4px solid black", display:"flex",justifyContent:"space-between"}}>
      <div><h4 style={{marginLeft:"50px"}} onClick={() => router('/')}>Logo</h4></div>
      <div style={{display:"flex", marginRight:"50px", width:"500px",justifyContent:"space-between"}}>
      {state?.user?.name? <>
                    <h4 onClick={() => router('/allquestions')}>All Questions</h4>
                    {state?.user?.role == "User" ? <h4 >Results</h4> : <h4 onClick={() => router('/yourquestions')}>Your Questions</h4>}
                    <h4 onClick={() => router('/profile')}>Profile</h4>
                    <h4 onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</h4>
                </> : <h4 onClick={() => router('/login')}>Login/Register</h4>}
      </div>
    </div>
  )
}

export default Navbar