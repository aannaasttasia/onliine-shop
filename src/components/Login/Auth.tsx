import { useState } from "react";
import Login from "./Login";
import useToken from "./UseToken";
import Register from "./Register";
import Header from "../Header/Header";

const withAuth = (WrappedComponent: any) => {
    return (props: any) => {
        const { token, setToken } = useToken();
        const [isAccount, setIsAccount] = useState<boolean>(true);

        const handleChange = () => {
            setIsAccount(!isAccount);
        };
        const handleChangeAccount = (b: boolean) => {
            setIsAccount(b);
        };

        if (!token) {
            if (isAccount) {
                return (
                    <Login setToken={setToken} setIsAccount={handleChange} />
                );
            } else {
                return (
                    <Register
                        setAccount={handleChangeAccount}
                        setIsAccount={handleChange}
                    />
                );
            }
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
