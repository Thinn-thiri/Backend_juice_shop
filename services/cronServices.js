const { CronJob } = require("cron");
const {helloTask} = require("./taskServices");

const everyMinute = new CronJob(
    "* * * * *",
    helloTask,
    null,
    true
)
module.exports = { everyMinute };