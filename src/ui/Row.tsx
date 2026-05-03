import styled, { css } from 'styled-components';

const Row = styled.div<{ type?: 'horizontal' | 'vertical' }>`
  display: flex;

  ${({ type = 'vertical' }) =>
    type === 'horizontal' &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${({ type = 'vertical' }) =>
    type === 'vertical' &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

export default Row;
