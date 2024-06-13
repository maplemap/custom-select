import {useEffect, useState} from 'react';
import {useFetchUsers} from '@/modules/users/services/api/use-fetch-users';

const prepareUserData = (data) => {
  return data.map((item) => {
    return {
      id: item.objectId,
      value: item.Name,
    };
  });
};

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const {fetchUsers} = useFetchUsers();

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers().then((data) => {
        setUsers(prepareUserData(data));
      });
    }
  }, [fetchUsers, users.length]);

  return {
    users,
  };
};
