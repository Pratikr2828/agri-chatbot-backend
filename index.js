const http = require('http');
const readline = require('readline');

const OLLAMA_HOST = 'http://localhost:11434';

async function chat(model, prompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: model,
      prompt: prompt,
      stream: false
    });

    const url = new URL(OLLAMA_HOST + '/api/generate');

    const options = {
      hostname: url.hostname,
      port: url.port || 11434,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = http.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          console.log("here is the updated response", response.response);
          resolve(response.response);
        } catch (err) {
          reject(new Error('Failed to parse response: ' + body));
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(data);
    req.end();
  });
}

async function listModels() {
  return new Promise((resolve, reject) => {
    const url = new URL(OLLAMA_HOST + '/api/tags');

    const options = {
      hostname: url.hostname,
      port: url.port || 11434,
      path: url.pathname,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve(response.models || []);
        } catch (err) {
          reject(new Error('Failed to parse response'));
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}

async function main() {
  const MODEL = 'llama3';

  console.log('\n========================================');
  console.log('   Ollama Node.js Interactive Chat');
  console.log('========================================\n');

  try {
    // List available models
    console.log('Available models:');
    const models = await listModels();

    if (models.length === 0) {
      console.log('  No models found. Run: ollama pull llama2');
      return;
    } else {
      models.forEach(m => console.log(`  - ${m.name}`));
    }

    console.log(`\nUsing model: ${MODEL}`);
    console.log('Type "exit" to quit.\n');
    console.log('========================================\n');

    // Create readline interface
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // Function to ask for prompt
    const askQuestion = () => {
      rl.question('You: ', async (userInput) => {
        if (userInput.toLowerCase() === 'exit') {
          console.log('\nGoodbye!');
          rl.close();
          return;
        }

        if (userInput.trim() === '') {
          askQuestion();
          return;
        }

        try {
          console.log('\nAI: Thinking...');
          const response = await chat(MODEL, userInput);
          console.log(`\nAI: ${response}\n`);
        } catch (err) {
          console.error('Error:', err.message);
        }

        askQuestion();
      });
    };

    askQuestion();

  } catch (err) {
    console.error('Error:', err.message);
    console.log('\nMake sure Ollama is running and the model is available.');
    console.log('Install a model with: ollama pull llama2');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
