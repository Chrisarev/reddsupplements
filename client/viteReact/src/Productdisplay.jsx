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
        })
    }, [products])


    return (
        <div className={styles.productsPanel}>
            <div className={styles.selector}>
                <button className={styles.selectorOption}>
                    Protein
                </button>
                <button className={styles.selectorOption}>
                    Preworkout
                </button>
                <button className={styles.selectorOption}>
                    Supplements
                </button>
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
                    <div className={styles.imageHolder}>
                        <img src={dyna} alt="" />
                    </div>
                    <h2>Gold Protein but longer title to test h2 overflow AAA!!!!</h2>
                    <p><span>$50.00</span>$45.00</p>
                </div>
            </Link>
            <Link to="/">
                <div className={styles.product}>
                <div className={styles.imageHolder}>
                        <img src={goldProtein} alt="" />
                    </div>
                    <h2>Gold Protein but longer title to test h2 overflow AAA!!!!</h2>
                    <p><span>$50.00</span>$45.00</p>
                </div>
            </Link>
            <Link to="/">
                <div className={styles.product}>
                    <img src={goldProtein} alt="" />
                    <h2>Gold Protein but longer title to test h2 overflow AAA!!!!</h2>
                    <p><span>$50.00</span>$45.00</p>
                </div>
            </Link>
            <Link to="/">
                <div className={styles.product}>
                    <img src={goldProtein} alt="" />
                    <h2>Gold Protein but longer title to test h2 overflow AAA!!!!</h2>
                    <p><span>$50.00</span>$45.00</p>
                </div>
            </Link>
            <Link to="/">
                <div className={styles.product}>
                    <img src={goldProtein} alt="" />
                    <h2>Gold Protein but longer title to test h2 overflow AAA!!!!</h2>
                    <p><span>$50.00</span>$45.00</p>
                </div>
            </Link>
            <Link to="/">
                <div className={styles.product}>
                    <img src={goldProtein} alt="" />
                    <h2>Gold Protein but longer title to test h2 overflow AAA!!!!</h2>
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