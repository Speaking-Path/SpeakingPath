import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Banner = () => {
  return (
    <section className="banner">
      {/* <h2>Welcome to My Main Page!</h2> */}
      <Carousel>
        <Carousel.Item>
          <a href="/practice">
            <img
              className="d-block w-100"
              src={process.env.PUBLIC_URL + "/assets/main/main_bnr_1.jpg"}
              alt="Main Banner 1"
            />
          </a>
        </Carousel.Item>

        <Carousel.Item>
          <a href="/practice">
            <img
              className="d-block w-100"
              src={process.env.PUBLIC_URL + "/assets/main/main_bnr_2.jpg"}
              alt="Main Banner 2"
            />
          </a>
        </Carousel.Item>      
      </Carousel>
    </section>
  );
};

export default Banner;
