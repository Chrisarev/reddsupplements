import styles from './stylesheets/Productdisplay.module.css'
import goldProtein from './stylesheets/images/goldProtein.jpg'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const Productdisplay = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`category/${props.tag}`,{
            method:'GET',
            headers: {"Content-Type":"application/json"}
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            setProducts(prev => data); 
        })
    }, [])

    return (
        <div className={styles.productsPanel}>
            <div className={styles.selector}>
            </div>
            {products.map((product) => (
                <Link to={`/product/${product._id}`}>
                    <div className={styles.product}>
                        <img src={product.image} alt="productImage" />
                        <h2>{product.productTitle}</h2>
                        <p><span>{product.productPrevPrice}</span>{product.productPrice}</p>
                    </div>
                </Link>
            ))}
            <Link to="/">
                <div className={styles.product}>
                    <img src={goldProtein} alt="" />
                    <h2>Gold Protein</h2>
                    <p><span>$50.00</span>$45.00</p>
                </div>
            </Link>
            <Link to="/">
                <div className={styles.product}>
                    <img src={goldProtein} alt="" />
                    <h2>Gold Protein</h2>
                    <p><span>$50.00</span>$45.00</p>
                </div>
            </Link>
            <Link to="/">
                <div className={styles.product}>
                    <img src={goldProtein} alt="" />
                    <h2>Gold Protein</h2>
                    <p><span>$50.00</span>$45.00</p>
                </div>
            </Link>
        </div>
    )
}

export default Productdisplay;