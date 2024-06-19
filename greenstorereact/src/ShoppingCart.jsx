import './ShoppingCart.css';

export default function ShoppingCart({
    cartProducts,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    calculateTotalPrice
}) {

    return (
        <div className="shopping-cart">
            <h4>Twój koszyk</h4>
            {cartProducts.length === 0 ? (
                <p>Koszyk jest pusty :(</p>
            ) : (
                <>
                    <div className="cart-content">
                        <ul>
                            {cartProducts.map((product, index) => (
                                <li key={index}>
                                    <img src={product.img} className="product-img" />
                                    <div className="cart-product-info">
                                        <h4>{product.name}</h4>
                                        <p>{product.unit} x {product.quantity}</p>
                                        <h3 className="price">{(product.price * product.quantity).toFixed(2)} PLN</h3>
                                    </div>
                                    <div className="quantity-changer">
                                        <button className="quantity-button" onClick={() => incrementQuantity(product)}>
                                            <img src="./src/assets/up.png" className="quantity-icon" />
                                        </button>

                                        <button className="quantity-button" onClick={() => decrementQuantity(product)}>
                                            <img src="./src/assets/down.png" className="quantity-icon" />
                                        </button>
                                    </div>
                                    <button className="remove-button" onClick={() => removeFromCart(product)}>
                                        <img src="./src/assets/bin.png" className="bin-icon" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>            
                </>                    
            )}

            <div className="checkout-section">
                <div className="total-price">
                    <h3>{calculateTotalPrice()} PLN</h3>
                </div>
                <button className="checkout-button">Przejdź do zamówienia</button>
            </div>  
        </div>
    );
}