import {useCallback, useEffect, useState} from 'react';

export const useFetchStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    return () => {
      setError(false);
      setLoading(false);
    };
  }, []);

  return {
    isLoading: loading,
    isFailed: error,
    setLoadingStatus: setLoading,
    setFailStatus: useCallback(() => setError(true), []),
  };
};
