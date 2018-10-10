const path = require('path')
const printError = require('./lib/print-error')

const bump = require('./lib/lifecycles/bump')
const changelog = require('./lib/lifecycles/changelog')
const commit = require('./lib/lifecycles/commit')
const tag = require('./lib/lifecycles/tag')

module.exports = async function standardVersion (argv) {
  let pkg

  bump.pkgFiles.forEach(filename => {
    if (pkg) return
    const pkgPath = path.resolve(process.cwd(), filename)
    try {
      pkg = require(pkgPath)
    } catch (err) {}
  })

  pkg = pkg || {
    version: '0.0.1',
    private: true
  }

  if (argv.current) {
    pkg.version = argv.current
  }

  let newVersion = pkg.version
  const defaults = require('./defaults')
  const args = Object.assign({}, defaults, argv)

  try {
    const _newVersion = await bump(args, pkg)
    if (_newVersion) {
      newVersion = _newVersion
    }

    await changelog(args, newVersion)

    await commit(args, newVersion)

    await tag(newVersion, pkg.private, args)

    return newVersion
  } catch (err) {
    printError(args, err.message)
    throw err
  }
}
