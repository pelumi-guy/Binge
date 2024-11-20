import Login from "../components/LoginSignup/Login";
import Signup from "../components/LoginSignup/SignUp";
import HomePage from "../components/home/HomePage";
import SubscriptionPlans from "../components/SubscriptionPlans";
import ForgotPassword from "../components/forgotPassword/Forgot";
import Reset from "../components/forgotPassword/Reset";
import PasswordResetSuccess from "../components/forgotPassword/Successful";
import Landing from "../components/home/Landing";
import WatchMovie from "../components/watch/WatchMovie";
import FavouritesList from "../components/favourites/FavouritesList";
import Movies from "../components/trending/Movies";
import TvSeries from "../components/trending/TvSeries";
import Payment from "../components/payment/PaystackPayment";
import PaymentPage from "../components/payment/PaymentOptions";
import PaymentSuccess from "../components/payment/PaymentSuccess";
import Profile from "../components/userProfile";
import AlertDialog from "../components/userProfileDeleteModal";
import MovieSearch from "../components/search";

// import App from "../components/uploadImageModal";


const landingPage = {
  name: "Landing Page",
  path: "/",
  component: Landing,
};

const loginPage = {
  name: "Login Page",
  path: "/login",
  component: Login,
};

const signupPage = {
  name: "Signup Page",
  path: "/signup",
  component: Signup,
};

const homePage = {
  name: "Home Page",
  path: "/home",
  component: HomePage,
};

const subscriptionPlansPage = {
  name: "Subscription Plans",
  path: "/subscription",
  component: SubscriptionPlans,
};

const forgotPasswordPage = {
  name: "Forgot Password",
  path: "/forgot",
  component: ForgotPassword,
};

const resetPasswordPage = {
  name: "Reset Password",
  path: "/reset-password",
  component: Reset,
};

const resetSuccessfulPage = {
  name: "Reset Successful",
  path: "/resetsuccessful",
  component: PasswordResetSuccess,
};

const watchPage = {
  name: "Watch Movie",
  path: "/watch",
  component: WatchMovie,
};

const favouritesListPage = {
  name: "Favourites",
  path: "/favourites",
  component: FavouritesList,
};

const moviesPage = {
  name: "Movies",
  path: "/movies",
  component: Movies,
};

const tvSeriesPage = {
  name: "TV Series",
  path: "/tvSeries",
  component: TvSeries,
};

const payment = {
  name: "payment",
  path: "/verify-payment",
  component: Payment,
};

const paymentOption = {
  name: "payment option",
  path: "/paymentoption",
  component: PaymentPage,
};

const paymentSuccess = {
  name: "payment success",
  path: "/paymentsuccess",
  component: PaymentSuccess,
};

const userprofile = {
  name: "User Profile",
  path: "/profile",
  component: Profile
  }

  const deletemodal = {
      name: "Delete Modal",
      path:"/deletemodal",
      component: AlertDialog
  }

  const movieSearchPage = {
    name: "Search Movie",
    path: "/search/:keyword",
    component: MovieSearch
  }

export const basicRoutes = [landingPage];

export const authenticationRoutes = [
  loginPage,
  signupPage,
  forgotPasswordPage,
  resetPasswordPage,
  resetSuccessfulPage,
  payment,
  paymentOption,
  paymentSuccess
];

export const protectedRoutes = [
  homePage,
  watchPage,
  favouritesListPage,
  moviesPage,
  tvSeriesPage,
  userprofile,
  deletemodal,
  subscriptionPlansPage,
  movieSearchPage
];
