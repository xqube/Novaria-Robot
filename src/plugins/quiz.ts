import { Context } from "grammy";
import { GroupModel } from "../models/group";
import { QuizModel } from "../models/quiz";

const quizIntervalMap = new Map();


export async function sentQuiz(ctx: Context, quizdelete, quizinterval) {
    try {
        const chatid = ctx.chat.id;
        if (quizIntervalMap.has(chatid)) {
            const quizdata = await QuizModel.aggregate([
                { $sample: { size: 1 } }, // Retrieves 1 random documents from the collection
            ])
            
            if (quiz) {
                const poll = await ctx.replyWithPoll(quizdata[0].question, quizdata[0].options, {
                    type: 'quiz',
                    is_anonymous: false,
                    is_closed: false,
                    correct_option_id: quizdata[0].correctoption,
                    explanation: quizdata[0].explanation
                });

                if (poll) {
                    if (quizdelete == true) {
                        const intervalid = setTimeout(async () => {
                            try {
                                await ctx.api.deleteMessage(chatid, poll.message_id)
                                sentQuiz(ctx, quizdelete, quizinterval);
                            } catch (error) {
                                console.log(error);
                            }
                        }, quizinterval * 60 * 1000)
                        quizIntervalMap.set(chatid, intervalid)
                    } else {
                        const intervalid = setTimeout(async () => {
                            try {
                                sentQuiz(ctx, quizdelete, quizinterval);
                            } catch (error) {
                                console.log(error);
                            }
                        }, quizinterval * 60 * 1000)
                        quizIntervalMap.set(chatid, intervalid)
                    }
                }
            }
        }

    } catch (error) {
        console.log(error);
    }
}


export async function quiz(ctx: Context) {
    try {
        const bool = ctx.match;
        const chatid = ctx.chat.id;
        const quiz = await GroupModel.findOne({ id: chatid }).select('quizinterval quizdelete');
        if (bool == 'ON' || bool == 'on') {
            if (!quizIntervalMap.has(chatid)) {
                await ctx.reply(`Quiz turned ON \n<b>Time Interval</b>: ${quiz.quizinterval} mins\nYou can change it by using /quizinterval.`, { parse_mode: "HTML", reply_to_message_id: ctx.msg.message_id })
                quizIntervalMap.set(chatid, 'first-process')
                sentQuiz(ctx, quiz.quizdelete, quiz.quizinterval);
            } else {
                await ctx.reply('Quiz is already turned ON', { reply_to_message_id: ctx.msg.message_id })
            }

        } else if (bool == 'OFF' || bool == 'off') {
            if (quizIntervalMap.has(chatid)) {
                const job = quizIntervalMap.get(chatid)
                quizIntervalMap.delete(chatid);
                clearInterval(job);
                await ctx.reply('Quiz turned OFF', { reply_to_message_id: ctx.msg.message_id })
            } else {
                await ctx.reply('Quiz is already turned OFF', { reply_to_message_id: ctx.msg.message_id })
            }
        }
    } catch (error) {
        console.log(error);

    }
}


export async function quizinterval(ctx) {
    try {
        const match = ctx.match;
        const interval = parseInt(match)
        if (!Number.isNaN(interval) && interval >= 10 && interval <= 60) {
            const quiz = await GroupModel.findOne({ id: ctx.chat.id })
            quiz.quizinterval = interval;
            quiz.save().then(async () => {
                try {
                    await ctx.reply(`Quiz intervel set to ${quiz.quizinterval} mins`)
                } catch (error) {
                    console.log(error);

                }
            }).catch(async () => {
                try {
                    await ctx.reply('Error occured while saving Quiz interval')
                } catch (error) {
                    console.log(error);

                }
            })
        } else {
            await ctx.reply('QuizInterval must be between 15 and 60 including them.', { reply_to_message_id: ctx.msg.message_id })
        }
    } catch (error) {
        console.log(error);
    }
}


export async function quizautodelete(ctx) {
    try {
        const quiz = await GroupModel.findOne({ id: ctx.chat.id }).select('quizdelete')
        if (!quiz.quizdelete) {
            quiz.quizdelete = true;
            quiz.save().then(async () => {
                try {
                    await ctx.reply(`Quiz auto delete turned ON`)
                } catch (error) {
                    console.log(error);
                }
            }).catch(async () => {
                try {
                    await ctx.reply('Error occured')
                } catch (error) {
                    console.log(error);

                }
            })
        } else {
            quiz.quizdelete = false;
            quiz.save().then(async () => {
                try {
                    await ctx.reply(`Quiz auto delete turned OFF`)
                } catch (error) {
                    console.log(error);

                }
            }).catch(async () => {
                try {
                    await ctx.reply('Error occured')
                } catch (error) {
                    console.log(error);

                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}
