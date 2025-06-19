import React from 'react'
import google from '../../assets/google_logo.png'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../helpers/firebase';
import { Button } from '../common/Button';
import { showToast } from '../../helpers/showToast';
import { useNavigate } from 'react-router-dom';
import { RouteIndex } from '../../helpers/RouteName';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slice'

export default function GoogleAuth() {

    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        
        try {
            const googleResponse = await signInWithPopup(auth, provider);
            const user = googleResponse.user;
            const bodyData = {
                name:user.displayName,
                email:user.email,
                avatar:user.photoURL
            };
            const response = await fetch(`${apiUrl}/google-auth`,{
                method:"post",
                headers:{'Content-Type':'application/json'},
                credentials:'include',
                body:JSON.stringify(bodyData)
            });
            const data = await response.json();
            if(!response.ok){
                showToast('Error', data.message || 'Login Failed.');
                return;
            }
            dispatch(setUser(data.user));
            showToast('Success', data.message || "Login Successfully.");
            navigate(RouteIndex);
        } catch(error){
            showToast('Error',error.message || 'Something Went Wrong.');
        }

    };

    return(
        <>
        <Button variant="secondary" onClick={handleLogin} className="w-full mt-1" >
            <img src={google} alt="Google" className='w-15 h-8 mr-2' />
            Continue with Google
        </Button>
        </>
    )

}