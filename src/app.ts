import {
  Bot,
  GrammyError,
  HttpError,
  API_CONSTANTS,
} from "grammy";
import { hydrateFiles } from "@grammyjs/files";
import { limit } from "@grammyjs/ratelimiter";
import { autoRetry } from "@grammyjs/auto-retry";
import { pmbot } from "./controllers/pm.js";
import { AdminGroupbot } from "./controllers/AdminGroup.js";
import { selfbot } from "./controllers/botSelf.js";
import { config } from "../config.js";
import { Groupbot } from "./controllers/Group.js";
import { DevPmbot } from "./controllers/DevPm.js";


// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot(config.BOT_TOKEN); // <-- put your bot token between the ""

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

bot.api.config.use(hydrateFiles(bot.token));
bot.api.config.use(autoRetry());
bot.use(limit());

export const botStart = (callback: any) => {

  bot.use(pmbot);
  bot.use(DevPmbot);
  bot.use(AdminGroupbot)
  bot.use(Groupbot)
  bot.use(selfbot);

  // Start the bot.
  bot.start({
    allowed_updates: API_CONSTANTS.ALL_UPDATE_TYPES
  })

  callback();


  bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
      console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
      console.error("Could not contact Telegram:", e);
    } else {
      console.error("Unknown error:", e);
    }
  });
};