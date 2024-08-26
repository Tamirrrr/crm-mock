import {useEffect} from 'react';
import {useStore} from "@/providers/RootStoreProvider.tsx";
import useLogout from "@/hooks/use-logout.hook.ts";
import useFetchUserInformation from "@/hooks/use-fetch-user-information.hook.ts";

const useAccessToken = () => {
    const {user} = useStore();
    const logout = useLogout(user);
    const fetchUserInformation = useFetchUserInformation(user);

    useEffect(() => {
        let isMounted: boolean = true;

        const fetchUser = async () => {
            try {
                if (isMounted) {
                    await fetchUserInformation();
                }
            } catch (error) {
                logout();
            }
        };

        fetchUser();
        const intervalId: NodeJS.Timeout = setInterval(fetchUser, 60000);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, []);
};

export default useAccessToken;
