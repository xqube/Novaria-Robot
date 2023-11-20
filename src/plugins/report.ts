import { Context } from "grammy";

export async function reportAdmin(ctx: Context) {
    try {
        const userid = ctx.msg.reply_to_message.from.id
        const userfname = ctx.msg.reply_to_message.from.first_name
        const admins = await ctx.getChatAdministrators();
    const adminIdArray = [];
    for (const admin of admins) {
        if (admin.user && admin.user.id) {
          adminIdArray.push(admin.user.id);
        }
      }
      const mentionText = adminIdArray.map((adminid) => `<a href="tg://user?id=${adminid}">​</a>`).join('');
    if(mentionText){
        console.log(mentionText);
        await ctx.reply(`Reported <a href="tg://user?id=${userid}">${userfname}</a> [<code>${userid}</code>] to admins!${mentionText}`, { reply_to_message_id: ctx.msg.message_id, parse_mode: 'HTML' });
    }
    } catch (error) {
        console.log(error.message);
    }
    
}