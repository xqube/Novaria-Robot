import { QuizModel } from "../models/quiz";

export async function quizpoll(ctx) {
  try {
    const options = ctx.msg.poll.options.map((option) => option.text);
    const poll = ctx.msg.poll
    const user = ctx.chat
    if (poll.is_anonymous === false && poll.type == "quiz" && poll.correct_option_id) {
      const object = await QuizModel.create({
        quizid: poll.id,
        userid: user.id,
        fname: user.first_name,
        question: poll.question,
        options: options,
        correctoption: poll.correct_option_id,
        explanation: poll?.explanation
      })

      if (object) {
        await ctx.reply(`Quiz id is <code>${object._id}</code>`, { parse_mode: "HTML" })
      }
    } else {
      await ctx.reply("Check if the poll type is quiz and is not anonymous")
    }
  } catch (error) {
    console.log(error.message);

  }
}