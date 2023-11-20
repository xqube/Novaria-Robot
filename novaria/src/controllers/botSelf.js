"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selfbot = void 0;
const grammy_1 = require("grammy");
const group_1 = require("../models/group");
exports.selfbot = new grammy_1.Composer();
exports.selfbot.on("my_chat_member", async (ctx, next) => {
    try {
        if (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup') {
            const chatdetails = ctx.myChatMember.chat;
            if (ctx.myChatMember.new_chat_member.status !== 'administrator') {
                await ctx.reply(`Hey ${ctx.myChatMember.from.first_name},I am not admin here, make me admin and give full permision for working smooth`);
            }
            const ifexists = await group_1.GroupModel.findOne({ id: chatdetails.id });
            const groupsave = new group_1.GroupModel(chatdetails);
            console.log(chatdetails);
            if (!ifexists) {
                await groupsave
                    .save()
                    .then((result) => {
                    console.log("Group detail saved:");
                })
                    .catch((error) => {
                    console.error("Error saving Group details:", error);
                });
            }
            await next();
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
//# sourceMappingURL=botSelf.js.map