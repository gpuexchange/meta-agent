const fs = require('fs');
const { resolve, join } = require('path');
const cp = require('child_process');
const os = require('os');

if (process.env.META_INSTALL_DEPENDENCIES) {
// get library path
  const lib = resolve(__dirname, '../src/plugins/');

  fs.readdirSync(lib)
    .forEach((mod) => {
      const modPath = join(lib, mod);

      // ensure path has package.json
      if (!fs.existsSync(join(modPath, 'package.json'))) return;

      // npm binary based on OS
      const npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm';

      // install folder
      cp.spawn(npmCmd, ['i'], { env: process.env, cwd: modPath, stdio: 'inherit' });
    });
}
