import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import axiosInstance from "../axiosSettings/httpSetup";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {

    const location = useLocation();
    const path = location.pathname;

    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);

    const { auth, setAuth } = useContext(AuthContext);

    const { isAuthenticated, user } = auth;

    useEffect(() => {
        const loadUser = async () => {
            setLoading(true);

            const email = localStorage.getItem('email');
            // const token = localStorage.getItem('token');

            try {
                const response = await axiosInstance
                    .get(
                        `/api/v1/Authentication/me?email=${email}`,
                        email,
                        {
                            headers: { "Content-Type": "application/json" },
                            withCredentials: true,
                        }
                    );

                if (response.data.succeeded) {
                    // const favouriteMovies = response.data.data.favoriteMovies;
                    setAuth({ isAuthenticated: true, user: response.data.data });
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                if (error.response) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("No Server Response");
                }
            } finally {
                console.log({ isAuthenticated, user });
                setLoading(false);
            }
        };


        if (!user) {
            loadUser();
        }
        else {
            setLoading(false);
        }

    }, [isAuthenticated, loading, setAuth, user]);

    if (loading) {
        return (

        <div
            className="col-12 vh-100"
            style={{
                textAlign: "center", color: "rgba(155, 81, 224, 1)", position: "relative", backgroundColor: "black"
            }}
        >
            <i className="pi pi-spin pi-spinner loader"
            // style={{ fontSize: '5rem', position: "absolute", top: "50%" }}
            >

            </i>
        </div>)
    };

    if (!loading && isAuthenticated) {
        if (path === "/subscription") {
            return children;
        }
        else if (!user.planId) {
            return <Navigate to="/subscription" />
        }
        return children;
    } else {
        return <Navigate to="/login" />
    }
}

export default ProtectedRoute;