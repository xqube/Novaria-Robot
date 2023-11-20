import { Composer } from "grammy";
import { type Context } from "grammy";
import { type ChatMembersFlavor } from "@grammyjs/chat-members";

import { pingTelegramAPI } from "../plugins/misc.js";
import { sysinfo } from "../plugins/sysinfo.js";
import { InputFile } from "grammy";

type MyContext = Context & ChatMembersFlavor;

export const DevPmbot = new Composer<MyContext>();


DevPmbot.command("ping", async (ctx, next) => {
    try {
        if (ctx.from.id === 622411236) {
            pingTelegramAPI(ctx);
        }
    } catch (error) {
        await ctx.reply(error.message)
    }
    await next();
});

DevPmbot.command("sysinfo", async (ctx, next) => {
    try {
        if (ctx.from.id === 622411236) {
            sysinfo(ctx);
        }
    } catch (error) {
        await ctx.reply(error.message)
    }
    await next();
});


DevPmbot.command("logs", async (ctx, next) => {
    try {
        if (ctx.from.id === 622411236) {
            // Send a file via local path
            await ctx.replyWithDocument(new InputFile("./novaria-1.log"));
            await ctx.replyWithDocument(new InputFile("./novaria_error-1.log"));
        }
    } catch (error) {
        await ctx.reply(error.message)
    }
    await next();
});


