import { Context } from "grammy";

export async function deleteByPoll(ctx: Context) {
  try {
    if (ctx.msg.reply_to_message.message_id) {
      const adminIdArray = [];
      const admins = await ctx.getChatAdministrators();
      for (const admin of admins) {
        if (admin.user && admin.user.id) {
          adminIdArray.push(admin.user.id)
        }
      }

      const chatid = ctx.chat.id;
      const deletemsgid = ctx.msg.message_id
      const messageid = ctx.msg.reply_to_message.message_id;
      const userid: number = ctx.msg.reply_to_message.from.id
      const fname = ctx.msg.reply_to_message.from.first_name;
      const question = `Should I delete this message from ${fname}. (this poll will close in 3 minute and minimum total votes needed is 5)`;
      const options = ['Yes', 'No']

      if (adminIdArray.includes(userid)) {
        await ctx.reply(`Why should delete the message of an admin, I can't do that`);
      } else {
        const poll = await ctx.replyWithPoll(question, options, {
          type: 'regular',
          is_anonymous: false,
          reply_to_message_id: messageid,
          is_closed: false,
          protect_content: true,
        });

        async function stopoll(ctx) {
          const pollresult = await ctx.api.stopPoll(chatid, poll.message_id);
          const options = pollresult.options;
          if (pollresult) {
            console.log(pollresult);
            let maxOption = options[0];
            for (let i = 1; i < options.length; i++) {
              if (options[i].voter_count > maxOption.voter_count) {
                maxOption = options[i];
              }
            }
              await ctx.api.deleteMessage(chatid, poll.message_id);
              await ctx.api.deleteMessage(chatid, deletemsgid);
            if (maxOption.text === 'Yes' && pollresult.total_voter_count >= 5) {
              try {
                await ctx.api.deleteMessage(chatid, messageid);
              } catch (error) {
                console.log(error.description);
                
              }
            } else {
              await ctx.reply("The poll failed the requirements and the <b>message is not delete</b>", { reply_to_message_id: ctx.msg.message_id, parse_mode: 'HTML' });
            }
          } else {
            return;
          }
        }
        setTimeout(async () => {
          stopoll(ctx)
        }, 3*60*1000)
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}