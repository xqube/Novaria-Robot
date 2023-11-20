"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unBanMemberOnId = exports.unBanMemberOnReply = exports.banMemberOnId = exports.banMemberOnReply = void 0;
async function banMemberOnReply(ctx, message) {
    try {
        const fname = ctx.msg.reply_to_message.from.first_name;
        const admin = ctx.msg.from.first_name;
        const userid = ctx.msg.reply_to_message.from.id;
        if (userid) {
            const banned = await ctx.banChatMember(ctx.msg.reply_to_message.from.id);
            if (banned) {
                if (message) {
                    await ctx.reply(`User <a href="tg://user?id=${userid}">${fname}</a> has been banned from this group by ${admin}. \n<b>Reason</b>: ${message}`, { parse_mode: 'HTML' });
                }
                else {
                    await ctx.reply(`User <a href="tg://user?id=${userid}">${fname}</a> has been banned from this group by ${admin}.`, { parse_mode: 'HTML' });
                }
            }
        }
        else {
            await ctx.reply('Hey reply this command to message to ban that user!', { reply_to_message_id: ctx.msg.message_id });
        }
    }
    catch (error) {
        console.log(error.message);
    }
}
exports.banMemberOnReply = banMemberOnReply;
async function banMemberOnId(ctx, id, message) {
    try {
        const admin = ctx.msg.from.first_name;
        const userdetails = await ctx.getChatMember(id);
        const banned = await ctx.banChatMember(id);
        if (banned) {
            if (message) {
                await ctx.reply(`User <a href="tg://user?id=${userdetails.user.id}">${userdetails.user.first_name}</a> has been banned from this group by ${admin}. \n<b>Reason</b>: ${message}`, { reply_to_message_id: ctx.msg.message_id, parse_mode: 'HTML' });
            }
            else {
                await ctx.reply(`User <a href="tg://user?id=${userdetails.user.id}">${userdetails.user.first_name}</a> has been banned from this group by ${admin}.`, { reply_to_message_id: ctx.msg.message_id, parse_mode: 'HTML' });
            }
        }
    }
    catch (error) {
        console.log(error.message);
    }
}
exports.banMemberOnId = banMemberOnId;
async function unBanMemberOnReply(ctx, message) {
    try {
        const fname = ctx.msg.reply_to_message.from.first_name;
        const userid = ctx.msg.reply_to_message.from.id;
        const admin = ctx.msg.from.first_name;
        if (userid) {
            const unbanned = await ctx.unbanChatMember(ctx.msg.reply_to_message.from.id);
            if (unbanned) {
                if (message) {
                    await ctx.reply(`User <a href="tg://user?id=${userid}">${fname}</a> has been unbanned in this group by ${admin}. \n<b>Reason</b>: ${message}`, { parse_mode: 'HTML' });
                }
                else {
                    await ctx.reply(`User <a href="tg://user?id=${userid}">${fname}</a> has been unbanned in this group by ${admin}.`, { parse_mode: 'HTML' });
                }
            }
        }
        else {
            await ctx.reply('Hey reply this command to message to unban that user!', { reply_to_message_id: ctx.msg.message_id });
        }
    }
    catch (error) {
        console.log(error.message);
    }
}
exports.unBanMemberOnReply = unBanMemberOnReply;
async function unBanMemberOnId(ctx, id, message) {
    try {
        const admin = ctx.msg.from.first_name;
        const userdetails = await ctx.getChatMember(id);
        const unbanned = await ctx.unbanChatMember(id);
        if (unbanned) {
            if (message) {
                await ctx.reply(`User <a href="tg://user?id=${userdetails.user.id}">${userdetails.user.first_name}</a> has been unbanned in this group by ${admin}. \nReason: ${message}`, { reply_to_message_id: ctx.msg.message_id, parse_mode: 'HTML' });
            }
            else {
                await ctx.reply(`User <a href="tg://user?id=${userdetails.user.id}">${userdetails.user.first_name}</a> has been unbanned in this this group by ${admin}.`, { reply_to_message_id: ctx.msg.message_id, parse_mode: 'HTML' });
            }
        }
    }
    catch (error) {
        console.log(error.message);
    }
}
exports.unBanMemberOnId = unBanMemberOnId;
//# sourceMappingURL=ban.js.map