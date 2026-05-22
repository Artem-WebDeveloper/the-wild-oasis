import { useEffect, useRef } from 'react';

function useOutsideClick<T extends HTMLElement>(
  handler: () => void,
  listenCapturing: boolean = true,
) {
  const ref = useRef<T | null>(null);

  useEffect(
    function () {
      function handleClick(e: PointerEvent) {
        if (!(e.target instanceof Node)) return;

        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      // Добавляем слушатель
      document.addEventListener('click', handleClick, listenCapturing);

      // Очищаем слушатель
      return () => document.removeEventListener('click', handleClick, listenCapturing);
    },
    [handler, listenCapturing],
  );

  return { ref };
}

export default useOutsideClick;
