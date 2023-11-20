"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sysinfo = void 0;
const disk = require('diskusage');
const os = require('os');
const moment = require('moment-timezone');
async function sysinfo(ctx) {
    const res = await ctx.reply('Processing...');
    const { free, total } = await disk.check('/');
    const totalspace = (total / (1024 * 1024)).toFixed(2);
    const usedspace = ((total - free) / (1024 * 1024)).toFixed(2);
    const freespace = (free / (1024 * 1024)).toFixed(2);
    // RAM (Memory) Usage
    const totalMemory = os.totalmem(); // Total system memory in bytes
    const freeMemory = os.freemem(); // Available memory in bytes
    const totalmem = (totalMemory / (1024 * 1024)).toFixed(2);
    const freemem = (freeMemory / (1024 * 1024)).toFixed(2);
    // CPU Load
    const avgLoad = os.loadavg(); // Returns an array with 1, 5, and 15-minute load averages
    const osVersion = os.version();
    // Get the operating system model
    const osModel = os.platform();
    // Specify the desired time zone (e.g., 'America/New_York')
    const timeZone = 'Asia/Kolkata';
    // Get the current date and time in the specified time zone
    const currentDateTime = moment.tz(timeZone);
    // Format the date and time as 'dd-mm-yy hh:mm A'
    const formattedDateTime = currentDateTime.format('DD-MM-YY hh:mm:ss A');
    await ctx.api.editMessageText(res.chat.id, res.message_id, `<b>📊Total Space</b>: <code>${totalspace} MB</code>
<b>💼Used Space</b>: <code>${usedspace} MB</code>
<b>📁Free Space</b>: <code>${freespace} MB</code>
<b>📈1-Minute Load Average</b>: <code>${avgLoad[0]} %</code>
<b>📈5-Minute Load Average</b>: <code>${avgLoad[1]} %</code>
<b>📈15-Minute Load Average</b>: <code>${avgLoad[2]} %</code>
<b>🖥️Operating System Version</b>: <code>${osVersion}</code>
<b>🖥️Operating System Model</b>: <code>${osModel}</code>
<b>💾Total Memory</b>: <code>${totalmem} MB</code>
<b>💾Available</b>: <code>${freemem} MB</code>
<b>🕰️Time/Date</b>: <code>${timeZone}:${formattedDateTime}</code>
    `, { parse_mode: 'HTML' });
}
exports.sysinfo = sysinfo;
//# sourceMappingURL=sysinfo.js.map