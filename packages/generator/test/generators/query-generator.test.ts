import mockfs from 'mock-fs'
import {resolve} from 'path'
import fs from 'fs-extra'
import path from 'path'

function readTree(dir: string) {
  const filepaths = fs.readdirSync(dir)
  const result = Object.create(null)

  for (const fp of filepaths) {
    const p = path.join(dir, fp)
    const stats = fs.statSync(p)
    if (stats.isFile()) {
      result[fp] = fs.readFileSync(p)
    } else if (stats.isDirectory()) {
      result[fp] = readTree(p)
    }
  }

  return result
}
// import {directoryTree} from '../../../server/test/utils/tree-utils'
import directoryTreeParser from 'directory-tree'
import {QueryGenerator} from '../../src/generators/query-generator'
// import {AppGenerator} from '../../src/generators/app-generator'

describe('QueryGenerator generating TS files', () => {
  const rootFolder = resolve('')
  // const appFolder = resolve(rootFolder, 'new-app')
  const frontendFolder = resolve(rootFolder, 'app')
  beforeEach(async () => {
    // const mockPackage = {
    //   dependencies: {
    //     react: '^16.8.0',
    //   },
    //   devDependencies: {
    //     debug: '^4.1.1',
    //   },
    // }
    mockfs({
      ...readTree('./templates/app'),
      // 'new-app/gitignore': '',
      // 'new-app/package.json': JSON.stringify(mockPackage),
      '../../node_modules/callsites': readTree('../../node_modules/callsites'),
      '../../node_modules/prettier': readTree('../../node_modules/prettier'),
      '../../node_modules/color-convert': readTree('../../node_modules/color-convert'),
      'templates/query': readTree('./templates/query'),
    })
    // const generator = new AppGenerator({
    //   appName: 'new-app',
    //   destinationRoot: resolve('./new-app'),
    //   dryRun: false,
    //   useTs: true,
    //   yarn: true,
    //   version: '1.0',
    //   skipInstall: true,
    // })
    // await generator.run()
    // const tree = directoryTreeParser(resolve('.'))
    // console.log(tree)
    jest.clearAllMocks()
  })

  afterEach(() => {
    mockfs.restore()
  })

  it('writes the correct file(name)s', async () => {
    const ModelName = 'User'
    const ModelNames = 'Users'
    const modelName = 'user'
    const modelNames = 'users'
    const generator = new QueryGenerator({
      dryRun: false,
      useTs: true,
      ModelName,
      ModelNames,
      modelName,
      modelNames,
    })

    await generator.run()

    expect(fs.existsSync(resolve(frontendFolder))).toBeTruthy()
    const tree = directoryTreeParser(resolve(frontendFolder))
    console.log(tree)
    // const tree = directoryTree(resolve(frontendFolder, modelNames))
    // expect(tree).toEqual({
    //   name: modelNames,
    //   children: [
    //     {
    //       name: 'queries',
    //       children: [{name: `get${ModelName}.ts`}, {name: `get${ModelNames}.ts`}],
    //     },
    //   ],
    // })
  })
})
