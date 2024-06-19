import { useState } from 'react';
import './NavBar.css'
import ShoppingCart from './ShoppingCart';
export default function NavBar({
    cartProducts,
    removeFromCart,
    incrementQuantity,
    decrementQuantity
}) {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

    const toggleNavMenu = () => {
        setIsNavMenuOpen(!isNavMenuOpen);
        setIsUserMenuOpen(false);
        setIsCartOpen(false);
    }

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
        setIsCartOpen(false);
        setIsNavMenuOpen(false);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
        setIsUserMenuOpen(false);
        setIsNavMenuOpen(false);
    };

    const calculateTotalPrice = () => {
        return cartProducts.reduce((total, product) => {
            const productTotal = product.price * product.quantity;
            return total + productTotal;
        }, 0).toFixed(2);
    };

    return (
        <div className="nav-bar container">
            <NavBarBrand />

            <div className="content">
                <div className="nav-top">
                    <NavMenu />
                </div>

                <div className={`nav-screen ${isNavMenuOpen ? 'open' : ''}`}>
                    <NavMenu />
                </div>                
                
                <div className="nav-buttons">
                    <NavButton
                        urlImage="./src/assets/user.png"
                        text="Konto"
                        alterText="Konto"
                        onClick={toggleUserMenu}
                    />
                    <NavButton
                        urlImage="./src/assets/shopping-cart.png"
                        text={(calculateTotalPrice() > 0 ? <h8>{calculateTotalPrice()} zł</h8> : <h8>Koszyk</h8>)}
                        alterText="Koszyk"
                        onClick={toggleCart}
                    />
                </div>

                <button className="nav-toggler" onClick={toggleNavMenu}>
                    {isNavMenuOpen ? (
                        <img
                            src="./src/assets/close.png"
                            className="nav-toggler-icon" />
                    ) : (
                        <img
                            src="./src/assets/nav-toggler.png"
                            className="nav-toggler-icon" />
                    )}                    
                </button>
            </div>

            {isUserMenuOpen && (
                <div className="popup">
                    <button className="close-button" onClick={toggleUserMenu}>
                        &#x2715;
                    </button>

                    <div className="user-menu">
                        <h4>Twoje konto</h4>

                        <div className="loggin-section">
                            <button className="loggin-button">Zaloguj się</button>

                            <div className="hr-divider">
                                <span>Nie masz konta?</span>
                            </div>
                            <button className="register-button">Załóż konto</button>
                        </div>

                        <div className="user-menu-conent">
                            
                        </div>
                    </div>
                </div>
            )}

            {isCartOpen && (
                <div className="popup">
                    <button className="close-button" onClick={toggleCart}>
                        &#x2715;
                    </button>

                    <ShoppingCart
                        cartProducts={cartProducts}
                        removeFromCart={removeFromCart}
                        incrementQuantity={incrementQuantity}
                        decrementQuantity={decrementQuantity}
                        calculateTotalPrice={calculateTotalPrice} />
                </div>
            )}
        </div>
    );
}

function NavBarBrand() {
    return <a className="navbar-brand" href="/">Green Store</a>
}

function NavMenu() {
    return (
        <nav className="nav-menu">
            <NavItem href="/" title="Główna" />
            <NavItem href="/" title="Nowości" />
            <NavItem href="/" title="O nas" />
            <NavItem href="/" title="Kontakt" />
        </nav>
    );
}

function NavItem({ href, title }) {
    return (
        <div className="nav-item">
            <a className="nav-link" href={href}>{title}</a>
        </div>
    );
}
function NavButton({ alterText, urlImage, text, onClick }) {
    return (
        <button className="nav-button" alt={alterText} onClick={onClick}>
            <span className="nav-icon" style={{ backgroundImage: `url(${urlImage})` }}></span>
            <span>{text}</span>
        </button >
    );
}
