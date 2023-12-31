import './index.css'

import React, { useState } from 'react';
import { selectIsAuth, fetchAuthMe } from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PersonalAccount = () => {

  const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth);

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAuthMe())
        setFullName(response.payload.fullName)
        setEmail(response.payload.email)
      } catch (err) {
        console.log('Ошибка при проверке аутентификации', err);
      }
    }

    fetchData(); 

    return () => {};
    
  }, [])
  

  if(!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/"/>
  }


  return (
    <>
      <section className="pa__main">
        <h1>Личные данные</h1>
        <div className='main__body'>
          <div className='pa__body --text'>
            <span className="item--text">Полное имя:</span>
            <span className="item--text">E-mail:</span>
          </div>
          <div className="pa__body --input">
            <>
              <input
                type="text"
                onChange={(e) => {
                  setFullName(e.target.value)
                }}
                value={fullName} />
              <input
                type="text"
                set
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                value={email} />
            </>
          </div>
        </div>

        <h1>Покупки</h1>
        <div className='main__body'>
        </div>
      </section>
    </>
  )
}