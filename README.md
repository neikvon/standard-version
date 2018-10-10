# @peak-stone/standard-version

[original readme](https://github.com/conventional-changelog/standard-version)

## Installation

```bash
npm i --save-dev standard-version
```

## Code usage

```js
const standardVersion = require('standard-version')
;async () => {
  try {
    const newVersion = await standardVersion(options)
    console.log('newVersion:', newVersion)
  } catch (err) {
    console.error(`standard-version failed with message: ${err.message}`)
  }
}
```

## Options

```bash
{
  "infile": "CHANGELOG.md",
  "message": "chore(release): %s",
  "firstRelease": false,
  "sign": false,
  "noVerify": false,
  "commitAll": false,
  "silent": false,
  "tagPrefix": "v",
  "scripts": {},
  "skip": {},
  "dryRun": false,
  // new
  "current": "1.0.1"
}
```

## License

ISC

```

```
