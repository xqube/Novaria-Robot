import { Context } from "grammy";


export async function pinMessage(ctx: Context, flag) {
    try {
        if (flag === 'loud' || flag === 'notify') {
            const pinned = ctx.pinChatMessage(ctx.msg.reply_to_message.message_id)
            if (pinned) {
                await ctx.reply(`The message has been pinned successfully`, { reply_to_message_id: ctx.msg.message_id, parse_mode: "MarkdownV2" });
            }
        } else {
            const pinned = ctx.pinChatMessage(ctx.msg.reply_to_message.message_id, { disable_notification: true })
            if (pinned) {
                await ctx.reply(`The message has been pinned silently`, { reply_to_message_id: ctx.msg.message_id, parse_mode: "MarkdownV2", disable_notification: true });
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}

export async function unPinMessage(ctx: Context) {
    try {
        const unpinned = await ctx.unpinChatMessage();
        if (unpinned) {
            await ctx.reply(`The pinned message has been unpinned successfully`, { reply_to_message_id: ctx.msg.message_id, parse_mode: "MarkdownV2" });
        }
    } catch (error) {
        console.log(error.message);
    }
}


export async function unPinAllMessage(ctx: Context) {
    try {
        const unpinned = ctx.unpinAllChatMessages()
        if (unpinned) {
            await ctx.reply(`All pinned message has been unpinned successfully`, { reply_to_message_id: ctx.msg.message_id, parse_mode: "MarkdownV2" });
        }
    } catch (error) {
        console.log(error.message);
    }
}