import http from "node:http";

const OLLAMA_HOST = "http://localhost:11434";
const MODEL = "llama3";

function chatWithOllama(prompt, user_lgd) {
    console.log("here is the user input data", prompt, user_lgd)
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            model: MODEL,
            prompt,
            stream: false
        });

        const url = new URL(OLLAMA_HOST + "/api/generate");

        const options = {
            hostname: url.hostname,
            port: url.port || 11434,
            path: url.pathname,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(data)
            }
        };

        const req = http.request(options, (res) => {
            let body = "";

            res.on("data", chunk => body += chunk);

            res.on("end", () => {
                try {
                    const response = JSON.parse(body);
                    resolve(response.response);
                } catch (err) {
                    reject("Invalid Ollama response");
                }
            });
        });

        req.on("error", reject);
        req.write(data);
        req.end();
    });
}

export default chatWithOllama ;
