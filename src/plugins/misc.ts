import { Context } from "grammy";
import { GroupModel } from "../models/group";

export async function pingTelegramAPI(ctx) {
  try {
    // Record the start time
    const startTime = performance.now();
    // Send a GET request to the Telegram API URL
    const response = await ctx.reply('Checking...');
    // Record the end time
    const endTime = performance.now();
    // Calculate the time in milliseconds
    const pingTime = endTime - startTime;
    // Check the HTTP status code for a successful response (usually 200 OK)
    if (pingTime) {
      ctx.api.editMessageText(response.chat.id, response.message_id, `Ping successful! Telegram API is reachable. Response time: ${pingTime.toFixed(2)} ms`);
    }
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    ctx.reply('An error occurred while pinging the Telegram API.');
    console.log(error.message);
  }
}