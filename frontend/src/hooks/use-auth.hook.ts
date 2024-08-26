import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const useAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const accessToken: string | null = localStorage.getItem('accessToken');

    useEffect(() => {
        if (accessToken && location.pathname === '/') {
            navigate('/customers');
        } else {
            if (!accessToken) {
                navigate('/');
            }
        }
    }, [accessToken, navigate]);

    return accessToken;
};

export default useAuth;