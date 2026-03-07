import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/styles';

const Hero = () => {
  const heroImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    "https://media.istockphoto.com/id/2151792655/photo/smiling-young-woman-surrounded-by-boxes-while-moving-unpacking-personal-belongings.jpg?s=1024x1024&w=is&k=20&c=Vhflr-VUQePi2HcSYs5yhbkYB1bx0_uJ-wuoIEHUqVI=",
    "https://media.istockphoto.com/id/2174377463/photo/happy-couple-of-homeowners-carrying-furniture-in-their-new-living-room.jpg?s=1024x1024&w=is&k=20&c=ogL68tHu9BGBNxkEPZlgj1g1qoieZdNDg-zkqHHiEbo="
  ];

  const heroTexts = [
    {
      title: "Elevate Your Home",
      subtitle: "Discover our exclusive collection of modern and stylish home decor.",
      button: "Explore Now"
    },
    {
      title: "Make Your Space Beautiful",
      subtitle: "Handpicked furniture and decor to inspire every corner of your home.",
      button: "Shop Collections"
    },
    {
      title: "Luxury Meets Comfort",
      subtitle: "Upgrade your living space with our premium home decoration items.",
      button: "Start Shopping"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate background every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${styles.noramlFlex} relative min-h-[70vh] md:min-h-[80vh] bg-cover bg-center w-full transition-all duration-1000`}
      style={{ backgroundImage: `url(${heroImages[currentIndex]})` }}
    >
      <div className={`${styles.section} w-[90%] md:w-[60%] text-white`}>
        <h1 className="text-[25px] md:text-[55px] font-bold leading-tight drop-shadow-lg">
          {heroTexts[currentIndex].title}
        </h1>
        <p className="mt-4 text-[16px] md:text-[18px] text-white/90 drop-shadow-md">
          {heroTexts[currentIndex].subtitle}
        </p>
        <Link to={'/products'}>
          <div className={`${styles.button} mt-6 bg-teal-500 hover:bg-teal-600 text-white`}>
            {heroTexts[currentIndex].button}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Hero;