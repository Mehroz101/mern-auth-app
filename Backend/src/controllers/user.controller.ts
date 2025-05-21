import { NOT_FOUND, OK} from "../constants/http";
import User from "../models/user.model";
import appAsserts from "../utils/appAsserts";
import catchErrors from "../utils/catchErrors";

 const getUserHandler = catchErrors(async (req, res) => {
    const user = await User.findById(req.userId);
    appAsserts(user, NOT_FOUND, "User not found");
    return res.status(OK).json(user.omitPassword());

});


export {
    getUserHandler,
}