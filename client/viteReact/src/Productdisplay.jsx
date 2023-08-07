import styles from './stylesheets/Productdisplay.module.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import goldProtein from './stylesheets/images/goldProtein.jpg'
import dyna from './stylesheets/images/dymatizeProtein.jpg'
const Productdisplay = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`/api/category/${props.tag}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        }).then((response) => {
            return response.json()
        }).then((data) => {
            setProducts(prev => data);
            console.log(products); 
        })
    }, [])


    return (
        <div className={styles.productsPanel}>
            <div className={styles.selector}>
                <Link className={styles.selectorOption} to='/category/protein'>Protein</Link>
                <Link className={styles.selectorOption} to='/category/preworkout'>Preworkout</Link>
                <Link className={styles.selectorOption} to='/category/supplement'>Supplements</Link>
            </div>
            {products.map((product) => (
                <Link to={`/product/${product._id}`}>
                    <div className={styles.product}>
                        <img src={product.image} alt="productImage" />
                        <h2>{product.productTitle}</h2>
                        <p><span>${String(product.productPrevPrice)}</span>${product.productPrice.$numberDecimal}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Productdisplay;