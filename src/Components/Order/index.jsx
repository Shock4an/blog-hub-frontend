import './index.css'

import { OrderedProduct } from '../OrderedProduct'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchRemoveOrders } from '../../redux/slices/order'

export const Order = ({
  item
}) => {

  const _id = item._id

  const dispatch = useDispatch()
  const [sumPrice, setPriceSum] = useState(item.price)

  const API_URL = `${process.env.REACT_APP_API_URL || `http://localhost:4444`}/uploads`

  const onClickRemove = () => {
    if(window.confirm("Хотите удалить заказ?")) {
      dispatch(fetchRemoveOrders(_id))
    }
  }

  return (
    <>
      <section className="orderSection__body">
        {
          item &&
          item.items.map(obj => {
            return (
              <>
                <OrderedProduct
                  key={obj.id}
                  id={obj.item.id}
                  name={obj.item.name}
                  price={obj.item.price}
                  count={obj.count}
                  img={obj.item.imageUrl ? `${API_URL}${obj.item.imageUrl}` : `../../images/${obj.item.imageUrl}`}
                  isOrdering={false}
                />
              </>

            )
          })
        }
        <div div className='basket__order'>
          <div className='basket__buttons'>
            <div
              className="order__button -active"
            >Оплатить заказ</div>
            <div
              onClick={onClickRemove}
              className="order__button -active -delete"
            >Удалить</div>
          </div>
          <div className="order__sumprice -pa">Сумма: {sumPrice}$</div>
        </div>
      </section >
    </>
  )
}