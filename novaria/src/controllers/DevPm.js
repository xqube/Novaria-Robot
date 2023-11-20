"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevPmbot = void 0;
const grammy_1 = require("grammy");
const misc_js_1 = require("../plugins/misc.js");
const sysinfo_js_1 = require("../plugins/sysinfo.js");
const grammy_2 = require("grammy");
exports.DevPmbot = new grammy_1.Composer();
exports.DevPmbot.command("ping", async (ctx, next) => {
    try {
        if (ctx.from.id === 622411236) {
            (0, misc_js_1.pingTelegramAPI)(ctx);
        }
    }
    catch (error) {
        await ctx.reply(error.message);
    }
    await next();
});
exports.DevPmbot.command("sysinfo", async (ctx, next) => {
    try {
        if (ctx.from.id === 622411236) {
            (0, sysinfo_js_1.sysinfo)(ctx);
        }
    }
    catch (error) {
        await ctx.reply(error.message);
    }
    await next();
});
exports.DevPmbot.command("logs", async (ctx, next) => {
    try {
        if (ctx.from.id === 622411236) {
            // Send a file via local path
            await ctx.replyWithDocument(new grammy_2.InputFile("./novaria-1.log"));
            await ctx.replyWithDocument(new grammy_2.InputFile("./novaria_error-1.log"));
        }
    }
    catch (error) {
        await ctx.reply(error.message);
    }
    await next();
});
//# sourceMappingURL=DevPm.js.map