import './index.css'

import React from 'react';
import { Item } from '../../Components/Item'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/products';

import { selectIsAuth } from '../../redux/slices/auth';

export const Home = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { products } = useSelector(state => state.products);

  const isProductsLoading = products.status === 'loading'
  
  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [])

  return (
    <>
      <section className="main__">
        {(isProductsLoading ? [...Array(12)] : products.items).map((obj, index) => {
          return (
            isProductsLoading
              ? (<Item
                isLoading={true}
              />)
              : (<Item
                id={obj._id}
                name={obj.name}
                price={obj.price}
                isAuth={isAuth}
                img={obj.imageUrl ? `${process.env.REACT_APP_API_URL || `http://localhost:4444/uploads/`}${obj.imageUrl}` : `../../images/${obj.imageUrl}`}
              />)
          )
        })}
      </section>
    </>
  )
}