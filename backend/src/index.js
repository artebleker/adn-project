import { env } from "./config.js";
import app from "./app.js";

const main = () => {
  try {
    app.listen(env.PORT, () => {
      console.log(`Servidor escuchando en el puerto ${env.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

main();
