import { Context } from "grammy";

export async function promoteMemberOnReply(ctx: Context) {
    try {
        const fname = ctx.msg.reply_to_message.from.first_name;
        const userid = ctx.msg.reply_to_message.from.id;
        const admin = ctx.msg.from.first_name;
        if (userid) {
            const promoted = await ctx.promoteChatMember(ctx.msg.reply_to_message.from.id, {
                can_manage_chat: true,
                can_delete_messages:true,
                can_restrict_members:true,
                can_invite_users:true,
                can_pin_messages:true,
            });
            
            if (promoted) {
                await ctx.reply(`User <a href="tg://user?id=${userid}">${fname}</a> has been promoted by ${admin}`, {reply_to_message_id: ctx.msg.message_id, parse_mode:'HTML'})
            } else {
                await ctx.reply('Hey reply this command to message to ban that user!', { reply_to_message_id: ctx.msg.message_id });
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}


export async function promoteMemberOnId(ctx: Context, id) {
    try {
        const admin = ctx.msg.from.first_name;
        const userdetails = await ctx.getChatMember(id)
        const promoted = await ctx.promoteChatMember(id,{
            can_manage_chat: true,
            can_delete_messages:true,
            can_restrict_members:true,
            can_invite_users:true,
            can_pin_messages:true,
        });
        if (promoted) {
            console.log('go here myr');
            
            await ctx.reply(`User ${userdetails.user.first_name} has been been promoted by ${admin}.`, { reply_to_message_id: ctx.msg.message_id })
        }
    } catch (error) {
        console.log(error.message);
    }
}




export async function demoteMemberOnReply(ctx: Context) {
    try {
        const fname = ctx.msg.reply_to_message.from.first_name;
        const userid = ctx.msg.reply_to_message.from.id;
        const admin = ctx.msg.from.first_name;
        if (userid) {
            const demoted = await ctx.promoteChatMember(ctx.msg.reply_to_message.from.id);

            if (demoted) {
                await ctx.reply(`${fname} has been demoted by ${admin}`)
            }
        } else {
            await ctx.reply('Hey reply this command to message to ban that user!', { reply_to_message_id: ctx.msg.message_id });
        }
    } catch (error) {
        console.log(error.message);
    }
}


export async function demoteMemberOnId(ctx: Context, id) {
    try {
        const admin = ctx.msg.from.first_name;
        const userdetails = await ctx.getChatMember(id)
        const demoted = await ctx.promoteChatMember(id);
        if (demoted) {
            await ctx.reply(`User ${userdetails.user.first_name} has been been demoted by ${admin}.`, { reply_to_message_id: ctx.msg.message_id })
        }
    } catch (error) {
        console.log(error.message);
    }
}