import server from "./server";
import serverless from "serverless-http";

const handler = serverless(server);

export default handler;
