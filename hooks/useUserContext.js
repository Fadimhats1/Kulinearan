import { userContext } from '@/contexts/userContext';
import { useContext } from 'react';

const useUserContext = () => useContext(userContext);

export { useUserContext };
