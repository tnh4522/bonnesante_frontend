import useUserContext from "../hooks/useUserContext"


export default function CheckUser({ user, doctor }) {
    const { userData, saveUserData } = useUserContext();

    if (userData) {
        if(userData.isStaff) {
            return doctor
        }
    }

    return user
}

