import path from 'path'
import childProcess from 'child_process'
import {promisify} from 'util'

const spawnAsync = promisify(childProcess.execFile)
const cliBinPath = path.join(__dirname, '../../bin/run')

describe.only('E2E - test command', () => {
  it('should log when no tests are defined', async () => {
    const {stdout, stderr} = await spawnAsync('node', [cliBinPath, 'test'], {
      cwd: path.join(__dirname, 'blitz-project'),
    })
    expect(stdout).toContain('No tests yet')
    expect(stderr).toEqual('')
  })
})
