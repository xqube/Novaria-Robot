import { Menu } from "@grammyjs/menu";


//Creating menu
export const menu = new Menu("root-menu", { onMenuOutdated: "Updated, try now." })
  .submenu("help", "help-menu", async (ctx) => {
    try {
      await ctx.editMessageText('These are the options you can use in this bot', { parse_mode: "HTML" });
    } catch (error) {
      console.log(error.message);
    }
  }).row()
  .url("Support Group", "t.me/novaria_support");

const helpmenu = new Menu('help-menu')
  .submenu("Greetings", "to-welcome", async (ctx) => {
    try {
      await ctx.editMessageText(`These are greetings commands: \n\n /welcome: use this to turn welcome ON or OFF, eg: /welcome ON.
      \n/showwelcome: use for getting current welcome info.
      \n/setwelcome: use this command to set custom welcome message (can add custom variables like {fname}, {chatname}, {id})`, { parse_mode: "HTML" })
    } catch (error) {
      console.log(error.message);
    }
  })
  .submenu("Admin", "to-admin", async (ctx) => {
    try {
      await ctx.editMessageText(`These are the admin commands on group: \n\n /pin: reply to a message to pin that in a group.
      \n/unpin - reply to pinned message or just use it to unpin the latest pinned message.
      \n/unpinall - unpin all the pinned message at once.
      \n/promote - reply or sent command with id to promote a user to admin.
      \n/demote - reply or sent command woth id to demote an admin.`, { parse_mode: "HTML" })
      // \n/bluetext - sent this command on group with arguments <code>on</code> or <code>off</code> to delete commands sent by users which is not used by BOT. (Its <code>on</code> by default)
    } catch (error) {
      console.log(error.message);
    }
  })
  .submenu("Bans", "to-bans", async (ctx) => {
    try {
      await ctx.editMessageText(`<b>Ban commands</b>: \n\n /ban: reply to ban a member from a group\neg: /ban reason \nAlso you can just use /ban. \neg: /ban 55555555 -r reason
      \n/unban - to unban a user from the group`, { parse_mode: "HTML" })
    } catch (error) {
      console.log(error.message);
    }
  }).row()

  .submenu("Report", "to-report", async (ctx) => {
    try {
      await ctx.editMessageText(`<b>Report</b>: \n\n /report: reply to message to report the message to admins, or you can use @admin as the reply.
      \n/delete - users can use this command to delete a message by using poll.`, { parse_mode: "HTML" })
    } catch (error) {
      console.log(error.message);
    }
  })

  .submenu("Quizzes", "to-quiz", async (ctx) => {
    try {
      await ctx.editMessageText(`<b>Quizzes</b>: \n\n When using quiz, the bot sent quizzes to group according to the given time interval.
      \n /quiz [ON/OFF]: To turn quiz ON and OFF.
      eg: /quiz on.
      \n /quizinterval [mins in number] - admin can use this to set interval for senting the next quiz by bot (available intervals are 10min - 60min). 
      eg: /quizinterval 30
      (default interval is 15 minutes).
      \n /quizautodelete: To turn quiz ON and OFF quiz auto delete (The previous quiz will be deleted if turned ON).
      eg: /quizautodelete just sent this command on group and it will toggle between ON and OFF.
      \n<code>More updates comming soon...</code>`, { parse_mode: "HTML" })
    } catch (error) {
      console.log(error.message);
    }
  })

  .back("Back", async (ctx) => {
    try {
      if (ctx.chat.type == 'private') {
        const fname = ctx.chat.first_name;
        await ctx.editMessageText(`Hello ${fname}, I am a group management bot currently under development, you can click help to know more about me
        \n <b>New experimental feature</b>
      \n<u>Quizzes</u>
        When using quiz, the bot sent quizzes to group according to the given time interval.
        <i>Click help for more</i>.
      \n<u>Register to WEB</u>
        Use the /register command to index the group or channel to the Novaria WEB. After that group or channel will be avalable to all users through the miniApp on bottom left side.
      \n<u>Delete by POLL</u>
        /delete - users can use this command to delete a message by using poll.`, { parse_mode: "HTML", reply_markup: menu });
      }
    } catch (error) {
      console.log(error.message);
    }
  })


const welcome = new Menu('to-welcome')
  .back("Back", async (ctx) => {
    try {
      await ctx.editMessageText('These are the options you can use in this bot', { parse_mode: "HTML" });
    } catch (error) {
      console.log(error.message);
    }
  })

const admin = new Menu('to-admin')
  .back("Back", async (ctx) => {
    try {
      await ctx.editMessageText('These are the options you can use in this bot', { parse_mode: "HTML" });
    } catch (error) {
      console.log(error.message);
    }
  })

const ban = new Menu('to-bans')
  .back("Back", async (ctx) => {
    try {
      await ctx.editMessageText('These are the options you can use in this bot', { parse_mode: "HTML" });
    } catch (error) {
      console.log(error.message);
    }
  })

const report = new Menu('to-report')
  .back("Back", async (ctx) => {
    try {
      await ctx.editMessageText('These are the options you can use in this bot', { parse_mode: "HTML" });
    } catch (error) {
      console.log(error.message);
    }
  })

  const quiz = new Menu('to-quiz')
  .back("Back", async (ctx) => {
    try {
      await ctx.editMessageText('These are the options you can use in this bot', { parse_mode: "HTML" });
    } catch (error) {
      console.log(error.message);
    }
  })



// Registering menus
helpmenu.register(quiz)
helpmenu.register(report)
helpmenu.register(ban)
helpmenu.register(admin)
helpmenu.register(welcome)
menu.register(helpmenu)

// functions to do
export async function start(ctx: any, menu: any,) {
  try {
    const chatdetails = await ctx.getChat();
    if (ctx.chat.type === "private") {
      const fname = chatdetails.first_name
      await ctx.reply(`Hello ${fname}, I am a group management bot currently under development, you can click help to know more about me
      \n <b>New experimental feature</b>
      \n<u>Quizzes</u>
        When using quiz, the bot sent quizzes to group according to the given time interval.
        <i>Click help for more</i>.
      \n<u>Register to WEB</u>
        Use the /register command to index the group or channel to the Novaria WEB. After that group or channel will be avalable to all users through the miniApp on bottom left side.
      \n<u>Delete by POLL</u>
        /delete - users can use this command to delete a message by using poll.`, { parse_mode: "HTML", reply_markup: menu });

    } else {
      await ctx.reply('Hey, I am here')
    }
  } catch (error) {
    console.log(error.message);
  }
}