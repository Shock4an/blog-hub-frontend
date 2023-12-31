import './index.css'
import { ItemSkeleton } from './skeleton'

export const Item = ({ 
  id,
  title,
  name,
  price,
  img,
  isLoading
 }) => {

  if(isLoading) return ( <ItemSkeleton/> )

  return (
    <> 
      <div className="main__item">
        <div id="add__button">
          <svg width="35px" height="35px" viewBox="-4.5 -4.5 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Edit / Add_Plus">
            <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </svg>
        </div>
        <div className="item--img__container">
          <img className='item__image' src={img} alt="text" />
        </div>
        <div className="item__body">
          <div className="body__title"><a href="">{title}</a></div>
          <div className="body__price">{price}</div>
        </div>
      </div>
    </>
  )
}