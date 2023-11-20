import { Composer } from "grammy";
import { type Context } from "grammy";
import { type ChatMembersFlavor } from "@grammyjs/chat-members";
import { saveUserInfo } from "../helpers/checkUserDetails.js";
import { getinfo } from "../plugins/info.js";
import { start } from "../plugins/start.js";
import { menu } from "../plugins/start.js";
import { quizpoll } from "../plugins/getquiz.js";
import { QuizModel } from "../models/quiz.js";


type MyContext = Context & ChatMembersFlavor;

export const pmbot = new Composer<MyContext>();


// Register some handlers here that handle your middleware the usual way.

pmbot.use(menu);

pmbot.command("start", async (ctx, next) => {
  start(ctx, menu);
  saveUserInfo(ctx)
  await next();
});

pmbot.command(['info', 'id'], async (ctx, next) => {
  getinfo(ctx)
  await next();
});


pmbot.command("deletequiz", async (ctx) => {
  try {
    if (ctx.from.id == 622411236) {
      const id = ctx.match;
      const quiz = await QuizModel.deleteOne({ _id: id })
      console.log(quiz);

      if (quiz.deletedCount != 0) {
        await ctx.reply("Quiz Deleted successfully")
      } else {
        await ctx.reply("Error ocurred when deleting Quiz")
      }
    }
  } catch (error) {
    console.log(error);
  }

});


pmbot.on("msg:poll", async (ctx) => {
  try {
    if (ctx.hasChatType(["private"]) && ctx.from.id == 622411236) {
      quizpoll(ctx)
    }
  } catch (error) {
    console.log(error.message);
  }
});
