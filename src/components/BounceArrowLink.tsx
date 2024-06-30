import { MutableRefObject, forwardRef } from "react";
import { FaArrowDown } from "react-icons/fa";

const BounceArrowLink = forwardRef<HTMLDivElement, {}>(({}, ref) => {
  const handleClick = () => {
    if (!ref) {
      return;
    }
    if ((ref as MutableRefObject<HTMLDivElement>).current) {
      (ref as MutableRefObject<HTMLDivElement>).current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <FaArrowDown
      size={40}
      className="animate-bounce absolute bottom-10 fill-green-700"
      onClick={handleClick}
      role="button"
    />
  );
});

export default BounceArrowLink;
