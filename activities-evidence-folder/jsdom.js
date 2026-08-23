const { JSDOM, VirtualConsole } = require("jsdom");
const fs = require("fs");
const path = require("path");

const folder = path.join(__dirname, "js-fundamentals-challenges");
const htmlPath = path.join(folder, "js-fundamentals-challenges.html");
if (!fs.existsSync(htmlPath)) {
  console.error("HTML file not found at", htmlPath);
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, "utf8");
const virtualConsole = new VirtualConsole();
// forward common console events from the JSDOM virtual console to Node's console
["log", "info", "warn", "error", "dir"].forEach((ev) => {
  virtualConsole.on(ev, (...args) => {
    console[ev](...args);
  });
});

const dom = new JSDOM(html, {
  runScripts: "dangerously",
  resources: "usable",
  url: "file://" + folder + "/",
  virtualConsole,
});

dom.window.addEventListener("load", () => {
  console.log("\n[jsdom] window.load event — scripts executed.");
  // give any deferred tasks a short moment to run then exit
  setTimeout(() => {
    if (dom.window && dom.window.close) dom.window.close();
    process.exit(0);
  }, 50);
});

// safety timeout
setTimeout(() => {
  console.error("[jsdom] timed out waiting for load event");
  process.exit(2);
}, 5000);
