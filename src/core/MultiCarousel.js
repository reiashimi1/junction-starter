import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    // slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const MultiCarousel = ({
  infinite = true,
  breakPoints = responsive,
  showDots = false,
  centerMode = true,
  rightToLeft = false,
  children,
}) => {
  return (
    <Carousel
      centerMode={centerMode}
      // partialVisbile
      swipeable={true}
      draggable={false}
      focusOnSelect
      showDots={showDots}
      responsive={breakPoints}
      ssr={true} // means to render carousel on server-side.
      infinite={infinite}
      autoPlay
      autoPlaySpeed={10000}
      // keyBoardControl={true}
      customTransition="all .5"
      rewindWithAnimation
      transitionDuration={500}
      containerClass="carousel-container"
      // removeArrowOnDeviceType={["mobile"]}
      deviceType="desktop"
      dotListClass="custom-dot-list-style"
      rtl={rightToLeft}
      itemClass={`carousel-item-padding-40-px ${showDots ? "mb-8" : "my-4"}`}
    >
      {children}
    </Carousel>
  );
};

export default MultiCarousel;
