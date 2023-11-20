"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Groupbot = void 0;
const grammy_1 = require("grammy");
const welcome_1 = require("../plugins/welcome");
const report_1 = require("../plugins/report");
const group_1 = require("../models/group");
const deleteOnPolling_1 = require("../plugins/deleteOnPolling");
exports.Groupbot = new grammy_1.Composer();
exports.Groupbot.command('delete', async (ctx, next) => {
    try {
        if (ctx.hasChatType(['group', 'supergroup'])) {
            (0, deleteOnPolling_1.deleteByPoll)(ctx);
        }
    }
    catch (error) {
        console.log(error.message);
    }
    next();
});
exports.Groupbot.on('chat_member', async (ctx, next) => {
    try {
        const chatjoin = ctx.chatMember;
        if (chatjoin.new_chat_member.status == 'member') {
            const welcome = await group_1.GroupModel.findOne({ id: ctx.chat.id }).select('iswelcome');
            if (welcome) {
                if (welcome.iswelcome === true) {
                    (0, welcome_1.welcomeuser)(ctx, chatjoin);
                }
            }
            else {
                console.log(`No iswelcome on this chat ${ctx.chat.id}`);
            }
        }
    }
    catch (error) {
        console.log(error.message);
    }
    await next();
});
exports.Groupbot.on('message', async (ctx, next) => {
    try {
        if (ctx.hasChatType(['group', 'supergroup'])) {
            if (ctx.msg.text == '/report' || ctx.msg.text == '@admin') {
                (0, report_1.reportAdmin)(ctx);
            }
        }
    }
    catch (error) {
        console.log(error.message);
    }
    await next();
});
//# sourceMappingURL=Group.js.map