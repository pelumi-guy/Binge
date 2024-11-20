import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from '../../src/context/AuthProvider';

import "../assets/styles/subscriptionplans.css";
import svg1 from "../assets/images/subscription/square-check-solid.png";
import svg2 from "../assets/images/subscription/Indigo.png";
import svg3 from "../assets/images/subscription/red.png";
import { getPlans } from "../network/lib/product/subscription-integration";
import { toast } from "react-toastify";

const chooseCheckbox = (index) => {
    if (index === 0) {
        return svg1;
    } else if (index === 1) {
        return svg2;
    } else {
        return svg3;
    }
}

const SubscriptionPlans = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [responseFromBackend, SetResponseFromBackend] = useState([]);
    const [planId, setPlanId] = useState("");
    const { auth } = useContext(AuthContext);

    function setPlanIdToLocalStorage(planId) {
        localStorage.setItem('planId', planId);
    }

    //Won't be using the Auth context because it doesn't persist data on reload
    function setPlanToAuthContext(planId) {
        auth.user.planId = planId;
    }

    function getPlanIdFromLocalStorage() {
        const item = localStorage.getItem('planId');
        return item;
    }

    useEffect(() => {
        setLoading(true);

        getPlans()
            .then((response) => {
                SetResponseFromBackend(response.data.data);

                setPlanIdToLocalStorage(planId);

                //setPlanToAuthContext(planId)
                //console.log(`Plan from auth Id equals ${authItem}`);
                //const authItem = auth.user.planId;

                const item = getPlanIdFromLocalStorage();

                console.log(`Plan Id equals ${item}`);

                if (item) {
                    navigate("/paymentoption");
                }

            })
            .catch((err) => toast.error(err.message))
            .finally(() => {
                setLoading(false);
            });

    }, [planId]);

    return (
        <>
            <div className="illusion"></div>

            <div className="main">
                {loading ?
                    (<div
                        className="col-md-12"
                        style={{
                            textAlign: "center", color: "rgba(155, 81, 224, 1)", position: "relative"
                        }}
                    >
                        <i className="pi pi-spin pi-spinner loader"
                        // style={{ fontSize: '5rem', position: "absolute", top: "50%" }}
                        >

                        </i>
                    </div>) :
                    (
                        <>
                            <div className="main-head">
                                <h1>Choose Your Plan</h1>
                            </div>

                            <div className="main-content">

                                {responseFromBackend.map((sub, index) => {
                                    return (
                                        <div className={`${index === 0 ? 'main-1' : ''} ${index === 1 ? 'main-2' : ''} ${index === 2 ? 'main-3' : ''}`}
                                        key={index}>
                                            <h6
                                                className={`${index === 0 ? 'top-1' : ''} ${index === 1 ? 'top-2' : ''} ${index === 2 ? 'top-3' : ''}`}
                                            >
                                                {`${index === 1 ? 'Most Popular' : ''} ${index === 2 ? 'Best Deal' : ''}`}
                                            </h6>
                                            <div className="sub-container">

                                                <div className="first-layer" key={index}>
                                                    <div className="title-2">
                                                        <p
                                                            className={`${index === 0 ? 'sub-main-1' : ''} ${index === 1 ? 'sub-main-2' : ''} ${index === 2 ? 'sub-main-3' : ''}`}
                                                        > {sub.name} </p>
                                                    </div>
                                                    <div className="money-2">
                                                        <p>₦ <span> {sub.cost} </span>/month</p>
                                                    </div>


                                                    <div className={`trial ${sub.name}-trial`}>
                                                        <button onClick={() => setPlanId(sub.id)}> Free 7-days Trial </button>
                                                    </div>

                                                    <div className={`features-1-2 ${sub.name}-feature`}>
                                                        <p>Core Features</p>
                                                        <div className="profile-2">
                                                            {sub.features.map((feat, idx) => {
                                                                return (
                                                                    <div className="p1 align-content-center" key={idx}>
                                                                        <img src={
                                                                            chooseCheckbox(index)
                                                                        }
                                                                            alt="orange" />
                                                                        {/* <input type="checkbox" /> */}
                                                                        <span> {feat.name} </span>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    )
                                }
                                )}
                            </div>

                        </>)
                }

            </div>
            <div className="illusion"></div>

        </>

    );
};

export default SubscriptionPlans;