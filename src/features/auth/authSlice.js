import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authSlice = createApi({
  reducerPath: "authapi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_DEV_URL,
  }),
  endpoints: (builder) => ({
    sendEmailOTP: builder.mutation({
      query: (email) => ({
        url: "auth/sendEmailOTP",
        method: "POST",
        body: email,
      }),
    }),
    sendMobileOTP: builder.mutation({
      query: (mobile) => ({
        url: "auth/sendMobileOtp",
        method: "POST",
        body: mobile,
      }),
    }),
    verifyEmailOTP: builder.mutation({
      query: (otp) => ({
        url: "auth/verifyAuthOtp",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: otp,
      }),
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "organization/register",
        method: "POST",
        headers: {
          auth_otp_token: localStorage.getItem("auth_token"),
        },
        body: userData,
      }),
    }),
    loginWithEmail: builder.query({
      query: () => ({
        url: "organization/loginWithEmail",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth_otp_token: localStorage.getItem("auth_token"),
        },
      }),
    }),
    loginWithPhone: builder.query({
      query: () => ({
        url: "organization/loginWithPhone",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth_otp_token: localStorage.getItem("auth_token"),
        },
      }),
    }),
    verifyPhoneNumber: builder.mutation({
      query: (phoneData) => ({
        url: "organization/isPhoneExist",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: phoneData,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (emaildata) => ({
        url: "organization/isEmailExists",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: emaildata,
      }),
    }),
  }),
});

export const {
  useSendEmailOTPMutation,
  useSendMobileOTPMutation,
  useVerifyEmailOTPMutation,
  useRegisterUserMutation,
  useLazyLoginWithEmailQuery,
  useLazyLoginWithPhoneQuery,
  useVerifyPhoneNumberMutation,
  useVerifyEmailMutation,
} = authSlice;
export default authSlice;
