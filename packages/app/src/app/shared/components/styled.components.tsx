import styled from 'styled-components';

export const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const StyledForm = styled.form`
  max-width: 500px;
  width: 100%;
  padding: 20px 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  input {
    padding: 8px;
    margin-bottom: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    width: 100%;
  }
`;

export const ButtonEnabled = styled.button`
  background-color: #4285f4;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

export const ButtonDisabled = styled.button`
  background-color: #cccccc;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 3px;
  cursor: not-allowed;
`;
