/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAllCookie } from "../../helpers/cookie";
import { checkLogin } from "../../actions/login"
import { useEffect } from "react";

function Logout(){

    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // deleteAllCookie();
    // dispatch(checkLogin(false));
    // useEffect(() => {
    //     navigate("/login")
    // }, [])

    return (
        <> 
        </>
    )
}

export default Logout;