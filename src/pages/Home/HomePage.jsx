import { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import ImageCarousel from "../../components/ImageCarousel";
import BenefitsSection from "./sections/BenefitsSection";
import PlanesSection from "./sections/PlanesSection";

const images = import.meta.glob("../../assets/carousel/*.webp", {
  eager: true,
  import: "default",
});

const carouselImages = Object.values(images);

console.log(carouselImages);

export default () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <>
      <Carousel>
        {carouselImages.map((img, i) => (
          <Carousel.Item key={i} className="carousel-img-wrapper">
            <ImageCarousel img={img} alt={i} />
          </Carousel.Item>
        ))}
      </Carousel>
      <BenefitsSection />
      <PlanesSection />
    </>
  );
};
