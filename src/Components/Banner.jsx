import { useState } from "react";


const Banner = () => {
    const [slides, setSlides] = useState([]);


  return (


    <div className="slider-container">
      {slides.length > 0 ? (
        <div className="carousel">
          {slides.map((slide) => (
            <div key={slide._id} className="carousel-item">
              <img
                src={slide.image}
                alt={slide.medicineName}
                className="w-full"
              />
              <h3 className="text-center">{slide.medicineName}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>No advertisements on the slider currently.</p>
      )}
    </div>
  );
};

export default Banner;
