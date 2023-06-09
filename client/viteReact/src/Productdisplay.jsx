import styles from './stylesheets/Productdisplay.module.css'
import goldProtein from './stylesheets/images/goldProtein.jpg'
import { useEffect, useState } from 'react'

const Productdisplay = (props) =>{
    const [products, setProducts] = useState([]);

    useEffect(() =>{
        console.log(props.tag)
        fetch('/' + props.tag, {
            method:'GET',
            headers: {"Content-Type":"application/json"},
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            setProducts(prev => data)
        })
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