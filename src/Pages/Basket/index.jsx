import { useEffect, useState } from 'react'
import { OrderedProduct } from '../../Components/OrderedProduct'
import './index.css'
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

export const Basket = () => {

  const [sumPrice, setSumPrice] = useState(0);
  const navigate = useNavigate()

  const calculateSumPrice = (products) => {
    let sum = 0;
    for (let product of products) {
      sum += product.price * product.count;
    }
    return sum.toFixed(2);
  };

  const getProductsFromLocalStorage = () => {
    return JSON.parse(window.localStorage.getItem('products')) || [];
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = getProductsFromLocalStorage().filter(el => el.id !== productId);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setSumPrice(calculateSumPrice(updatedProducts));
  }

  const handleUpdateCount = (productId, newCount) => {
    const updatedProducts = getProductsFromLocalStorage().map(el => {
      if (el.id === productId) {
        return { ...el, count: Math.max(newCount, 1) };
      }
      return el;
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setSumPrice(calculateSumPrice(updatedProducts));
  }

  const handleOrder = async () => {
    try {
      const orderItems = await getProductsFromLocalStorage().map(item => ({
        item: item.id,
        count: item.count, 
      }));

      const order = {
        price: sumPrice,
        items: orderItems,
      }
  
      const { data } = await axios.post("/items/order", order)
      localStorage.removeItem('products')
      console.table(sumPrice)
      navigate(`/personal_account`)  
    } catch (err) {
      console.warn(err)
      alert("Ошибка при оформлении заказа")
    }
    
  }

  useEffect(() => {
    const products = getProductsFromLocalStorage();
    setSumPrice(calculateSumPrice(products));
  }, []);

  return (
    <>
      <section className='pa__main'>
        <h1>Оформление заказа</h1>
        {getProductsFromLocalStorage().map(obj => (
          <OrderedProduct
            key={obj.id}
            id={obj.id}
            name={obj.name}
            price={obj.price}
            img={obj.img}
            count={obj.count}
            isOrdering={true}
            onDelete={handleDeleteProduct}
            onUpdateCount={handleUpdateCount}
          />
        ))}
        <div className='basket__order'>
          {getProductsFromLocalStorage().length !== 0
            ? <>
                <div 
                  onClick={handleOrder}
                  className="order__button -active"
                >Оформить заказ</div>
                <div className="order__sumprice">Сумма: {sumPrice}$</div>
              </>
            : <></>
          }
        </div>
      </section>
    </>
  )
}