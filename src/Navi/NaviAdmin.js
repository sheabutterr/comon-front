import { RiUser5Line, RiUser5Fill, RiLogoutCircleFill } from 'react-icons/ri'
import '../css/navi.css';
import '../css/dev.css';
import * as React from 'react'
import { Reset } from 'styled-reset'
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NaviAdmin = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authIdx, setAuthIdx] = useState(1);

    useEffect(() => {
        if (sessionStorage.getItem('token') != null) {
            const token = sessionStorage.getItem('token');
            const decode_token = jwtDecode(token);
            setIsLoggedIn(true);
            setAuthIdx(decode_token.authIdx);
        } else {
            setIsLoggedIn(false);
        }
    }, [])

    const handlerClickComon = () => {
        props.history.push(`/`);
    };

    const handlerClickAppList = () => {
        props.history.push(`/user/applist`);
    };

    const handlerGoMypage = () => {
        props.history.push(`/admin/chart`);
    };

    const handlerClickNotice = () => {
        props.history.push(`/notice`);
    };

    const handlerClickLogout = () => {
        setIsLoggedIn(false);
        sessionStorage.clear();
        localStorage.clear();
        props.history.push('/');
        showToastMessage();
    };
   
    const handlerClickLogin = () => {
        props.history.push(`/login`)
    };

    const showToastMessage = () => {
        toast('Bye Bye~ 👋', {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const handlerClickAboutUs = () => {
        props.history.push(`/user/aboutus`);
    };

    return (
        <>
            <Reset />
            <div className='menu'>
                <h1 onClick={handlerClickComon} className='home'>COM:ON</h1>
                <ul className='link'>
                    <li onClick={handlerClickAboutUs}>About us</li>
                    <li onClick={handlerClickAppList}>Application</li>
                    <li onClick={handlerClickNotice}>Notice</li>
                </ul>
                {
                    isLoggedIn
                        ?
                        <>
                            <div id="user-button">
                                < RiLogoutCircleFill className='logout-navi-icon'
                                    title='로그아웃'
                                    onClick={handlerClickLogout}
                                    style={{ color: '#0d4bbe' }} />
                                < RiUser5Fill className='mypage-navi-icon'
                                    title='마이페이지'
                                    onClick={handlerGoMypage}
                                    style={{ color: '#0d4bbe' }} />
                            </div>
                        </>
                        :
                        <>
                            <div id="user-button">
                                < RiUser5Line className='login-navi-icon'
                                    title='로그인'
                                    onClick={handlerClickLogin}
                                    style={{ color: '#0d4bbe' }} />
                            </div></>

                }

            </div>
        </>
    );
}

export default NaviAdmin;