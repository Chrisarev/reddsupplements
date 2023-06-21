import Navbar from './Navbar';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import styles from './stylesheets/Productshow.module.css';

const ProductShow = () => {
    const {prodID} = useParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        fetch(`product/${prodID}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then((response) => {
            return response.json()
        }).then((data) => {
            setProduct(data);
        })
    }, [])

    return (
        <>
            <Navbar />
            <div className={styles.panel}>
                <div className={styles.productTitle}>
                    {product &&
                        <div>{product.productTitle}</div>
                    }
                </div>
            </div>
        </>
    )
}

export default ProductShow;