import initilizeServer from "./app";

async function init() {
  const app = await initilizeServer();
  app.listen(process.env.PORT || 8000, () => console.log("Server has started"));

  // simple route to check if the server is up and running
  app.get("/", (req, res) => {
    res.send("<h1 style='color:green'>Server is up and running</h1>");
  });
}

init();
