// joeljamestech - Setup script to ask website name before deployment
import readline from "readline";
import fs from "fs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter your website name (e.g., joel.app.com): ", function(siteName) {
  const config = { SITE_NAME: siteName };
  fs.writeFileSync(".env.local", Object.entries(config).map(([k,v])=>`${k}=${v}`).join("\n"));
  console.log("// joeljamestech - .env.local created with SITE_NAME =", siteName);
  rl.close();
});