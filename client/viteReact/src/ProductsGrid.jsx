
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import styles from './stylesheets/ProductsGrid.module.css';

const ProductsGrid = () => {
    const routeParams = useParams();

    return (
        <>
            <Navbar />
            <div className={styles.optionsSelector}></div>
            <Productdisplay tag={routeParams.category} />
        </>
    )
}

export default ProductsGrid;