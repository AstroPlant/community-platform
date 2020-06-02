import React, {useEffect} from "react";

/**
 * Hook that execute a task when a click is detected
 * outside of the passed ref
 */
export function useOutsideClick(ref, task) {
  useEffect(() => {
    /**
     * Calls the task function if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        task();
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
