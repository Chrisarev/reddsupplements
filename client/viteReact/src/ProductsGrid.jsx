
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import styles from './stylesheets/ProductsGrid.module.css';
import Productdisplay from './Productdisplay';

const ProductsGrid = () => {
    const routeParams = useParams();
    console.log(routeParams.category);

    return (
        <>
            <Navbar />
            <div className={styles.optionsSelector}></div>
            <Productdisplay tag={routeParams.category} />
        </>
    )
}

export default ProductsGrid;