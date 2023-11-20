"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Regitser = void 0;
const cloudinary_1 = require("cloudinary");
const webChatData_1 = require("../models/webChatData");
const config_1 = require("../../config");
cloudinary_1.v2.config(config_1.cloudinarykeys);
async function Regitser(ctx) {
    try {
        const chatdetails = await ctx.getChat();
        const members = await ctx.getChatMemberCount();
        console.log(chatdetails);
        const groupdetails = await webChatData_1.WebData.findOne({ id: chatdetails.id });
        if (groupdetails) {
            const file = await ctx.api.getFile(chatdetails.photo.big_file_id);
            const path = await file.download();
            const filecloudid = Math.abs(chatdetails.id).toString();
            console.log(path);
            if (path) {
                await cloudinary_1.v2.uploader.upload(path, {
                    public_id: filecloudid,
                    overwrite: false
                }, async function (error, result) {
                    if (result) {
                        console.log(result);
                        groupdetails.profilepic = result.secure_url;
                        groupdetails.bio = chatdetails.description;
                        groupdetails.members = members;
                        groupdetails.title = chatdetails.title;
                        groupdetails.username = chatdetails.username;
                        await groupdetails.save().then(async (result) => {
                            console.log("Group detail saved:", result);
                            await ctx.reply('Chat has been updated successfully', { reply_to_message_id: ctx.msg.message_id });
                        })
                            .catch(async (error) => {
                            console.error("Error saving Group details:", error);
                            await ctx.reply('An error occured while updating', { reply_to_message_id: ctx.msg.message_id });
                        });
                    }
                    else {
                        console.log(error);
                    }
                });
            }
            else {
                console.log('coudnt get the path');
            }
        }
        else {
            const groupdetails = new webChatData_1.WebData(chatdetails);
            const file = await ctx.api.getFile(chatdetails.photo.big_file_id);
            const path = await file.download();
            const filecloudid = Math.abs(chatdetails.id).toString();
            console.log(path);
            if (path) {
                await cloudinary_1.v2.uploader.upload(path, {
                    public_id: filecloudid,
                    overwrite: false
                }, async function (error, result) {
                    if (result) {
                        console.log(result);
                        groupdetails.profilepic = result.secure_url;
                        groupdetails.bio = chatdetails.description;
                        groupdetails.members = members;
                        groupdetails.title = chatdetails.title;
                        groupdetails.username = chatdetails.username;
                        await groupdetails.save().then(async (result) => {
                            console.log("Group detail saved:", result);
                            try {
                                await ctx.reply('Chat has been registered successfully', { reply_to_message_id: ctx.msg.message_id });
                            }
                            catch (error) {
                                console.log(error);
                            }
                        })
                            .catch(async (error) => {
                            console.error("Error saving Group details:", error);
                            try {
                                await ctx.reply('An error occured while registering', { reply_to_message_id: ctx.msg.message_id });
                            }
                            catch (error) {
                                console.log(error);
                            }
                        });
                    }
                    else {
                        console.log(error);
                    }
                });
            }
            else {
                console.log('coudnt get the path of Group PIC');
            }
        }
    }
    catch (error) {
        console.log(error.message);
    }
}
exports.Regitser = Regitser;
//# sourceMappingURL=register.js.map