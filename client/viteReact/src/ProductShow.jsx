import Navbar from './Navbar';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import styles from './stylesheets/Productshow.module.css';
import goldProtein from './stylesheets/images/goldProtein.jpg'
const ProductShow = () => {
    const { prodID } = useParams();
    const [product, setProduct] = useState();
    const [productQuantity, setProductQuantity] = useState(0);
    const [productVariation, setProductVariation] = useState('');
    const [cartAddStatus, setCartAddStatus] = useState(false);
    const [isPending, setIsPending] = useState(false);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        fetch(`/api/addCart/${prodID}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: productQuantity
        }).then((response) => {
            if (response.status == 204) {
                console.log('added to cart')
                setIsPending(false);
                setCartAddStatus(true);
                return response;
            }
            setIsPending(false);
            setCartAddStatus(false);
            return response;
        })
    }

    return (
        <>
            <Navbar />
            <div className={styles.panel}>
                {product &&
                    <div className={styles.productPanel}>
                        <img className={styles.productIMG} src={product.image}></img>
                        <div className={styles.productInfo}>
                            <h1 className={styles.productTitle}>
                                {product.productTitle}
                            </h1>
                            <p className={styles.productPrice}><span>{product.productPrevPrice}</span>{product.productPrice}</p>
                            <p className={styles.productDesc}>{product.productDesc}</p>
                            <form onSubmit={handleSubmit}>
                            <label htmlFor="quantity">Quantity</label>
                            <select className={styles.quantitySelect} name="quantity" value={productQuantity}
                                onChange={(e) => setProductQuantity(prev => e.target.value)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            {!cartAddStatus && !isPending &&
                                <button type="submit">ADD TO CART</button>
                            }
                            {isPending &&
                                <button disabled >Adding...</button>
                            }
                            {cartAddStatus && !isPending && 
                                <button disabled className={styles.successButton}>Added to Cart!</button>
                            }
                        </form>
                        </div>
                    </div>
                }

                <div className={styles.productPanel}>
                    <div className={styles.imageHolder}>
                        <img className={styles.productIMG} src={goldProtein}></img>
                    </div>
                    <div className={styles.productInfo}>
                        <h1 className={styles.productTitle}>
                            Gold Standard Whey Protein
                        </h1>
                        <p className={styles.productPrice}><span>$30.00</span>$25.00</p>
                        <p className={styles.productDesc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis optio ab dolor laborum asperiores maiores ipsa vel. Quis repellendus exercitationem tempore harum commodi unde obcaecati cum autem hic non. Eligendi.
                            Enim adipisci modi aspernatur suscipit blanditiis eaque totam nisi officiis accusantium excepturi inventore itaque quae natus iusto numquam, delectus a obcaecati incidunt nihil quam placeat cumque dolor. Inventore, ut molestias?
                            Dolor aspernatur explicabo atque, consequuntur voluptatibus nisi omnis soluta corporis ipsa commodi voluptates voluptate molestiae eaque labore eum nihil? Totam sed, dolor adipisci temporibus cum nobis nulla autem perferendis inventore.</p>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="quantity">Quantity</label>
                            <select className={styles.quantitySelect} name="quantity" value={productQuantity}
                                onChange={(e) => setProductQuantity(prev => e.target.value)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            {!cartAddStatus && !isPending &&
                                <button type="submit">ADD TO CART</button>
                            }
                            {isPending &&
                                <button disabled >Adding...</button>
                            }
                            {cartAddStatus && !isPending && 
                                <button disabled className={styles.successButton}>Added to Cart!</button>
                            }
                        </form>
                        <h2>Limit 5 per order </h2>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ProductShow;