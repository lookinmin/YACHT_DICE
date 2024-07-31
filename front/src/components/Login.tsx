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
import { userState } from '../atoms/userInfo';

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
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });
  // 로그인 버튼 클릭 시, BE로 보낼 user 데이터

  const setAuthState = useSetRecoilState(authState);
  const setUserState = useSetRecoilState(userState);
  // 로그인 유지시킬 recoil value

  const mutation = useMutation((user: { id: string; password: string }) =>
    login(user),
  );
  // login() method를 통해 `/login`으로 user data post

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // 현재 입력되는 값들을 user data로 setting

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { id, password } = formData;
    mutation.mutate(
      // post
      { id, password },
      {
        onSuccess: (data) => {
          // post return success -> return value
          const { token, userId, friends } = data.data;
          // BE는 로그인을 성공한 유저에게 토큰을 부여한다.
          localStorage.setItem('token', token);
          // localStorage를 통해 유저의 토큰을 저장한다.
          setAuthState({ isLogin: true });
          setUserState({ id: userId, friends });
          // recoil의 로그인 값을 true로 변경
          alert(`WELCOME ${userId}`);
          navigate('/');
          // 로그인 성공 -> 메인화면으로 이동
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
