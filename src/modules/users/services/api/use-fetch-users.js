import {useCallback} from 'react';
import {useFetchStatus} from '@/hooks/use-fetch-status';

export const useFetchUsers = () => {
  const {isFailed, setFailStatus, isLoading, setLoadingStatus} =
    useFetchStatus();

  const fetchUsers = useCallback(async () => {
    if (!isFailed) {
      setLoadingStatus(true);

      try {
        const where = encodeURIComponent(
          JSON.stringify({
            Name: {
              $exists: true,
            },
          }),
        );
        const response = await fetch(
          `https://parseapi.back4app.com/classes/NamesList?limit=100000&keys=Name&where=${where}`,
          {
            headers: {
              'X-Parse-Application-Id':
                'zsSkPsDYTc2hmphLjjs9hz2Q3EXmnSxUyXnouj1I', // This is the fake app's application id
              'X-Parse-Master-Key': '4LuCXgPPXXO2sU5cXm6WwpwzaKyZpo3Wpj4G4xXK', // This is the fake app's readonly master key
            },
          },
        );

        const {results} = await response.json();
        return results;
      } catch (error) {
        setFailStatus();
      } finally {
        setLoadingStatus(false);
      }
    }
  }, [isFailed, setFailStatus, setLoadingStatus]);

  return {
    fetchUsers,
    isFailed,
    loading: isLoading,
  };
};
