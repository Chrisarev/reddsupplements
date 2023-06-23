import Navbar from './Navbar';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import styles from './stylesheets/Productshow.module.css';
import goldProtein from './stylesheets/images/goldProtein.jpg'
const ProductShow = () => {
    const { prodID } = useParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        fetch(`/api/product/${prodID}`, {
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
                        <div className={styles.productPanel}>
                            <img className={styles.productIMG} src={goldProtein}></img>
                            <div className={styles.productInfo}>
                                <h1 className={styles.productTitle}>
                                    {product.productTitle}
                                </h1>
                                <p><span>{product.productPrevPrice}</span>{product.productPrice}</p>
                                <p>{product.productDesc}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default ProductShow;