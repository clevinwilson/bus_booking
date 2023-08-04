import axiosInstance from '../axios/axios'

//signup
export const userSignup = (values) => {
    return axiosInstance().post("/register", { ...values });
}

export const getCityList = () => {
    return axiosInstance().get('https://rightpayonline.com/bus/cityList')
}

export const searchBus = (values) => {
    return axiosInstance().post('https://rightpayonline.com/bus/srchBus', { ...values })
}

export const getSeatLayout = (values) => {
    return axiosInstance().post('https://rightpayonline.com/bus/seatLayout', { ...values })
}


export const blockSeat = (rootDetails, blockedSeats) => {
    let data = {
        sourceCity: rootDetails.sourceCity,
        destinationCity: rootDetails.destinationCity,
        doj: rootDetails.doj,
        routeScheduleId: rootDetails.routeScheduleId,
        boardingPoint: {
            id: "562931",
            location: "Esplande Bus stand,Esplande Bus stand8617595172",
            time: "null"
        },
        customerName: "Arti",
        customerLastName: "Kumari",
        customerEmail: "test1@test.com",
        customerPhone: "9999999999",
        emergencyPhNumber: "8888888888",
        customerAddress: "Esplande",
        blockSeatPaxDetails: blockedSeats,
        inventoryType:rootDetails.inventoryType
    }
    return axiosInstance().post('https://rightpayonline.com/bus/blockSeat', { ...data })
}