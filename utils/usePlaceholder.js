import { useEffect, useState } from "react";

/**
 * generate a random number between 0-3
 */
function randomNumber() {
  return Math.floor(Math.random() * Math.floor(4));
}

export default function usePlaceholder(cover) {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    setNumber(randomNumber());
  }, [number]);

  if (cover) {
    return (
      <img
        src={process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL + cover.url}
        alt={cover.caption || cover.alternativeText || ""}
      />
    );
  } else {
    return <img src={`/images/placeholders/placeholder-${number + 1}.svg`} />;
  }
}
