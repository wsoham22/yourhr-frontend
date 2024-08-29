import { useAuth } from '../context/AuthContext';

export const useAuthCheck = () => {
    const { user } = useAuth();
    return user !== null;
};
