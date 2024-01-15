import './index.css'

import React, { useState } from 'react';
import { selectIsAuth, fetchAuthMe } from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchOrders } from '../../redux/slices/order';
import { OrderedProduct } from '../../Components/OrderedProduct';
import { Order } from '../../Components/Order';

export const PersonalAccount = () => {
  let auth;

  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth);
  const { orders } = useSelector(state => state.orders)

  const isOrdersLoading = orders.status === 'loading'

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        auth = await dispatch(fetchAuthMe())

        setFullName(auth.payload.fullName)
        setEmail(auth.payload.email)

        dispatch(fetchOrders())
      } catch (err) {
        console.warn('Ошибка при проверке аутентификации', err);
      }
    }

    fetchData();

    return () => { };

  }, [])

  console.log(auth.payload.data)
  console.log(orders)
  console.log(orders.items)

  // orders.items.map(obj => obj.items.map(el => console.log(el.item.price * el.count)))


  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />
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
          </div>
        </div>

        <h1>Покупки</h1>
        <div className='main__body -order'>
          {
            orders.items.map(obj => {
              if(obj.user._id == auth.payload._id) {console.log(obj.user._id, auth.payload._id)}
              return (
                <>
                  <Order item={obj} />
                </>
              )
            })
          }
        </div>
      </section>
    </>
  )
}