import { useEffect } from 'react'
import styles from './stylesheets/Productdisplay.module.css'
import goldProtein from './stylesheets/images/goldProtein.jpg'

const Productdisplay = () =>{

    useEffect(() =>{

    },[])   

    return(
        <div className={styles.productsPanel}>
            <div className={styles.product}>
                <img src={goldProtein} alt="" />
                <h2>Gold Protein</h2>
                <p><span>$50.00</span>$45.00</p>
            </div>
            <div className={styles.product}>
                <img src={goldProtein} alt="" />
                <h2>Gold Protein</h2>
                <p><span>$50.00</span>$45.00</p>
            </div>
            <div className={styles.product}>
                <img src={goldProtein} alt="" />
                <h2>Gold Protein</h2>
                <p><span>$50.00</span>$45.00</p>
            </div>
        </div>
    )
}

export default Productdisplay;