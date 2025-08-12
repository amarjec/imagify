import { createContext, useEffect, useState  } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Creates the React Context object. This is what components will consume.
export const AppContext = createContext();

// The provider component that wraps the entire application or a part of it.
const AppContextProvider = (props) => {

    // State to hold the authenticated user's data.
    const [user, setUser] =useState(null);
    // State to control the visibility of the login modal.
    const [showLogin, setShowLogin] = useState(false);
    // State to hold the user's authentication token, retrieved from localStorage on initial load.
    const [token, setToken] = useState(localStorage.getItem('token'));
    // State to hold the user's remaining credit balance.
    const [credit, setCredit] = useState(0);

    // Get the backend URL from the environment variables (Vite-specific).
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Hook to programmatically navigate to different routes.
    const navigate = useNavigate();

    // Async function to fetch the user's data and credit balance from the backend.
    const loadCreditsData = async ()=>{
        try {
            // Make a GET request to the credits endpoint, passing the token in the headers.
            const {data} = await axios.get(backendUrl + '/api/user/credits', {headers : {token}});

            if (data.success) {
                // If the request is successful, update the credit and user state.
                setCredit(data.credits);
                setUser(data.user);
            }

        } catch (error) {
            // Log the error and display a toast notification to the user.
            console.error(error);
            toast.error(error.message);
        }
    };

    // Async function to handle the image generation request.
    const generateImage = async (prompt) => {
        try {
            // Make a POST request to the image generation endpoint with the user's prompt and token.
            const {data} = await axios.post(backendUrl + '/api/image/generate-image', {prompt}, {headers:{token}});

            if (data.success) {
                // On success, reload the user's credits and return the generated image URL.
                loadCreditsData();
                return data.resultImage;
            } else {
                // On failure, display an error message.
                toast.error(data.message);
                loadCreditsData();
                // If the reason for failure is zero credits, navigate to the buy credit page.
                if(data.creditBalance === 0) {
                    navigate('/buycredit');
                }
            }

        } catch (error) {
            // Catch any API call errors and display a toast.
            console.error(error);
            toast.error(error.message);
        }
    };


    // Function to log the user out by clearing the token and resetting state.
    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
        setCredit(0); // Resetting credits on logout is a good practice.
        navigate('/')
    };

    // useEffect hook to load user data when the component mounts or the token changes.
    // The dependency array '[token]' ensures this effect runs only when the token changes.
    useEffect(() => {
        if (token) {
            loadCreditsData();
        }
    },[token]);


    // The 'value' object containing all the states and functions to be shared via context.
    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditsData, logout, generateImage
    };

    // The AppContext.Provider makes the 'value' object available to all child components.
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
