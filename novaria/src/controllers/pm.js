"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pmbot = void 0;
const grammy_1 = require("grammy");
const checkUserDetails_js_1 = require("../helpers/checkUserDetails.js");
const info_js_1 = require("../plugins/info.js");
const start_js_1 = require("../plugins/start.js");
const start_js_2 = require("../plugins/start.js");
const getquiz_js_1 = require("../plugins/getquiz.js");
const quiz_js_1 = require("../models/quiz.js");
exports.pmbot = new grammy_1.Composer();
// Register some handlers here that handle your middleware the usual way.
exports.pmbot.use(start_js_2.menu);
exports.pmbot.command("start", async (ctx, next) => {
    (0, start_js_1.start)(ctx, start_js_2.menu);
    (0, checkUserDetails_js_1.saveUserInfo)(ctx);
    await next();
});
exports.pmbot.command(['info', 'id'], async (ctx, next) => {
    (0, info_js_1.getinfo)(ctx);
    await next();
});
exports.pmbot.command("deletequiz", async (ctx) => {
    try {
        if (ctx.from.id == 622411236) {
            const id = ctx.match;
            const quiz = await quiz_js_1.QuizModel.deleteOne({ _id: id });
            console.log(quiz);
            if (quiz.deletedCount != 0) {
                await ctx.reply("Quiz Deleted successfully");
            }
            else {
                await ctx.reply("Error ocurred when deleting Quiz");
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.pmbot.on("msg:poll", async (ctx) => {
    try {
        if (ctx.hasChatType(["private"]) && ctx.from.id == 622411236) {
            (0, getquiz_js_1.quizpoll)(ctx);
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
//# sourceMappingURL=pm.js.map