import './index.css'

import React from 'react';
import { Item } from '../../Components/Item'
import { useDispatch, useSelector } from 'react-redux';
// import { fetchPosts } from '../redux/slices/posts';

import cs from '../../images/cs.jpg'
import cs2 from '../../images/cs2.jpg'
import rdr from '../../images/Red_Dead_Redemption_II.jpg'

export const Home = () => {
  
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data)
	// const { posts } = useSelector(state => state.posts);

	// const isPostsLoading = posts.state === 'loading'

	// React.useEffect(() => {
	// 	dispatch(fetchPosts());
	// }, [])
  
  const items = []

  const isItemsLoading = false

  return (
    <>
      <section className="main__">
        <Item 
          img={cs2}
          title={'Counter-Strike 2'}
          price={'5.99$'}
          />
        <Item 
          img={rdr}
          title={'Red Dead Redemption 2'}
          price={'10.99$'}
          />
        {(isItemsLoading ? [...Array(12)] : items).map((obj, index) => {
          return (
            isItemsLoading 
            ? (<Item 
                key={index} 
                img={rdr}
                title={'Red Dead Redemption 2'}
                price={'10.99$'}
                isLoading={true}
                />)
            : (<Item
                id={obj._id}
                title={obj.title}
                name={obj.name}
                price={obj.price}
                img={obj.img}
              />) 
          )
        })}
      </section>
    </>
  )
}