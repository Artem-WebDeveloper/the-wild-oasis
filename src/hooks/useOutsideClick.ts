import { useEffect, useRef } from 'react';

function useOutsideClick(handler: () => void, listenCapturing: boolean = true) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(
    function () {
      function handleClick(e: PointerEvent) {
        if (!(e.target instanceof Node)) return;

        if (modalRef.current && !modalRef.current.contains(e.target)) {
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

  return { modalRef };
}

export default useOutsideClick;
