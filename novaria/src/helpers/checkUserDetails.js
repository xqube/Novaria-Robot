"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUserInfo = void 0;
const user_js_1 = require("../models/user.js");
async function saveUserInfo(ctx) {
    try {
        const chatDetails = await ctx.getChat();
        if (chatDetails.type === "private") {
            const id = chatDetails.id;
            const fname = chatDetails.first_name;
            const lname = chatDetails.last_name;
            const username = chatDetails.username;
            const existingUser = await user_js_1.UserModel.findOne({ id: id });
            if (existingUser) {
                if (existingUser.fname != fname) {
                    existingUser.fname = fname;
                }
                else if (existingUser.lname != lname) {
                    existingUser.lname = lname;
                }
                else if (existingUser.username != username) {
                    existingUser.username = username;
                }
                else {
                    console.log("User exists");
                }
                await existingUser
                    .save()
                    .then((result) => {
                    console.log("Chat detail saved:");
                })
                    .catch((error) => {
                    console.error("Error saving chat detail:", error);
                });
            }
            else {
                const infoObject = new user_js_1.UserModel({
                    id: id || null,
                    fname: fname || null,
                    lname: lname || null,
                    username: username || null,
                });
                // Check and add properties if they exist
                if (id)
                    infoObject.id = id;
                if (fname)
                    infoObject.fname = fname;
                if (lname)
                    infoObject.lname = lname;
                if (username)
                    infoObject.username = username;
                await infoObject
                    .save()
                    .then((result) => {
                    console.log("Chat detail saved:", result);
                })
                    .catch((error) => {
                    console.error("Error saving chat detail:", error);
                });
            }
            // Add user information to the ctx object
            ctx.UserData = {
                id,
                fname,
                lname,
                username,
            };
            // Pass control to the next middleware or handler
        }
    }
    catch (error) {
        console.log("error occured on checkuserdetails middleware", error.message);
    }
}
exports.saveUserInfo = saveUserInfo;
//# sourceMappingURL=checkUserDetails.js.map