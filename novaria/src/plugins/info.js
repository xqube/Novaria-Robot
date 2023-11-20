"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getinfo = void 0;
async function getinfo(ctx) {
    try {
        const chatdetails = await ctx.getChat();
        const id = chatdetails.id;
        const fname = chatdetails.first_name;
        const lname = chatdetails.last_name;
        const username = chatdetails.username;
        // Initialize an array to hold formatted information
        const infoArray = [];
        // Check and add properties if they exist, formatting with markdown-style text
        if (id)
            infoArray.push(`*id:* \`${id}\``);
        if (fname)
            infoArray.push(`*First Name:* **${fname}**`);
        if (lname)
            infoArray.push(`*Last Name:* **${lname}**`);
        if (username)
            infoArray.push(`*Username:* @${username}`);
        console.log("====================================");
        console.log(infoArray);
        console.log("====================================");
        // Join the array elements with newline characters
        const infoString = infoArray.join("\n");
        await ctx.reply(infoString, { reply_to_message_id: ctx.msg.message_id, parse_mode: "MarkdownV2" });
    }
    catch (error) {
        console.log(error.message);
    }
}
exports.getinfo = getinfo;
//# sourceMappingURL=info.js.map