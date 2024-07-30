import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import CAROUSEL_IMG_1 from "../../assets/image/CAROUSEL_IMG_1.jpg";
import CAROUSEL_IMG_2 from "../../assets/image/CAROUSEL_IMG_2.jpg";
import CAROUSEL_IMG_3 from "../../assets/image/CAROUSEL_IMG_3.jpg";
import CAROUSEL_IMG_4 from "../../assets/image/CAROUSEL_IMG_4.jpg";
import { useState } from "react";

const carouselList = [
  { imgUrl: CAROUSEL_IMG_1, title: "협업을 통한 효과적인 학습", description: "함께 문제를 해결해보세요!" },
  { imgUrl: CAROUSEL_IMG_2, title: "온라인 모임의 편리함", description: "어디서든 학습할 수 있는 플랫폼." },
  { imgUrl: CAROUSEL_IMG_3, title: "따로, 또 같이", description: "멤버들과 소통하며 함께 목표를 이뤄보세요!" },
  {
    imgUrl: CAROUSEL_IMG_4,
    title: "다양한 카테고리의 스터디 모임",
    description: "원하는 관심사에 해당하는 모임을 찾아보세요!",
  },
];

const MainCarousel = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);

  const handleChange = (index: number) => {
    if (currentIndex !== index + 1) {
      setCurrentIndex(index + 1);
    }
  };

  return (
    <>
      <div className="w-full h-80 md:h-[520px] mt-10">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showStatus={false}
          showThumbs={false}
          interval={6000}
          onChange={handleChange}
        >
          {carouselList.map((item, index) => (
            <div key={item.description} className="relative">
              <img src={item.imgUrl} alt={`Carousel item ${index}`} />
              <div className="carousel-description absolute w-full h-48 left-auto right-auto top-1/3 sm:top-1/4 md:bottom-1/3 mb-10 text-left lg:container px-4 md:px-10">
                <h2 className="text-2xl text-white font-bold">{item.title}</h2>
                <p className="text-white">{item.description}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default MainCarousel;
