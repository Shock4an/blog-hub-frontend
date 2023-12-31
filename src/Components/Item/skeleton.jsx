import './index.css'

export const ItemSkeleton = ({ 
  id,
  title,
  name,
  price,
  img,
  isLoading
 }) => {
  return (
    <>
      <div className="main__item">
        <div className="item--img__container skeleton">
          
        </div>
        <div className="item__body skeleton">
          <div className="body__title skeleton"><a href="">{''}</a></div>
          <div className="body__price skeleton">{''}</div>
        </div>
      </div>
    </>
  )
}