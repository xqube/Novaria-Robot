"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unPinAllMessage = exports.unPinMessage = exports.pinMessage = void 0;
async function pinMessage(ctx, flag) {
    try {
        if (flag === 'loud' || flag === 'notify') {
            const pinned = ctx.pinChatMessage(ctx.msg.reply_to_message.message_id);
            if (pinned) {
                await ctx.reply(`The message has been pinned successfully`, { reply_to_message_id: ctx.msg.message_id, parse_mode: "MarkdownV2" });
            }
        }
        else {
            const pinned = ctx.pinChatMessage(ctx.msg.reply_to_message.message_id, { disable_notification: true });
            if (pinned) {
                await ctx.reply(`The message has been pinned silently`, { reply_to_message_id: ctx.msg.message_id, parse_mode: "MarkdownV2", disable_notification: true });
            }
        }
    }
    catch (error) {
        console.log(error.message);
    }
}
exports.pinMessage = pinMessage;
async function unPinMessage(ctx) {
    try {
        const unpinned = await ctx.unpinChatMessage();
        if (unpinned) {
            await ctx.reply(`The pinned message has been unpinned successfully`, { reply_to_message_id: ctx.msg.message_id, parse_mode: "MarkdownV2" });
        }
    }
    catch (error) {
        console.log(error.message);
    }
}
exports.unPinMessage = unPinMessage;
async function unPinAllMessage(ctx) {
    try {
        const unpinned = ctx.unpinAllChatMessages();
        if (unpinned) {
            await ctx.reply(`All pinned message has been unpinned successfully`, { reply_to_message_id: ctx.msg.message_id, parse_mode: "MarkdownV2" });
        }
    }
    catch (error) {
        console.log(error.message);
    }
}
exports.unPinAllMessage = unPinAllMessage;
//# sourceMappingURL=pin.js.map