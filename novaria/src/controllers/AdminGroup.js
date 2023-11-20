"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGroupbot = void 0;
const grammy_1 = require("grammy");
const ratelimiter_1 = require("@grammyjs/ratelimiter");
const welcome_1 = require("../plugins/welcome");
const ban_1 = require("../plugins/ban");
const pin_1 = require("../plugins/pin");
const promote_1 = require("../plugins/promote");
const register_1 = require("../plugins/register");
const quiz_1 = require("../plugins/quiz");
exports.AdminGroupbot = new grammy_1.Composer();
exports.AdminGroupbot.use((0, ratelimiter_1.limit)({
    timeFrame: 1000,
    limit: 2,
    onLimitExceeded: async (ctx) => {
        await ctx.reply("Please refrain from sending too many requests!");
    },
    keyGenerator: (ctx) => {
        if (ctx.hasChatType(["group", "supergroup"])) {
            return ctx.chat.id.toString();
        }
    },
}));
exports.AdminGroupbot.on('::bot_command', async (ctx, next) => {
    try {
        const user = await ctx.getAuthor();
        if (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup') {
            if (user.status !== "creator" && user.status !== "administrator") {
                // const groupid = ctx.chat.id;
                if (ctx.msg.text !== '/report' && ctx.msg.text !== '/delete') {
                    // const isbluetext = await GroupModel.findOne({ id: groupid }).select('bluetexting');
                    // if (isbluetext.bluetexting === false) {
                    await ctx.deleteMessage();
                    // }
                }
            }
        }
    }
    catch (error) {
        await ctx.reply(error.message);
    }
    await next();
});
exports.AdminGroupbot.command("setwelcome", async (ctx, next) => {
    try {
        if (ctx.chat.type == 'supergroup' || ctx.chat.type == 'group') {
            const user = await ctx.getAuthor();
            if (user.status === "creator" || user.status === "administrator") {
                await (0, welcome_1.setwelcome)(ctx);
            }
            else {
                await ctx.reply('You need to be an admin to do this.', { reply_to_message_id: ctx.msg.message_id });
            }
        }
        else {
            await ctx.reply('This Command is only for groups', { reply_to_message_id: ctx.msg.message_id });
        }
    }
    catch (error) {
        console.log(error.message);
    }
    await next();
});
exports.AdminGroupbot.command("showwelcome", async (ctx, next) => {
    try {
        if (ctx.hasChatType(['group', 'supergroup'])) {
            const user = await ctx.getAuthor();
            if (user.status === "creator" || user.status === "administrator") {
                await (0, welcome_1.showwelcome)(ctx);
            }
            else {
                await ctx.reply('You need to be an admin to do this.', { reply_to_message_id: ctx.msg.message_id });
            }
        }
        else {
            await ctx.reply('This Command is only for groups', { reply_to_message_id: ctx.msg.message_id });
        }
    }
    catch (error) {
        console.log(error.message);
    }
    await next();
});
exports.AdminGroupbot.command("welcome", async (ctx, next) => {
    try {
        if (ctx.hasChatType(['group', 'supergroup'])) {
            const user = await ctx.getAuthor();
            if (user.status === "creator" || user.status === "administrator") {
                await (0, welcome_1.welcome)(ctx);
            }
            else {
                await ctx.reply('You need to be an admin to do this.', { reply_to_message_id: ctx.msg.message_id });
            }
        }
        else {
            await ctx.reply('This Command is only for groups', { reply_to_message_id: ctx.msg.message_id });
        }
    }
    catch (error) {
        console.log(error.message);
    }
    await next();
});
exports.AdminGroupbot.command("ban").chatType(['group', 'supergroup'], async (ctx, next) => {
    try {
        const user = await ctx.getAuthor();
        if (user.status === "creator" || user.status === "administrator") {
            const message = ctx.match;
            const parts = message.split(' -r ');
            if (parts.length == 1) {
                const params = parts[0];
                if (/^\d+$/.test(params)) {
                    console.log('log on first main id');
                    await (0, ban_1.banMemberOnId)(ctx, params, null);
                }
                else if (!/^\d+$/.test(params)) {
                    console.log('log on reply by');
                    await (0, ban_1.banMemberOnReply)(ctx, message);
                }
            }
            else if (parts.length == 2) {
                const number = parts[0];
                const message = parts[1];
                if (/^\d+$/.test(number)) {
                    console.log('log on main id');
                    const id = parts[0];
                    await (0, ban_1.banMemberOnId)(ctx, id, message);
                }
            }
            else {
                await ctx.reply('Invalid ID', { reply_to_message_id: ctx.msg.message_id });
            }
        }
        else {
            await ctx.reply('Hey, I need to be an admin here', { reply_to_message_id: ctx.msg.message_id });
        }
    }
    catch (error) {
        console.log(error.message);
    }
    await next();
});
exports.AdminGroupbot.command("unban").chatType(['group', 'supergroup'], async (ctx, next) => {
    try {
        const user = await ctx.getAuthor();
        if (user.status === "creator" || user.status === "administrator") {
            const message = ctx.match;
            const parts = message.split(' -r ');
            if (parts.length == 1) {
                const params = parts[0];
                if (/^\d+$/.test(params)) {
                    console.log('log on first main id');
                    await (0, ban_1.unBanMemberOnId)(ctx, params, null);
                }
                else if (!/^\d+$/.test(params)) {
                    console.log('log on reply by');
                    await (0, ban_1.unBanMemberOnReply)(ctx, message);
                }
            }
            else if (parts.length == 2) {
                const number = parts[0];
                const message = parts[1];
                if (/^\d+$/.test(number)) {
                    console.log('log on main id');
                    const id = parts[0];
                    await (0, ban_1.unBanMemberOnId)(ctx, id, message);
                }
            }
            else {
                await ctx.reply('Invalid ID', { reply_to_message_id: ctx.msg.message_id });
            }
        }
        else {
            await ctx.reply('Hey, I need to be an admin here', { reply_to_message_id: ctx.msg.message_id });
        }
    }
    catch (error) {
        console.log(error.message);
    }
    await next();
});
exports.AdminGroupbot.command("pin", async (ctx, next) => {
    try {
        if (ctx.hasChatType(['group', 'supergroup'])) {
            const user = await ctx.getAuthor();
            const flag = ctx.match;
            if (user.status === "creator" || user.status === "administrator") {
                await (0, pin_1.pinMessage)(ctx, flag);
            }
            else {
                await ctx.reply('You need to be an admin to do this.', { reply_to_message_id: ctx.msg.message_id });
            }
        }
        else {
            await ctx.reply('This Command is only for groups', { reply_to_message_id: ctx.msg.message_id });
        }
    }
    catch (error) {
        console.log(error.message);
    }
    await next();
});
exports.AdminGroupbot.command("unpin", async (ctx, next) => {
    try {
        if (ctx.hasChatType(['group', 'supergroup'])) {
            const user = await ctx.getAuthor();
            if (user.status === "creator" || user.status === "administrator") {
                await (0, pin_1.unPinMessage)(ctx);
            }
            else {
                await ctx.reply('You need to be an admin to do this.', { reply_to_message_id: ctx.msg.message_id });
            }
        }
        else {
            await ctx.reply('This Command is only for groups', { reply_to_message_id: ctx.msg.message_id });
        }
    }
    catch (error) {
        console.log(error.message);
    }
    await next();
});
exports.AdminGroupbot.command("unpinall", async (ctx, next) => {
    try {
        if (ctx.hasChatType(['group', 'supergroup'])) {
            const user = await ctx.getAuthor();
            if (user.status === "creator" || user.status === "administrator") {
                await (0, pin_1.unPinAllMessage)(ctx);
            }
            else {
                await ctx.reply('You need to be an admin to do this.', { reply_to_message_id: ctx.msg.message_id });
            }
        }
        else {
            await ctx.reply('This Command is only for groups', { reply_to_message_id: ctx.msg.message_id });
        }
    }
    catch (error) {
        console.log(error.message);
    }
    await next();
});
exports.AdminGroupbot.command("promote", async (ctx, next) => {
    try {
        if (ctx.hasChatType(['group', 'supergroup'])) {
            const res = await ctx.getChatMember(ctx.me.id);
            const user = await ctx.getAuthor();
            const message = ctx.match;
            if (user.status === "creator" || user.status === "administrator") {
                if (!/^\d+$/.test(message)) {
                    await (0, promote_1.promoteMemberOnReply)(ctx);
                }
                else if (/^\d+$/.test(message)) {
                    await (0, promote_1.promoteMemberOnId)(ctx, message);
                }
                else {
                    await ctx.reply('Invalid ID', { reply_to_message_id: ctx.msg.message_id });
                }
            }
            else {
                await ctx.reply('Hey, I need to be an admin here', { reply_to_message_id: ctx.msg.message_id });
            }
        }
        else {
            await ctx.reply('This Command is only for groups', { reply_to_message_id: ctx.msg.message_id });
        }
    }
    catch (error) {
        console.log(error.message);
    }
    await next();
});
exports.AdminGroupbot.command("demote", async (ctx, next) => {
    try {
        if (ctx.hasChatType(['group', 'supergroup'])) {
            const res = await ctx.getChatMember(ctx.me.id);
            const user = await ctx.getAuthor();
            const message = ctx.match;
            if (user.status === "creator" || user.status === "administrator") {
                if (!/^\d+$/.test(message)) {
                    await (0, promote_1.demoteMemberOnReply)(ctx);
                }
                else if (/^\d+$/.test(message)) {
                    await (0, promote_1.demoteMemberOnId)(ctx, message);
                }
                else {
                    await ctx.reply('Invalid ID', { reply_to_message_id: ctx.msg.message_id });
                }
            }
            else {
                await ctx.reply('Hey, I need to be an admin here', { reply_to_message_id: ctx.msg.message_id });
            }
        }
        else {
            await ctx.reply('This Command is only for groups', { reply_to_message_id: ctx.msg.message_id });
        }
    }
    catch (error) {
        console.log(error.message);
    }
    await next();
});
exports.AdminGroupbot.command('quiz', async (ctx, next) => {
    try {
        const user = await ctx.getAuthor();
        if (ctx.hasChatType(['group', 'supergroup'])) {
            if (user.status == 'creator' || user.status == 'administrator') {
                (0, quiz_1.quiz)(ctx);
            }
        }
    }
    catch (error) {
        console.log(error.message);
    }
    next();
});
exports.AdminGroupbot.command("quizinterval", async (ctx, next) => {
    try {
        const user = await ctx.getAuthor();
        if (ctx.hasChatType(['group', 'supergroup'])) {
            if (user.status === "creator" || user.status === "administrator") {
                (0, quiz_1.quizinterval)(ctx);
            }
        }
    }
    catch (error) {
        console.log(error.message);
    }
    await next();
});
exports.AdminGroupbot.command("quizautodelete", async (ctx, next) => {
    try {
        const user = await ctx.getAuthor();
        if (ctx.hasChatType(['group', 'supergroup'])) {
            if (user.status === "creator" || user.status === "administrator") {
                (0, quiz_1.quizautodelete)(ctx);
            }
        }
    }
    catch (error) {
        console.log(error.message);
    }
    await next();
});
exports.AdminGroupbot.command("register", (0, ratelimiter_1.limit)({
    timeFrame: 5 * 60 * 1000,
    limit: 1,
    onLimitExceeded: async (ctx) => {
        await ctx.reply("This command is higly rate limited!");
    },
    keyGenerator: (ctx) => {
        if (ctx.hasChatType(["supergroup", 'channel'])) {
            // Note that the key should be a number in string format, such as "123456789".
            return ctx.chat.id.toString();
        }
    },
}), async (ctx, next) => {
    try {
        if (ctx.hasChatType(['supergroup'])) {
            const user = await ctx.getAuthor();
            if (user.status === "creator") {
                await (0, register_1.Regitser)(ctx);
            }
            else {
                await ctx.reply('You are not the group creator to do this.', { reply_to_message_id: ctx.msg.message_id });
            }
        }
        else if (ctx.hasChatType(['channel'])) {
            await (0, register_1.Regitser)(ctx);
        }
        else {
            await ctx.reply('This chat not a SuperGroup or channel', { reply_to_message_id: ctx.msg.message_id });
        }
    }
    catch (error) {
        console.log(error.message);
    }
    await next();
});
//# sourceMappingURL=AdminGroup.js.map