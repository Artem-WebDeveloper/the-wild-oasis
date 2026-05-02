import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';

const StyledApp = styled.div`
  background-color: aquamarine;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Button onClick={() => alert('butt')}>DDDD</Button>

        <Button>ewfe</Button>

        <Input placeholder="ssss" type="number" />
      </StyledApp>
    </>
  );
}

export default App;
