import React, { useCallback, useEffect, useState } from 'react';

const Carousel = ({ items, interval = 10000, tips }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, [items.length]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    useEffect(() => {
        const autoSlide = setInterval(() => {
            nextSlide();
        }, interval);
        return () => clearInterval(autoSlide);
    }, [interval, nextSlide]);

    return (
        <div className="border border-[#D9A44A]/20 bg-[#0b1220] rounded-xl p-6 flex items-center gap-4 mt-8">
            <button
                onClick={prevSlide}
                className="text-[#D9A44A] hover:text-white transition text-xl flex-shrink-0"
            >
                ←
            </button>
            <div className="flex-1 text-center">
                <p className="text-[#D9A44A] text-xs uppercase tracking-widest mb-2">
                    {tips[currentIndex]}
                </p>
                <p className="text-gray-300 text-sm">
                    {items[currentIndex]}
                </p>
            </div>
            <button
                onClick={nextSlide}
                className="text-[#D9A44A] hover:text-white transition text-xl flex-shrink-0"
            >
                →
            </button>
        </div>
    );
};

export default Carousel;
