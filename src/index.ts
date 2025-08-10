import "dotenv/config";
import "./config.js";

import app from "./app.js";

app.listen(process.env.PORT || 8000, () => {
   console.log(`Listening on port: ${process.env.PORT}`);
});
