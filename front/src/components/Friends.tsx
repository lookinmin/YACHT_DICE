import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { PiUsersThreeDuotone } from 'react-icons/pi';
import { InputAdornment } from '@mui/material';
import { FaRegCircleUser } from 'react-icons/fa6';
import { BsSearchHeart } from 'react-icons/bs';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider } from '@mui/material/styles';
import { tfTheme2 } from '../styles/theme';
import { userState } from '../atoms/userInfo';
import { useRecoilValue } from 'recoil';
import { getFriends, searchUser } from '../api/instance';
import { useQuery, useMutation } from 'react-query';
import { Suspense } from 'react';
import Swal from 'sweetalert2';

const StyledDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 3vh;
  background-color: #3f4b48;
  width: 100%;
  padding: 6vh 0 3vh 0;

  & > .top {
    display: flex;
    width: 80%;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    & > .mark {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      gap: 15px;
      align-items: center;

      & > p {
        margin: 0 !important;
        font-size: 1.2em;
        font-weight: 600;
      }
    }
  }

  & > #search {
    width: 80%;
    display: grid;
    grid-template-columns: 9.5fr 0.5fr;
    column-gap: 20px;
    position: center;
  }
`;

const LazyFriendItem = React.lazy(() => import('./FriendItem'));

export const Friends: React.FC = () => {
  const [formData, setFormData] = useState({
    id: '',
  });
  const [searchList, setSearchList] = useState<string[]>([]);

  const userInfo = useRecoilValue(userState);
  const userId = userInfo.id as string;

  const { data, error, isLoading } = useQuery(['friends', userId], () =>
    getFriends(userId),
  );

  const mutation = useMutation((id: string) => searchUser(id), {
    onSuccess: (data: { users: string[] }) => {
      setSearchList(data.users);
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        text: 'No User Found',
      });
      setSearchList([]);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ id: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData.id);
  };

  if (isLoading) return <p>isLoading...</p>;
  if (error) return <p>Error Occured!</p>;

  const friendList = data?.data.friends || [];
  // console.log(friendList);
  console.log(searchList);

  return (
    <ThemeProvider theme={tfTheme2}>
      <StyledDiv>
        <div className="top">
          <div className="mark">
            <PiUsersThreeDuotone size={33} color="skyblue" />
            <p>Friends List</p>
          </div>
        </div>

        <form id="search" onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="User ID"
            variant="outlined"
            name="searchField"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaRegCircleUser size={25} color="#8ccfcf" />
                </InputAdornment>
              ),
              placeholder: 'ENTER ID',
            }}
            onChange={handleChange}
            value={formData.id}
          />
          <IconButton color="primary" type="submit">
            <BsSearchHeart size={35} />
          </IconButton>
        </form>
        <Suspense fallback={<p>is Loading...</p>}>
          {searchList.map((id: string) => {
            if (id === userId) return null; // id가 userId와 같다면 컴포넌트를 렌더링하지 않음

            const isFriend = friendList.includes(id);
            return <LazyFriendItem key={id} id={id} isFriend={isFriend} />;
          })}
        </Suspense>

        <hr
          style={{ border: '1px dotted #929292', width: '79%', margin: '0' }}
        />

        <Suspense fallback={<p>is Loading...</p>}>
          {friendList.map((id: string) => (
            <LazyFriendItem key={id} id={id} isFriend={true} />
          ))}
        </Suspense>
      </StyledDiv>
    </ThemeProvider>
  );
};
