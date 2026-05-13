import { createPortal } from 'react-dom';
import type React from 'react';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';
import { cloneElement, createContext, useCallback, useContext, useState } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

type ModalWindowName = 'cabin-form' | 'edit' | 'delete';
type ModalTypeContext = {
  openName: ModalWindowName | '';
  close: () => void;
  open: React.Dispatch<React.SetStateAction<ModalWindowName | ''>>;
};

// 1. Создаем Контекст
const ModalContext = createContext<ModalTypeContext | null>(null);

// 2. Создаем родителя
// Compound Component ГЛАВНЫЙ
function Modal({ children }: { children: React.ReactNode }) {
  const [openName, setOpenName] = useState<ModalWindowName | ''>('');

  const close = useCallback(() => setOpenName(''), []);
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ close, open, openName }}>{children}</ModalContext.Provider>
  );
}

function useModal() {
  const context = useContext(ModalContext);

  if (!context) throw new Error('useModal must be used within <Modal>');
  return context;
}

// 3. Создаем дочерние компоненты, которые помогут реализовать задачу

type OpenType = {
  children: React.ReactElement;
  opens: ModalWindowName;
};

function Open({ children, opens: opensWindowName }: OpenType) {
  const { open } = useModal();

  return cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
    onClick: () => open(opensWindowName),
  });
}

type WindowType = {
  children: React.ReactElement;
  name: ModalWindowName;
};

function Window({ children, name }: WindowType) {
  const { openName, close } = useModal();

  // Закрытие по клику вне окна
  const { modalRef } = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={modalRef}>
        <Button onClick={close}>
          <HiXMark />
        </Button>

        <div>
          {cloneElement(children as React.ReactElement<{ onCloseModal?: () => void }>, {
            onCloseModal: close,
          })}
        </div>
      </StyledModal>
    </Overlay>,
    document.body,
  );
}

// 4. Добавляем дочерние комопоненты в качестве свойств родителя
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
