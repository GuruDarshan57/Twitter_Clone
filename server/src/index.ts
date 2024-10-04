import initilizeServer from "./app";

async function init() {
  const app = await initilizeServer();
  app.listen(8000, () => console.log("Server started"));
}

init();
