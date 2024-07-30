import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { LoginProps } from '../types/login';
import Button from '@mui/material/Button';
import { login } from '../api/instance';
import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { authState } from '../atoms/authAtom';

const LoginDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  width: 80%;
  align-items: center;

  & > p:nth-child(1) {
    margin: 0 !important;
    font-size: 1.5em;
    font-weight: 600;
    padding-bottom: 15px;
    color: #90c9ff;
  }

  & > form {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    gap: 20px;
    align-items: center;
    & > #txtBtn {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      & > p {
        margin: 0 !important;
        font-weight: 600;
        cursor: pointer;
        font-size: 1.1em;

        &:hover {
          color: #90c9ff;
        }
      }
    }
  }
`;

export const Login: React.FC<LoginProps> = ({ setIsSignUp }) => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });
  const setAuthState = useSetRecoilState(authState);
  const navigate = useNavigate();

  const mutation = useMutation((user: { id: string; password: string }) =>
    login(user),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { id, password } = formData;
    mutation.mutate(
      { id, password },
      {
        onSuccess: (data) => {
          const token = data.data.access_token;
          localStorage.setItem('token', token);
          setAuthState({ isLogin: true });
          alert(`WELCOME ${id}`);
          navigate('/');
        },
        onError: () => {
          alert('LOGIN FAIL');
        },
      },
    );
  };

  return (
    <LoginDiv>
      <p>WELCOME!</p>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="ID"
          variant="outlined"
          fullWidth
          name="id"
          onChange={handleChange}
          value={formData.id}
        />
        <TextField
          id="outlined-basic"
          label="PASSWORD"
          variant="outlined"
          type="password"
          fullWidth
          name="password"
          onChange={handleChange}
          value={formData.password}
        />

        <div id="txtBtn">
          <Button variant="text" onClick={() => setIsSignUp(true)}>
            SIGN UP
          </Button>
          <Button variant="text" type="submit">
            LOGIN
          </Button>
        </div>
      </form>
    </LoginDiv>
  );
};
