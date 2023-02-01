import React from 'react'
import styles from '../styles/PetBox.module.css'
export const UserBox = (props) => {
    const user = props.user
  return (
    
    <div className={`${styles.card} column is-2`}>
      <a href={user.url} className='has-text-dark'>
    <img src={user.images[0].thumbnail} alt="" className={styles.cardImg} />
    
    <div className={`${styles.cardFooter}`}>    
    <p className={`${styles.textTitle} is-size-6`}>{user.username}</p>

  </div></a></div>
  )
}
