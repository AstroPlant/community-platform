import { useEffect } from "react";

/**
 * Hook that execute a task when a click is detected
 * outside of both reference.
 */
export function useOutsideClick(ref, triggerRef, onOutsideClick) {
  useEffect(() => {
    function handleClickOutside(event) {
      const clickOutsideOfElement =
        ref.current && !ref.current.contains(event.target);
      const clickOutsideTrigger =
        triggerRef.current && !triggerRef.current.contains(event.target);
      if (clickOutsideOfElement && clickOutsideTrigger) {
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
