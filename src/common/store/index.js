import React, {
    createContext,
    useContext,
    useState,
} from 'react';


export const GlobalContext = createContext({});

export function useGlobals() {
    return useContext(GlobalContext);
}

export default function GlobalProvider({children}) {
    const baseUrl = "/api/v1"
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [authHeader, setAuthHeader] = useState('');
    const [loginResponse, setLoginResponse] = useState({});
    const updateIsLoggedIn = (value) => setIsLoggedIn(value);

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function toggleModal() {
        setIsOpen(!modalIsOpen);
    }

    const callLogin = async (email, password) => {
        console.log(email, password)
        const authParams = window.btoa(`${email}:${password}`)
        setAuthHeader(authParams);
        try {
            const response = await fetch(`${baseUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "accept": "application/json;charset=UTF-8",
                    "Authorization": `Basic ${authParams}`
                }
            });
            const json = await response.json();
            console.log("in resp")
            if (response.ok) {
                console.log("in resp")
                window.sessionStorage.setItem('user-details', JSON.stringify(json));
                window.sessionStorage.setItem('access-token', response.headers.get('access-token'));
                setLoginResponse(json);
                updateIsLoggedIn(true);
                toggleModal();
            } else {
                const error = new Error();
                error.message = json.message || 'Something went wrong!'
            }
        } catch (e) {
            alert(`Error ${e.message}`)
        }

    }

    const callSignUp = async (values) => {
        const data = {
            email_address: values.email,
            first_name: values.firstName,
            last_name: values.lastName,
            mobile_number: values.contactNumber,
            password: values.password
        }
        try {
            const response = await fetch(`${baseUrl}/signup`, {
                method: "POST",
                headers: {
                    "Accept": "application/json;charset=UTF-8",
                    "Content-Type": "application/json;charset=UTF-8"
                },
                body: JSON.stringify(data)
            });
            const json = await response.json();
            if (response.ok) {
                setIsRegistered(true);
            } else {
                const error = new Error();
                error.message = json.message || 'Something went wrong!'
            }
        } catch (e) {
            alert(`Error ${e.message}`)
        }


    }

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            updateIsLoggedIn,
            authHeader,
            callLogin,
            loginResponse,
            toggleModal,
            modalIsOpen,
            isRegistered,
            callSignUp,
            baseUrl
        }}>
            {children}
        </GlobalContext.Provider>
    );
}