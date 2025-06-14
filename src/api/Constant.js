
export const Base_Url = "http://localhost:8080";

export const Api_Paths = {
    DOCTORS: "api/doctors",
    SPECIALITY: "api/speciality",
    APPOINTMENTS: "api/appointments",
    AUTH_LOGIN: "api/auth/login",
}

export const getHeaders = () => {
    return {
        'Authorization': `Bearer `
    }
}