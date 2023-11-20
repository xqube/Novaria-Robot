import { Composer } from "grammy";
import { type Context } from "grammy";
import { type ChatMembersFlavor } from "@grammyjs/chat-members";
import { FileFlavor } from "@grammyjs/files";
import { limit } from "@grammyjs/ratelimiter";
import { setwelcome, showwelcome, welcome } from "../plugins/welcome";
import { banMemberOnId, banMemberOnReply, unBanMemberOnId, unBanMemberOnReply } from "../plugins/ban";
import { pinMessage, unPinAllMessage, unPinMessage } from "../plugins/pin";
import { promoteMemberOnId, promoteMemberOnReply, demoteMemberOnId, demoteMemberOnReply } from "../plugins/promote";
import { Regitser } from "../plugins/register";
import { quiz, quizautodelete, quizinterval } from "../plugins/quiz";

type MyContext = Context & ChatMembersFlavor & FileFlavor<Context>;

export const AdminGroupbot = new Composer<MyContext>();



AdminGroupbot.use(limit({

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
}))

AdminGroupbot.on('::bot_command', async (ctx, next) => {
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
  } catch (error) {
    await ctx.reply(error.message)
  }
  await next();
})


AdminGroupbot.command("setwelcome", async (ctx, next) => {
  try {
    if (ctx.chat.type == 'supergroup' || ctx.chat.type == 'group') {
      const user = await ctx.getAuthor();
      if (user.status === "creator" || user.status === "administrator") {
        await setwelcome(ctx)
      } else {
        await ctx.reply('You need to be an admin to do this.', { reply_to_message_id: ctx.msg.message_id });
      }
    } else {
      await ctx.reply('This Command is only for groups', { reply_to_message_id: ctx.msg.message_id })
    }
  } catch (error) {
    console.log(error.message);
  }
  await next();
});


AdminGroupbot.command("showwelcome", async (ctx, next) => {
  try {
    if (ctx.hasChatType(['group', 'supergroup'])) {
      const user = await ctx.getAuthor();
      if (user.status === "creator" || user.status === "administrator") {
        await showwelcome(ctx);
      } else {
        await ctx.reply('You need to be an admin to do this.', { reply_to_message_id: ctx.msg.message_id });
      }
    } else {
      await ctx.reply('This Command is only for groups', { reply_to_message_id: ctx.msg.message_id })
    }
  } catch (error) {
    console.log(error.message);
  }
  await next();
});

AdminGroupbot.command("welcome", async (ctx, next) => {
  try {
    if (ctx.hasChatType(['group', 'supergroup'])) {
      const user = await ctx.getAuthor();
      if (user.status === "creator" || user.status === "administrator") {
        await welcome(ctx);
      } else {
        await ctx.reply('You need to be an admin to do this.', { reply_to_message_id: ctx.msg.message_id });
      }
    } else {
      await ctx.reply('This Command is only for groups', { reply_to_message_id: ctx.msg.message_id })
    }
  } catch (error) {
    console.log(error.message);
  }
  await next();
});


AdminGroupbot.command("ban").chatType(['group', 'supergroup'], async (ctx, next) => {
  try {
    const user = await ctx.getAuthor();
    if (user.status === "creator" || user.status === "administrator") {
      const message = ctx.match;
      const parts = message.split(' -r ');
      if (parts.length == 1) {
        const params = parts[0];
        if (/^\d+$/.test(params)) {
          console.log('log on first main id');
          await banMemberOnId(ctx, params, null)
        } else if (!/^\d+$/.test(params)) {
          console.log('log on reply by');
          await banMemberOnReply(ctx, message)
        }
      } else if (parts.length == 2) {
        const number = parts[0];
        const message = parts[1];
        if (/^\d+$/.test(number)) {
          console.log('log on main id');
          const id = parts[0];
          await banMemberOnId(ctx, id, message)
        }
      } else {
        await ctx.reply('Invalid ID', { reply_to_message_id: ctx.msg.message_id });
      }
    } else {
      await ctx.reply('Hey, I need to be an admin here', { reply_to_message_id: ctx.msg.message_id });
    }
  } catch (error) {
    console.log(error.message);
  }
  await next();
});


AdminGroupbot.command("unban").chatType(['group', 'supergroup'], async (ctx, next) => {
  try {
    const user = await ctx.getAuthor();
    if (user.status === "creator" || user.status === "administrator") {
      const message = ctx.match;
      const parts = message.split(' -r ');
      if (parts.length == 1) {
        const params = parts[0];
        if (/^\d+$/.test(params)) {
          console.log('log on first main id');
          await unBanMemberOnId(ctx, params, null)
        } else if (!/^\d+$/.test(params)) {
          console.log('log on reply by');
          await unBanMemberOnReply(ctx, message)
        }
      } else if (parts.length == 2) {
        const number = parts[0];
        const message = parts[1];
        if (/^\d+$/.test(number)) {
          console.log('log on main id');
          const id = parts[0];
          await unBanMemberOnId(ctx, id, message)
        }
      } else {
        await ctx.reply('Invalid ID', { reply_to_message_id: ctx.msg.message_id });
      }
    } else {
      await ctx.reply('Hey, I need to be an admin here', { reply_to_message_id: ctx.msg.message_id });
    }
  } catch (error) {
    console.log(error.message);
  }
  await next();
});


AdminGroupbot.command("pin", async (ctx, next) => {
  try {
    if (ctx.hasChatType(['group', 'supergroup'])) {
      const user = await ctx.getAuthor();
      const flag = ctx.match;
      if (user.status === "creator" || user.status === "administrator") {
        await pinMessage(ctx, flag)
      } else {
        await ctx.reply('You need to be an admin to do this.', { reply_to_message_id: ctx.msg.message_id });
      }
    } else {
      await ctx.reply('This Command is only for groups', { reply_to_message_id: ctx.msg.message_id })
    }
  } catch (error) {
    console.log(error.message);
  }
  await next();
});


AdminGroupbot.command("unpin", async (ctx, next) => {
  try {
    if (ctx.hasChatType(['group', 'supergroup'])) {
      const user = await ctx.getAuthor();
      if (user.status === "creator" || user.status === "administrator") {
        await unPinMessage(ctx)
      } else {
        await ctx.reply('You need to be an admin to do this.', { reply_to_message_id: ctx.msg.message_id });
      }
    } else {
      await ctx.reply('This Command is only for groups', { reply_to_message_id: ctx.msg.message_id })
    }
  } catch (error) {
    console.log(error.message);
  }
  await next();
});


AdminGroupbot.command("unpinall", async (ctx, next) => {
  try {
    if (ctx.hasChatType(['group', 'supergroup'])) {
      const user = await ctx.getAuthor();
      if (user.status === "creator" || user.status === "administrator") {
        await unPinAllMessage(ctx)
      } else {
        await ctx.reply('You need to be an admin to do this.', { reply_to_message_id: ctx.msg.message_id });
      }
    } else {
      await ctx.reply('This Command is only for groups', { reply_to_message_id: ctx.msg.message_id })
    }
  } catch (error) {
    console.log(error.message);
  }
  await next();
});


AdminGroupbot.command("promote", async (ctx, next) => {
  try {
    if (ctx.hasChatType(['group', 'supergroup'])) {
      const res = await ctx.getChatMember(ctx.me.id)
      const user = await ctx.getAuthor();
      const message = ctx.match
      if (user.status === "creator" || user.status === "administrator") {
        if (!/^\d+$/.test(message)) {
          await promoteMemberOnReply(ctx);
        } else if (/^\d+$/.test(message)) {
          await promoteMemberOnId(ctx, message)
        } else {
          await ctx.reply('Invalid ID', { reply_to_message_id: ctx.msg.message_id });
        }
      } else {
        await ctx.reply('Hey, I need to be an admin here', { reply_to_message_id: ctx.msg.message_id });
      }
    } else {
      await ctx.reply('This Command is only for groups', { reply_to_message_id: ctx.msg.message_id })
    }
  } catch (error) {
    console.log(error.message);
  }
  await next();
});


AdminGroupbot.command("demote", async (ctx, next) => {
  try {
    if (ctx.hasChatType(['group', 'supergroup'])) {
      const res = await ctx.getChatMember(ctx.me.id)
      const user = await ctx.getAuthor();
      const message = ctx.match
      if (user.status === "creator" || user.status === "administrator") {
        if (!/^\d+$/.test(message)) {
          await demoteMemberOnReply(ctx);
        } else if (/^\d+$/.test(message)) {
          await demoteMemberOnId(ctx, message)
        } else {
          await ctx.reply('Invalid ID', { reply_to_message_id: ctx.msg.message_id });
        }
      } else {
        await ctx.reply('Hey, I need to be an admin here', { reply_to_message_id: ctx.msg.message_id });
      }
    } else {
      await ctx.reply('This Command is only for groups', { reply_to_message_id: ctx.msg.message_id })
    }
  } catch (error) {
    console.log(error.message);
  }
  await next();
});


AdminGroupbot.command('quiz',async (ctx, next) => {
  try {
    const user = await ctx.getAuthor()
    if (ctx.hasChatType(['group', 'supergroup'])) {
      if (user.status == 'creator' || user.status == 'administrator') {
        quiz(ctx);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
  next();
})


AdminGroupbot.command("quizinterval", async (ctx, next) => {
  try {
    const user = await ctx.getAuthor();
    if (ctx.hasChatType(['group', 'supergroup'])) {
      if (user.status === "creator" || user.status === "administrator") {
        quizinterval(ctx)
      }
    }
  } catch (error) {
    console.log(error.message);
  }
  await next();
});


AdminGroupbot.command("quizautodelete", async (ctx, next) => {
  try {
    const user = await ctx.getAuthor();
    if (ctx.hasChatType(['group', 'supergroup'])) {
      if (user.status === "creator" || user.status === "administrator") {
        quizautodelete(ctx)
      }
    }
  } catch (error) {
    console.log(error.message);
  }
  await next();
});



AdminGroupbot.command("register", limit({
  timeFrame: 5 * 60 * 1000,
  limit: 1,
  onLimitExceeded: async (ctx: MyContext) => {
    await ctx.reply("This command is higly rate limited!");
  },
  keyGenerator: (ctx: MyContext) => {
    if (ctx.hasChatType(["supergroup", 'channel'])) {
      // Note that the key should be a number in string format, such as "123456789".
      return ctx.chat.id.toString();
    }
  },
}), async (ctx: MyContext, next) => {
  try {
    if (ctx.hasChatType(['supergroup'])) {
      const user = await ctx.getAuthor();
      if (user.status === "creator") {
        await Regitser(ctx)
      } else {
        await ctx.reply('You are not the group creator to do this.', { reply_to_message_id: ctx.msg.message_id });
      }
    } else if (ctx.hasChatType(['channel'])) {
      await Regitser(ctx)
    }
    else {
      await ctx.reply('This chat not a SuperGroup or channel', { reply_to_message_id: ctx.msg.message_id })
    }
  } catch (error) {
    console.log(error.message);
  }
  await next();
});