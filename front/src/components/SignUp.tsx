import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { LoginProps } from '../types/login';
import { FiMinusCircle } from 'react-icons/fi';
import { FaRegCircleCheck, FaRegCircleXmark } from 'react-icons/fa6';
import { BsPersonCircle } from 'react-icons/bs';
import { GoMail } from 'react-icons/go';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useMutation } from 'react-query';
import { checkId, signup } from '../api/instance';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const SignUpDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 80%;
  align-items: center;

  & > p:nth-child(1) {
    margin: 0 !important;
    font-size: 1.5em;
    font-weight: 600;
    padding-bottom: 10px;
    color: #90c9ff;
  }

  & > form {
    width: 100%;

    & > .tag {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      width: 100%;
      margin-top: 20px;
      margin-bottom: 10px;
      & > .un {
        display: flex;
        flex-flow: row nowrap;
        gap: 10px;
        align-items: center;

        & > p {
          margin: 0 !important;
          font-size: 1.1em;
          font-weight: 600;
        }
      }
    }

    & > #txtBtn {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      margin-top: 25px;
      & > p {
        margin: 0 !important;
        font-weight: 600;
        cursor: pointer;
        font-size: 1.1em;

        &:hover {
          color: #90c9ff;
          //color: #aaaaaa;
        }
      }
    }
  }
`;

export const SignUp: React.FC<LoginProps> = ({ setIsSignUp }) => {
  // backend로 보낼 회원가입 데이터
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    password: '',
  });

  const [idError, setIdError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  // 비밀번호 검사, 완전한지, 똑같은지
  const [pwc, setPwc] = useState('');
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwcError, setPwcError] = useState<string | null>(null);
  // ID 중복 검사
  const [isIdDuplicate, setIsIdDuplicate] = useState<boolean>(false);

  // react-query로 post (mutation)
  const mutation = useMutation(
    (newUser: { id: string; email: string; password: string }) =>
      signup(newUser),
  );

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'id') {
      if (value.length < 3) {
        setIdError('ID는 최소 3자 이상이어야 합니다.');
      } else {
        try {
          const res = await checkId(value);
          setIsIdDuplicate(res.data.isDuplicate);
          if (res.data.isDuplicate) {
            setIdError('이미 사용 중인 ID입니다.');
          } else {
            setIdError(null);
          }
        } catch (err) {
          Swal.fire({
            icon: 'error',
            text: 'SERVER ERROR OCCURED',
          });
          setIdError('SERVER ERROR');
        }
      }
    } else if (name === 'email') {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pattern.test(value)) {
        setEmailError('Invalid E-mail');
      } else {
        setEmailError(null);
      }
    } else if (name === 'password') {
      if (value.length < 6 || !/^[a-zA-Z0-9]+$/.test(value)) {
        setPwError('Invalid Password');
      } else {
        setPwError(null);
      }
    }
  };

  const pwCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPwc(value);
    if (value !== formData.password) {
      setPwcError('Incorrect Password');
    } else {
      setPwcError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { id, email, password } = formData;
    if (!isIdDuplicate) {
      mutation.mutate(
        { id, email, password },
        {
          onSuccess: () => {
            setIsSignUp(false);
            Swal.fire({
              icon: 'success',
              titleText: 'WELCOME YACHT DICE',
              html: `반갑습니다. ${id}님\n로그인해주세요.`,
            });
          },
          onError: () => {
            Swal.fire({
              icon: 'error',
              titleText: 'ERROR',
              html: `SIGN UP FAIL\nSERVER NOW IN ERROR`,
            });
          },
        },
      );
    } else {
      Swal.fire({
        icon: 'warning',
        titleText: 'ID Duplicated',
        html: `이미 사용중인 ID 입니다.`,
      });
    }
  };

  return (
    <SignUpDiv>
      <p>SIGN UP</p>
      <form onSubmit={handleSubmit}>
        <div className="tag">
          <div className="un">
            <BsPersonCircle size={24} />
            <p>ID</p>
          </div>
          {formData.id.length === 0 ? (
            <FiMinusCircle color="#aaaaaa" size={24} />
          ) : idError ? (
            <FaRegCircleXmark color="red" size={24} />
          ) : (
            <FaRegCircleCheck color="#90ff90" size={24} />
          )}
        </div>
        <TextField
          id="outlined-basic"
          label="ID"
          variant="outlined"
          fullWidth
          name="id"
          value={formData.id}
          onChange={handleChange}
          error={!!idError}
          helperText={idError}
        />

        <div className="tag">
          <div className="un">
            <GoMail size={24} />
            <p>E-mail</p>
          </div>
          {formData.email.length === 0 ? (
            <FiMinusCircle color="#aaaaaa" size={24} />
          ) : emailError ? (
            <FaRegCircleXmark color="red" size={24} />
          ) : (
            <FaRegCircleCheck color="#90ff90" size={24} />
          )}
        </div>
        <TextField
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={!!emailError}
          helperText={emailError}
        />

        <div className="tag">
          <div className="un">
            <RiLockPasswordLine size={24} />
            <p>Password</p>
          </div>
          {formData.password.length === 0 ? (
            <FiMinusCircle color="#aaaaaa" size={24} />
          ) : pwError ? (
            <FaRegCircleXmark color="red" size={24} />
          ) : (
            <FaRegCircleCheck color="#90ff90" size={24} />
          )}
        </div>
        <TextField
          id="outlined-basic"
          label="PASSWORD (more than 6 digits including alphabetic and numbers)"
          variant="outlined"
          type="password"
          fullWidth
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={!!pwError}
          helperText={pwError}
        />

        <div className="tag">
          <div className="un">
            <RiLockPasswordLine size={24} />
            <p>Password Confirmed</p>
          </div>
          {/* 중복이면 X */}
          {pwc.length === 0 ? (
            <FiMinusCircle color="#aaaaaa" size={24} />
          ) : pwcError ? (
            <FaRegCircleXmark color="red" size={24} />
          ) : (
            <FaRegCircleCheck color="#90ff90" size={24} />
          )}
        </div>
        <TextField
          id="outlined-basic"
          label="PASSWORD Confirmed"
          variant="outlined"
          type="password"
          fullWidth
          value={pwc}
          onChange={pwCheckHandler}
          error={!!pwcError}
          helperText={pwcError}
        />
        <div id="txtBtn">
          <Button variant="text" onClick={() => setIsSignUp(false)}>
            BACK
          </Button>

          <Button variant="text" type="submit">
            ENTER
          </Button>
        </div>
      </form>
    </SignUpDiv>
  );
};
