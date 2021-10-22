import { ApiBackend } from "./utils/ApiBackend";

const servidor = new ApiBackend(8080);
console.log(`Ready on port ${servidor.listening()}`);
