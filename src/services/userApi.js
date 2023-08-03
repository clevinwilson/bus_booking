import axiosInstance from '../axios/axios'

//signup
export const userSignup = (values) => {
    return axiosInstance().post("/register", { ...values });
}

export const getCityList=()=>{
    return axiosInstance().get('https://rightpayonline.com/bus/cityList')
}

export const searchBus=(values)=>{
    return axiosInstance().post('https://rightpayonline.com/bus/srchBus',{...values})
}