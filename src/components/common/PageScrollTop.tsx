import { useEffect } from "react";
import { useLocation } from "react-router";

const usePageScrollTop = () => {
  const location = useLocation();
  const element = document.getElementById("topContainer");

  useEffect(() => {
    if (element) {
      element.scrollIntoView(true);
    }
  }, [location, element]);
  return null;
};

export default usePageScrollTop;
