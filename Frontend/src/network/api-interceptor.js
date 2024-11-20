// axiosClient.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('token'); // Replace with your actual token
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       // config.timeout = 10000;
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//   });
  
// axiosClient.defaults.timeout = 20000;

axiosClient.interceptors.response.use(
    
    function (response) {
        return response;
    },
    function (error) {
        let res = error.response;
        if(res.status == 401) {
            window.location.href = "https://example.com/login";
        }
        console.error("looks like there is a problem. Status Code: " + res.status);
        return Promise.reject(error);
    }
)