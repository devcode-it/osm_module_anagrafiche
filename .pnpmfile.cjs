// noinspection JSUnusedGlobalSymbols

function readPackage(pkg) {
  /** @type {object} */
  if (pkg.name === 'openstamanager') {
    pkg.peerDependencies = {
      ...pkg.dependencies,
      ...pkg.peerDependencies,
    }
  }
  return pkg;
}

function afterAllResolved(lockfile, context) {
  return lockfile
}

module.exports = {
  hooks: {
    readPackage,
    afterAllResolved
  },
};
