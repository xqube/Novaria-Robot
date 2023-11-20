import { Composer } from "grammy";
import { type Context } from "grammy";
import { type ChatMembersFlavor } from "@grammyjs/chat-members";
import { GroupModel } from "../models/group";

type MyContext = Context & ChatMembersFlavor;

export const selfbot = new Composer<MyContext>();

selfbot.on("my_chat_member", async (ctx, next) => {
  try {
    if (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup') {
      const chatdetails = ctx.myChatMember.chat;
      if (ctx.myChatMember.new_chat_member.status !== 'administrator') {
        await ctx.reply(`Hey ${ctx.myChatMember.from.first_name},I am not admin here, make me admin and give full permision for working smooth`)
      }
      const ifexists = await GroupModel.findOne({ id: chatdetails.id })
      const groupsave = new GroupModel(chatdetails)
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
  } catch (error) {
    console.log(error.message);
  }
});