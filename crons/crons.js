const cron = require("node-cron");
// cron jobs
const setCronJobs = () => {
    cron.schedule("*/10 * * * * *", function() {
        console.log("running a task every 10 second");
    });
}
module.exports = () => {
    setCronJobs();
}