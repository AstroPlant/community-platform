import { useState } from "react";

/**
 * Hooks simply returning the result from a useState
 * Used to make sure useStates for modals are clear
 */
export default function useModal() {
  const [show, setShow] = useState(false);

  function toggle() {
    setShow(!show);
  }

  return {
    show,
    toggle,
  };
}
