import {UserStore} from "@/stores/UserStore.ts";
import {UserInformationResponse} from "@/interfaces/api/auth.interface.ts";
import authClient from "@/api/auth.client.ts";
import {BaseResponse} from "@/interfaces/api/api.interface.ts";

const useFetchUserInformation = (userState: UserStore) => {
    return async () => {
        if (!localStorage.getItem('accessToken')) {
            throw new Error('Access token not found');
        }
        const userInformation: BaseResponse<UserInformationResponse> = await authClient.information();
        if (!userInformation.data.user) {
            throw new Error('User not found');
        }
        userState.setUser(userInformation.data.user);
    }
}

export default useFetchUserInformation;