import {observer} from "mobx-react-lite";
import {AuthFormEnum} from "../../enums/auth/auth-form.enum.ts";
import {FC, useState} from "react";
import {LoginForm} from "@/components/forms/LoginForm.tsx";
import {AuthLayout} from "@/layouts/AuthLayout.tsx";
import {RegisterForm} from "@/components/forms/RegisterForm.tsx";
import {LoginResponse, RegisterResponse} from "@/interfaces/api/auth.interface.ts";
import {User} from "@/interfaces/user.interface.ts";
import {useStore} from "@/providers/RootStoreProvider.tsx";
import {useNavigate} from "react-router-dom";
import {BaseResponse} from "@/interfaces/api/api.interface.ts";

export interface AuthProps {
    formType?: AuthFormEnum;
}

const Auth: FC<AuthProps> = observer((props: AuthProps) => {
    const [formType, setFormType] = useState<AuthFormEnum>(props.formType || AuthFormEnum.LOGIN);
    const {user} = useStore();
    const navigate = useNavigate();

    const onSignUpClick = () => {
        setFormType(AuthFormEnum.REGISTER);
    }

    const onSignInClick = () => {
        setFormType(AuthFormEnum.LOGIN);
    }

    const onSuccess = (response: BaseResponse<LoginResponse | RegisterResponse>) => {
        console.log(response);
        user.setUser(response.data.user as User);
        localStorage.setItem('accessToken', response.data.accessToken);
        navigate('/customers');
    }

    return (
        <AuthLayout>
            {formType === AuthFormEnum.LOGIN ?
                <LoginForm onSignUpClick={onSignUpClick} onSuccess={onSuccess}></LoginForm> :
                <RegisterForm onSignInClick={onSignInClick} onSuccess={onSuccess}></RegisterForm>}
        </AuthLayout>
    );
});

export default Auth;