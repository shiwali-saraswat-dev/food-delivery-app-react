import { useContext } from "react";
import UserContext from "../utils/UserContext.js";

const Profile = () => {
    // Pull the user object out of the context, then destructure for short JSX
    const { user } = useContext(UserContext);
    const { name, email, phone, address, avatar } = user;

    // Build the address text once, so the JSX stays clean
    const fullAddress = `${address.line1}, ${address.city}, ${address.state} - ${address.pincode}`;

    return (
        <div className="profile-container">
            <div className="img-div">
                {/* alt should describe the image (was the avatar URL before) */}
                <img src={avatar} alt={`${name} profile photo`} />
            </div>

            <div className="user-detail">
                <h1 className="profile-name">{name}</h1>

                <p><span className="label">Email</span><span className="value">{email}</span></p>
                <p><span className="label">Phone</span><span className="value">{phone}</span></p>
                <p><span className="label">Address</span><span className="value">{fullAddress}</span></p>
            </div>
        </div>
    );
};

export default Profile;