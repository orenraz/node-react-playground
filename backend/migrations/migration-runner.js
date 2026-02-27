const { exec } = require('child_process');
const path = require('path');

const runners = {
  mongodb: path.join(__dirname, 'mongodb', 'scripts', 'mongo-migration-runner.js'),
};

const dbType = process.argv[2];

if (!dbType || !runners[dbType]) {
  console.error(`Usage: node migration-runner.js <dbType>`);
  console.error(`Supported dbTypes: ${Object.keys(runners).join(', ')}`);
  process.exit(1);
}

const runner = runners[dbType];

exec(`node ${runner}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error running migrations for ${dbType}:`, error);
    process.exit(1);
  }
  console.log(stdout);
  console.error(stderr);
});