import { useEffect, useState } from "react"
import { FindDataUser } from "../../../services/Account"
import { AccountSummary } from "../components/AccountSummary"

const AccountSetting = () => {

    const [dataUser, setDataUser] = useState({})

    useEffect(() => {

        const loadUser = async () => {

            const data = await FindDataUser();

            console.log(data);

            setDataUser(data);
        };

        loadUser();

    }, []);

    if (!dataUser) {
        return <p>Cargando...</p>;
    }

    return<>
        <AccountSummary user={dataUser} />
    </>
}

export default AccountSetting