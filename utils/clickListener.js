import { useEffect } from "react";

/**
 * Hook that execute a task when a click is detected
 * outside of the passed ref
 */
export function useOutsideClick(ref, buttonRef, onOutsideClick) {
  useEffect(() => {
    /**
     * Calls the task function if clicked on outside of element
     */
    function handleClickOutside(event) {
      const clickOutsideOfElement =
        ref.current && !ref.current.contains(event.target);
      const clickOutsideButton =
        buttonRef.current && !buttonRef.current.contains(event.target);
      if (clickOutsideOfElement && clickOutsideButton) {
        onOutsideClick();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
