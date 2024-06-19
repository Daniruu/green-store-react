import { useState } from 'react'
import './Carousel.css'
import { useSwipeable } from '../../node_modules/react-swipeable/es/index';


export default function Carousel({ data }) {
    const [activeIndex, setAciveIndex] = useState(0);

    const nextSlide = () => {
        setAciveIndex((prevIndex) => prevIndex === data.length - 1 ? 0 : prevIndex + 1);
    };

    const prevSlide = () => {
        setAciveIndex((prevIndex) => prevIndex === 0 ? data.length - 1 : prevIndex - 1);
    };

    const handlers = useSwipeable({
        onSwipedLeft: nextSlide,
        onSwipedRight: prevSlide,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    return (
        <div className="carousel" {...handlers}>
            <button className="carousel-button carousel-button-prev" onClick={prevSlide}>
                <img src="./src/assets/arrow-left.png" />
            </button>
            
            <div className="carousel-images">
                {data.map((item, index) => {
                    return <img src={item.src}
                        alt={item.alt}
                        key={index}
                        className={index === activeIndex ? "slide" : "slide slide-hidden"}
                    />
                })}
            </div>

            <button className="carousel-button carousel-button-next" onClick={nextSlide}>
                <img src="./src/assets/arrow-right.png" />
            </button>

            <span className="indicators">
                {data.map((_, index) => {
                    return <button
                        key={index}
                        onClick={() => setAciveIndex(index)}
                        className={index === activeIndex ? "indicator" : "indicator indicator-inactive" } />
                })}
            </span>
        </div>
    );
}