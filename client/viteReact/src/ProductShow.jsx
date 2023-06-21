
import Navbar from './Navbar';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import styles from './stylesheets/Productshow.module.css';

const ProductShow = () => {
    const routeParams = useParams();
    const [product, setProduct] = useState();
    console.log(routeParams.prodID);

    useEffect(() => {
        fetch(`product/${routeParams.prodID}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data);
            setProduct(prev => data);
        })
    }, [])


    return (
        <>
        <Navbar />
        <div className={styles.panel}>
            <div className={styles.productInfo}>
                <div className={styles.productTitle}>
                    {product.productTitle}
                </div>
                <div className={productImage}>
                    <img src={product.image} alt="" />
                </div>
                <div className={styles.productPrice}>
                    {product.productPrevPrice &&
                        <span>{product.productPrevPrice}</span>
                    }
                    {product.productPrice}
                </div>
                <div className={styles.productDesc}>
                    {product.productDesc}
                </div>
            </div>
        </div>
        </>
    )
}

export default ProductShow;