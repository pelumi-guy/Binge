import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../src/context/AuthProvider";

// const { auth } = useContext(AuthContext);
// const { token } = auth.user;
const token = localStorage.getItem("token");

const localUrl = "https://localhost:7253/api/v1/";
const liveUrl = "https://binge-api.azurewebsites.net/api/v1/";

const customAxios = axios.create({
  baseURL: `${liveUrl}`,
  timeout: 10000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default customAxios;
