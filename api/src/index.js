import server from "./server";
import dotenv from "dotenv";

dotenv.config({
    path: `.env.${process.env.NODE_ENV ? rocess.env.NODE_ENV : "development"}`,
});

const _port = process.env.PORT || 7557;
server.listen(_port, () => {
    console.log(`Listening on port ${_port}`);
});
