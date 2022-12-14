import React from 'react'
import styles from '../styles/style.module.css';
const Modal = ({show, onHidde, onCancel, title, titleButton, children}) => {
    if(show)
  return (
    <div className={styles.modal}>
        <div className={styles.modal_container}>
            
            <div className={styles.modal_title}>
                <p> {title} </p>
                <button className='absolute right-4 hover:text-black/80 text-xl'
                    onClick={onCancel}
                > X </button>
            </div>
            <div className={styles.modal_body}>
                {children}
            </div>
            {/* <div className='flex justify-end text-white mb-1 mx-1'>
                <button className='border bg-gray-700 p-1 rounded-sm mr-10' onClick={onHidde}> {titleButton} </button>
                <button className='border bg-gray-700 p-1 rounded-sm' onClick={onCancel}> Cancelar </button>
            </div> */}
        </div>
    </div> 
  ) 
  else 
  return
   <></>
}

export default Modal