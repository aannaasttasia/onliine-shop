import Account from "@/components/Account/Account";
import { Provider } from "jotai";
import ProfileLayout from "./layout";

function ProfilePage() {
    return (
        <Provider>
            <ProfileLayout>
                <Account/>
            </ProfileLayout>
        </Provider>
    );
}

export default ProfilePage;
