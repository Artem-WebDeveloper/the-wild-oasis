import React, { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import useOutsideClick from '../hooks/useOutsideClick';

type PositionElement = {
  x: number;
  y: number;
};

type MenuContextType = {
  openId: number | null;
  open: React.Dispatch<React.SetStateAction<number | null>>;
  close: () => void;
  position: PositionElement | null;
  setPosition: React.Dispatch<React.SetStateAction<PositionElement | null>>;
};

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{ position: PositionElement }>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${({ position }) => position.x}px;
  top: ${({ position }) => position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext<MenuContextType | null>(null);

function useMenu() {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within <Menus>');
  return context;
}

function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [position, setPosition] = useState<PositionElement | null>(null);

  const close = () => setOpenId(null);
  const open = setOpenId;

  return (
    <MenuContext.Provider value={{ openId, open, close, position, setPosition }}>
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({ id }: { id: number }) {
  const { open, close, openId, setPosition } = useMenu();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect) return;

    setPosition({
      x: window.innerWidth - rect.width - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    if (openId === null || openId !== id) {
      open(id);
      return;
    }
    close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ id, children }: { id: number; children: React.ReactNode }) {
  const { openId, position, close } = useMenu();
  const { ref } = useOutsideClick<HTMLUListElement>(close, false);

  useEffect(
    function () {
      window.addEventListener('scroll', close, true);
      return () => window.removeEventListener('scroll', close, true);
    },
    [close],
  );

  if (openId !== id || !position) return null;

  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body,
  );
}

type ButtonProps = {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
};

function Button({ children, icon, onClick }: ButtonProps) {
  const { close } = useMenu();
  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
