import { Context } from "grammy";
import { GroupModel } from "../models/group";

export async function setwelcome(ctx) {
    try {
        const chatdetails = await GroupModel.findOne({ id: ctx.chat.id })
        const data: string = ctx.match;
        if (data) {
            chatdetails.gwelcome = data
            await chatdetails.save()
                .then((result) => {
                    ctx.reply('Welcome message set successfully!')
                    console.log("Welcome detail saved:", result);
                })
                .catch((error) => {
                    console.error("Error saving welcome detail:", error);
                });
        } else {
            await ctx.reply('No message has been given')
        }
    } catch (error) {
        console.log(error.message);
    }
}


export async function welcomeuser(ctx, chatjoin) {
    try {
        const dwelocme = 'Hi {fname}, \nusername: {uname}. \nID: <code>{id}</code> \nWelcome to {chatname}'
        const chatid = ctx.chat.id;
        const groupdetails = await GroupModel.findOne({ id: ctx.chat.id }).select('welcome_msg_id gwelcome')
        const fname = chatjoin.new_chat_member.user.first_name;
        const uname = "@" + chatjoin.new_chat_member.user.username;
        const userid = chatjoin.new_chat_member.user.id;
        const chatname = ctx.chat.title;

        try {
            await ctx.api.deleteMessage(chatid, groupdetails.welcome_msg_id);
        } catch (error) {
            console.log("Failed to delete previous welcome message");
        }
            if (groupdetails.gwelcome) {
                console.log("here", chatjoin);
                const formattedMessage = groupdetails.gwelcome
                    .replace('{fname}', fname || '')
                    .replace('{uname}', uname || '')
                    .replace('{chatname}', chatname || '')
                    .replace('{id}', userid || '');

                const respose = await ctx.reply(formattedMessage, { parse_mode: "HTML" });
                groupdetails.welcome_msg_id = respose.message_id;
                groupdetails.save()
                    .then(() => {
                        console.log('welcome response saved successfully');
                    })
                    .catch(() => {
                        console.log('Error occurred while saving welcome msg id');
                    })
                setTimeout(async () => {
                    try {
                        await ctx.api.deleteMessage(respose.chat.id, respose.message_id);
                    } catch (error) {
                        console.log(error.message);
                    }
                }, 15 * 60 * 1000);
            } else {
                const formattedMessage = dwelocme
                    .replace('{fname}', fname || '')
                    .replace('{uname}', uname || '')
                    .replace('{chatname}', chatname || '')
                    .replace('{id}', userid || '');

                const respose = await ctx.reply(formattedMessage, { parse_mode: "HTML" });
                groupdetails.welcome_msg_id = respose.message_id;
                groupdetails.save()
                    .then(() => {
                        console.log('welcome response saved successfully');
                    })
                    .catch(() => {
                        console.log('Error occurred while saving welcome msg id');
                    })
                setTimeout(async () => {
                    try {
                        await ctx.api.deleteMessage(respose.chat.id, respose.message_id);
                    } catch (error) {
                        console.log(error.message);
                    }
                }, 15 * 60 * 1000);
            }
    } catch (error) {
        console.log(error.message);

    }
}


export async function showwelcome(ctx) {
    try {
        const groupdetails = await GroupModel.findOne({ id: ctx.chat.id })
        const dwelcome = 'Hi {fname}, \nusername: {uname}. \nID: <code>{id}</code> \nWelcome to {chatname}'
        const gwelcome = groupdetails?.gwelcome;
        if (groupdetails.gwelcome) {
            await ctx.reply(`The welcome message is :\n${gwelcome}`)
        } else if (dwelcome) {
            await ctx.reply(`The welcome message is default :\n${dwelcome}`)
        } else {
            await ctx.reply('No welcome message has been set')
        }
    } catch (error) {
        console.log(error.message);
    }
}


export async function welcome(ctx: Context) {
    try {
        const params = ctx.match;
        const groupid = ctx.chat.id;
        if (params === 'on' || params === 'ON') {
            const welcome = await GroupModel.findOne({ id: groupid }).select('iswelcome');
            if (welcome.iswelcome === false) {
                welcome.iswelcome = true;
                await welcome.save();
                await ctx.reply('Welcome module is turned ON.', { reply_to_message_id: ctx.msg.message_id });
            } else {
                await ctx.reply('Its already ON.', { reply_to_message_id: ctx.msg.message_id });
            }
        } else if (params === 'off' || params === 'ON') {
            const welcome = await GroupModel.findOne({ id: groupid }).select('iswelcome');
            if (welcome.iswelcome === true) {
                welcome.iswelcome = false;
                await welcome.save();
                await ctx.reply('Welcome module is turned off.', { reply_to_message_id: ctx.msg.message_id });
            } else {
                await ctx.reply('Its already OFF.', { reply_to_message_id: ctx.msg.message_id });
            }
        }
    } catch (error) {
        console.log(error.description);

    }
}
