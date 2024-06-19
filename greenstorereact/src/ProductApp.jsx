import { useState } from 'react'
import './ProductApp.css'

export default function ProductApp({
    products,
    categories,
    cartProducts,
    addToCart,
    removeFromCart
}) {
    const [filterText, setFilterText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <div className="product-app">
            <div className="search-bar-container">
                <SearchBar
                    filterText={filterText}
                    onFilterTextChange={setFilterText}
                />
            </div>
            <div className="filterable-product-grid">
                <ProductCategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectedCategoryChange={setSelectedCategory}
                />
                <ProductGrid
                    products={products}
                    filterText={filterText}
                    selectedCategory={selectedCategory}
                    cartProducts={cartProducts}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            </div>
        </div>
    );
}

function SearchBar({ filterText, onFilterTextChange }) {
    return (
        <form className="search-bar">
            <input
                type="text"
                value={filterText}
                placeholder="Wyszukaj produkt..."
                onChange={(e) => onFilterTextChange(e.target.value)}
                className="search-input" />

            <button
                className="clear-button"
                onClick={(e) => {
                    e.preventDefault();
                    onFilterTextChange('');
                }}  >
                &#x2715;
            </button>
        </form>
    );
}

function ProductCategoryFilter({
    categories,
    selectedCategory,
    onSelectedCategoryChange
}) {
    return (
        <div className="category-filter">
            <h5>Kategorie</h5>
            {categories.map((category, index) => (
                <ProductCategory
                    key={index}
                    icon={category.icon}
                    name={category.name}
                    selectedCategory={selectedCategory}
                    onSelectedCategoryChange={onSelectedCategoryChange} />
            ))}
        </div>
    );
}

function ProductCategory({
    icon,
    name,
    selectedCategory,
    onSelectedCategoryChange
}) {
    const isSelected = selectedCategory === name;

    return (
        <button
            className={`product-category ${isSelected ? 'selected' : ''}`}
            onClick={(e) => {
                e.preventDefault();
                if (isSelected) {
                    onSelectedCategoryChange(null);
                }
                else {
                    onSelectedCategoryChange(name);
                }
            }} >
            <img
                src={isSelected ? icon.replace('.png', '-selected.png') : icon}
                className="category-icon" />
            {name}
        </button>
    );
}

function ProductGrid({
    products,
    filterText,
    selectedCategory,
    cartProducts,
    addToCart,
    removeFromCart
}) {

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(filterText.toLowerCase()) &&
        (product.category === selectedCategory || selectedCategory === null)
    );

    const productCards = filteredProducts.map((product, index) => (
        <ProductCard
            key={index}
            product={product}
            cartProducts={cartProducts}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
        />
    ));    

    return (
        <div className="named-product-grid">
            <h3 style={{ margin: '10px' }}>{selectedCategory === null ? "Wszystkie produkty" : selectedCategory}</h3>
            <div className="product-grid">
                {productCards}
            </div>
        </div>        
    );
}

function ProductCard({
    product,
    addToCart,
    cartProducts,
    removeFromCart,
}) {
    const inCart = cartProducts.find(p => p.name === product.name);

    return (
        <div className="product-card">
            <div className="product-content">
                <div className="product-image" style={{ backgroundImage: `url(${product.img})` }} />
                <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-unit">{product.unit}</div>
                    <div className="wrapper">
                        <div className="product-rating">
                            <StarRating rating={product.rating} />
                        </div>
                        <div className="product-price">{(product.price).toFixed(2)} PLN</div>
                    </div>
                </div>
            </div>            
            
            {inCart ? (
                <div className="quantity-controller">
                    <button className="add-to-cart-button" onClick={() => addToCart(product)}>
                        Dodaj
                    </button>
                    <button className="remove-from-cart-button" onClick={() => removeFromCart(product)}>
                        &#x2715;
                    </button>
                </div>                
            ) : (
                <button className = "add-to-cart-button" onClick = { () => addToCart(product) }>
                    Dodaj do koszyka
                </button>
            )}                    
        </div>
    );
}

function StarRating ({ rating }) {
    const maxRating = 5;
    const filledStar = './src/assets/star(1).png';
    const emptyStar = './src/assets/star.png';

    const stars = Array.from({ length: maxRating }, (_, index) => {
        const starSrc = index < rating ? filledStar : emptyStar;
        return <img key={index} src={starSrc} />
    });

    return <>{stars}</>;
}