import { useEffect, useRef } from "react";

export function LessonBackground({ imageUrl }) {
  const imageRef = useRef(null);

  useEffect(() => {
    const handlePointerMove = (event) => {
      const image = imageRef.current;

      if (!image) {
        return;
      }

      const moveX = (event.clientX - window.innerWidth / 2) / 100;
      const moveY = (event.clientY - window.innerHeight / 2) / 100;
      image.style.transform = `scale(1.06) translate(${moveX}px, ${moveY}px)`;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div className="lesson-background" aria-hidden="true">
      <img ref={imageRef} src={imageUrl} alt="" />
      <div className="lesson-background__shade" />
    </div>
  );
}
