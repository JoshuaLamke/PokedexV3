import { useState, useEffect } from "react";
import mobileCoolBg from "../assets/mobile_cool_bg.png";
import desktopCoolBg from "../assets/cool-bg.png";

const ResponsiveImage = () => {
  const [imageSrc, setImageSrc] = useState(mobileCoolBg);

  useEffect(() => {
    const updateImageSrc = () => {
      if (window.innerHeight / window.innerWidth < 1.3) {
        setImageSrc(desktopCoolBg);
      } else {
        setImageSrc(mobileCoolBg);
      }
    };

    updateImageSrc(); // Initial check
    window.addEventListener("resize", updateImageSrc); // Add event listener for resize

    return () => {
      window.removeEventListener("resize", updateImageSrc); // Cleanup event listener
    };
  }, []);

  return (
    <img
      src={imageSrc}
      className="h-1/2 w-auto sm:h-auto sm:w-5/6"
      alt="Responsive Background"
    />
  );
};

export default ResponsiveImage;
