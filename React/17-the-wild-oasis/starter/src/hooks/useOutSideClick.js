import { useRef, useEffect } from "react";

const useOutSideClick = (handler, listenCapturing = true) => {
  // console.log("Click closing....")
  const ref = useRef();
  // handler close modal when click on overlay
  useEffect(() => {
    const handlerClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handler();
    };
    // Prevent bubbling phase => true
    document.addEventListener("click", handlerClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handlerClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
};

export default useOutSideClick;
