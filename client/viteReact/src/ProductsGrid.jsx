
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import styles from './stylesheets/ProductsGrid.module.css';
import Productdisplay from './Productdisplay';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import goldProtein from './stylesheets/images/goldProtein.jpg'
import dyna from './stylesheets/images/dymatizeProtein.jpg'

const ProductsGrid = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const {category} = useParams();
        fetch(`/api/category/${category}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        }).then((response) => {
            return response.json()
        }).then((data) => {
            setProducts(prev => data);
            console.log(products);
        })
    }, [category])

    return (
        <>
            <Navbar />
            <div className={styles.optionsSelector}></div>
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
                        <p>
                            {product.productPrevPrice != '' &&
                                <span>${String(product.productPrevPrice)}</span>
                            }
                            ${product.productPrice.$numberDecimal}
                        </p>
                    </div>
                </Link>
            ))}
            <Link to='/'>
                <div className={styles.product}>
                    <img src={dyna} alt="productImage" />
                    <h2>This is a long product title so i can test the overflow properties i set in css
                        this is even more text actually because i need it to overflow
                    </h2>
                    <p><span>$35.00</span>$30.00</p>
                </div>
            </Link>
        </div>

        </>
    )
}

export default ProductsGrid;