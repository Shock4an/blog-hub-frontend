import './index.css'
import { ItemSkeleton } from './skeleton'

export const Item = ({
  id,
  name,
  price,
  img,
  isLoading,
  isAuth
}) => {

  

  const addHandler = () => {
    const products = JSON.parse(window.localStorage.getItem("products")) || [];
    const existingProduct = products.find((product) => product.name === name);

    if(!isAuth) return
  
    if (existingProduct) {
      const updatedProducts = products.map((product) =>
        product.name === name ? { ...product, count: product.count + 1 } : product
      );
      window.localStorage.setItem("products", JSON.stringify(updatedProducts));
      alert('Добавлено в корзину')
    } else {
      const newProduct = { id, name, price, img, count: 1 };
      const updatedProducts = [...products, newProduct];
      window.localStorage.setItem("products", JSON.stringify(updatedProducts));
      alert('Добавлено в корзину')
    }
  };

  if (isLoading) return (<ItemSkeleton />)

  return (
    <>
      <div className="main__item">
        <div
          onClick={addHandler}
          id="add__button"
        >
          <svg width="35px" height="35px" viewBox="-4.5 -4.5 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Edit / Add_Plus">
              <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </div>
        <div className="item--img__container">
          {img && (
            <img className='item__image' src={img} alt="text" />
          )}
        </div>
        <div className="item__body">
          <div className="body__title"><a href="">{name}</a></div>
          <div className="body__price">{`${price}$`}</div>
        </div>
      </div>
    </>
  )
}