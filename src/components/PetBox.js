import React from 'react'
import styles from '../styles/PetBox.module.css'
export const PetBox = (props) => {
    const pet = props.pet
  return (
    
    <div className={`${styles.card} column is-2`}>
      <a href={pet.url} className='has-text-dark'>
    <img src={pet.images[0].thumbnail} alt="" className={styles.cardImg} />
    <div className={styles.cardInfo}>
      <p className={`${styles.textTitle} is-size-6`}>{pet.name}</p>
    </div>
    <div className={`${styles.cardFooter}`}>
    <span className={styles.textTitle}>{pet.age}</span>
    

    
  </div></a></div>
  )
}
