const app = require("./app.js");
const config = require("./utils/config.js");
const logger = require("./utils/logger.js");

const PORT = config.PORT || config.LOCAL_PORT;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
