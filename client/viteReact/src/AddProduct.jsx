import { useEffect, useState } from "react"
import styles from './stylesheets/AddProduct.module.css'
import axios from "axios";

const AddProduct = () => {
    const [productTitle, setProductTitle] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productPrevPrice, setProductPrevPrice] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productImage, setProductImage] = useState('')

    const handleProductSubmit = (e) => {
        e.preventDefault();
        const FD = new FormData();
        FD.append('productTitle', productTitle)
        FD.append('productPrice', productPrice)
        FD.append('productPrevPrice', productPrevPrice)
        FD.append('productDesc', productDesc)
        FD.append('productCategory', productCategory)
        FD.append('productImage', productImage)
        axios.post('/addProduct', FD).then((response) => {
            console.log(response.status)
            setProductTitle('')
            setProductCategory('')
            setProductDesc('')
            setProductPrevPrice('')
            setProductPrice('')
            setProductImage('')
            return response;
        })
    }

    return (
        <>
            <form className={styles.prodForm} onSubmit={handleProductSubmit}>
                <label htmlFor="productTitle">Product Title</label>
                <input type="text" name="productTitle" value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                />
                <label htmlFor="productPrice">Product Price</label>
                <input type="text" name="productPrice" value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                />
                <label htmlFor="productPrevPrice">Product Prev Price</label>
                <input type="text" name="productPrevPrice" value={productPrevPrice}
                    onChange={(e) => setProductPrevPrice(e.target.value)}
                />
                <label htmlFor="productDesc">Product Desc</label>
                <textarea name="productDesc" id=""
                    cols="30" rows="10" value={productDesc}
                    onChange={(e) => setProductDesc(e.target.value)}
                ></textarea>
                <label htmlFor="productCategory">Product Category</label>
                <input type="text" name="productCategory" value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                />
                <label htmlFor="productImage">Product Image</label>
                <input type="file" name={productImage} value={productImage}
                    onChange={(e) => setProductImage(e.target.file)}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default AddProduct;