import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import NavBar from './NavBar.jsx'
import Carousel from './Carousel.jsx'
import ProductApp from './ProductApp.jsx'
import { slides } from './data/carouselData.json'
import { products, categories } from './data/productData.json'


function App() {
    const [cartProducts, setCartProducts] = useState([]);

    const addToCart = (product) => {
        const exitingProductIndex = cartProducts.findIndex(p => p.name === product.name);
        if (exitingProductIndex >= 0) {
            const newCartProducts = [...cartProducts];
            newCartProducts[exitingProductIndex].quantity += 1;
            setCartProducts(newCartProducts);
        } else {
            setCartProducts([...cartProducts, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (product) => {
        const exitingProductIndex = cartProducts.findIndex(p => p.name === product.name);
        const newCartProducts = [...cartProducts];
        newCartProducts.splice(exitingProductIndex, 1);
        setCartProducts(newCartProducts);
    }

    const incrementQuantity = (product) => {
        const exitingProductIndex = cartProducts.findIndex(p => p.name === product.name);
        const newCartProducts = [...cartProducts];
        newCartProducts[exitingProductIndex].quantity += 1;
        setCartProducts(newCartProducts);
    }

    const decrementQuantity = (product) => {
        const exitingProductIndex = cartProducts.findIndex(p => p.name === product.name);
        const newCartProducts = [...cartProducts];
        if (newCartProducts[exitingProductIndex].quantity > 1) {
            newCartProducts[exitingProductIndex].quantity -= 1;
            setCartProducts(newCartProducts);
        }
    }

    return (
        <>
            <header className="sticky-header container-fluid">
                <NavBar
                    cartProducts={cartProducts}
                    removeFromCart={removeFromCart}
                    incrementQuantity={incrementQuantity}
                    decrementQuantity={decrementQuantity}
                />
            </header>

            <main>
                <div className="section container">
                    <Carousel data={slides} />
                </div>

                <div className="section container">
                    <ProductApp
                        products={products}
                        categories={categories}
                        cartProducts={cartProducts}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}                     
                    />
                </div>
            </main>

            <footer className="footer container-fluid">
                <div className="footer-content container">
                    <nav className="footer-section navigation">
                        <h3>Nawigacja</h3>
                        <ul>
                            <li><a href="/">Główna</a></li>
                            <li><a href="/">Nowości</a></li>
                            <li><a href="/">O nas</a></li>
                            <li><a href="/">Kontakt</a></li>
                        </ul>
                    </nav>

                    <div className="footer-section useful-links">
                        <h3>Linki</h3>
                        <a href="/">Polityka prywatności</a>
                        <a href="/">Warunki użytkowania</a>
                        <a href="/">Reklamacje</a>
                        <a href="/">Dostawa i płatność</a>
                        <a href="/">Często zadawane pytania</a>
                    </div>

                    <div className="footer-section contact-info">
                        <h3>Kontakt</h3>
                        <p><strong>Adres:</strong> ul. Nowomiejska 22, Lublin 20-615</p>
                        <p><strong>Tel.:</strong> +48 883 701 987</p>
                        <p><strong>Email:</strong> support@greenstore.pl</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default App
