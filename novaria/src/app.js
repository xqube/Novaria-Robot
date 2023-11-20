"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.botStart = void 0;
const grammy_1 = require("grammy");
const files_1 = require("@grammyjs/files");
const ratelimiter_1 = require("@grammyjs/ratelimiter");
const auto_retry_1 = require("@grammyjs/auto-retry");
const pm_js_1 = require("./controllers/pm.js");
const AdminGroup_js_1 = require("./controllers/AdminGroup.js");
const botSelf_js_1 = require("./controllers/botSelf.js");
const config_js_1 = require("../config.js");
const Group_js_1 = require("./controllers/Group.js");
const DevPm_js_1 = require("./controllers/DevPm.js");
// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new grammy_1.Bot(config_js_1.config.BOT_TOKEN); // <-- put your bot token between the ""
// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.
bot.api.config.use((0, files_1.hydrateFiles)(bot.token));
bot.api.config.use((0, auto_retry_1.autoRetry)());
bot.use((0, ratelimiter_1.limit)());
const botStart = (callback) => {
    bot.use(pm_js_1.pmbot);
    bot.use(DevPm_js_1.DevPmbot);
    bot.use(AdminGroup_js_1.AdminGroupbot);
    bot.use(Group_js_1.Groupbot);
    bot.use(botSelf_js_1.selfbot);
    // Start the bot.
    bot.start({
        allowed_updates: grammy_1.API_CONSTANTS.ALL_UPDATE_TYPES
    });
    callback();
    bot.catch((err) => {
        const ctx = err.ctx;
        console.error(`Error while handling update ${ctx.update.update_id}:`);
        const e = err.error;
        if (e instanceof grammy_1.GrammyError) {
            console.error("Error in request:", e.description);
        }
        else if (e instanceof grammy_1.HttpError) {
            console.error("Could not contact Telegram:", e);
        }
        else {
            console.error("Unknown error:", e);
        }
    });
};
exports.botStart = botStart;
//# sourceMappingURL=app.js.map