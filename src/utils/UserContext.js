import { createContext } from "react";

const UserContext = createContext({
    user: {
        id: 1,
        name: "Shiwali Saraswat",
        email: "saraswatshiwali@gmail.com",
        phone: "+91 9999999999",
        address: {
            line1: "123, Demo Street",
            city: "Faridabad",
            state: "Haryana",
            pincode: "121001",
        },
        avatar: "https://i.pravatar.cc/100?img=47",   // placeholder image
        memberSince: "2019",
    },
});

export default UserContext;