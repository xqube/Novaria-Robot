import { Composer } from "grammy";
import { type Context } from "grammy";
import { type ChatMembersFlavor } from "@grammyjs/chat-members";
import { welcomeuser } from "../plugins/welcome";
import { reportAdmin } from "../plugins/report";
import { GroupModel } from "../models/group";
import { deleteByPoll } from "../plugins/deleteOnPolling";

type MyContext = Context & ChatMembersFlavor;

export const Groupbot = new Composer<MyContext>();

Groupbot.command('delete', async (ctx, next) => {
  try {
    if (ctx.hasChatType(['group', 'supergroup'])) {
      deleteByPoll(ctx)
    }
  } catch (error) {
    console.log(error.message);
  }
  next();
})


Groupbot.on('chat_member', async (ctx, next) => {
  try {
    const chatjoin = ctx.chatMember;
    if (chatjoin.new_chat_member.status == 'member') {
      const welcome = await GroupModel.findOne({ id: ctx.chat.id }).select('iswelcome');
      if (welcome) {
        if (welcome.iswelcome === true) {
          welcomeuser(ctx, chatjoin)
        }
      } else {
        console.log(`No iswelcome on this chat ${ctx.chat.id}`);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
  await next();
})


Groupbot.on('message', async (ctx, next) => {
  try {
    if (ctx.hasChatType(['group', 'supergroup'])) {
      if (ctx.msg.text == '/report' || ctx.msg.text == '@admin') {
        reportAdmin(ctx);
      }
    }
  } catch (error) {
    console.log(error.message);

  }
  await next();
})