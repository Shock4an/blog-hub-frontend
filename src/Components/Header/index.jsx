import './index.css'

import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if(window.confirm("Хотите выйте из аккаунта?")) {
      dispatch(logout());
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('userData')
      return (
        <Navigate to="/login"/>
      )
    }
  };
  
  return (
    <>
      <header className="header">
        <nav className='header__nav'>
          <ul className="header__list">
            <li className="list__item logo">
              <Link 
                className='item__link -logo' 
                to='/'
              >GFG</Link>
            </li>
            <div className='header__auth'>
              {!isAuth 
                ? <>
                    <li className="list__item">
                      <Link className='item__link -register' to="/register">
                        <div className='link__text'>Регистарция</div>
                      </Link>
                    </li>
                    <li className="list__item">
                      <Link className='item__link -login' to="/login">
                        <div className='link__text'>Вход</div>
                      </Link>
                    </li>
                  </> 
                : <>
                    <li className="list__item">
                      <Link className='item__link -basket' to="/basket">
                        <div className='link__text'>Корзина</div>
                      </Link>
                    </li>
                    <li className="list__item">
                      <Link className='item__link -me' to="/personal_account">
                        <div className='link__text'>Личный кабинет</div>
                      </Link>
                    </li>
                    <li className="list__item">
                      <a className='item__link -exit' href="">
                        <div onClick={onClickLogout} className='link__text'>Выйти</div>
                      </a>
                    </li>
                  </>
              }
            </div>
          </ul>
        </nav>
      </header>
    </>
  )
}