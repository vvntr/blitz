import path from 'path'
import childProcess from 'child_process'
import {promisify} from 'util'

const spawnAsync = promisify(childProcess.execFile)
const cliBinPath = path.join(__dirname, '../../bin/run')

describe.only('E2E - start command', () => {
  it('Should fail on a non blitz project', async () => {
    try {
      let command = await spawnAsync('node', [cliBinPath, 'start'])
    } catch (e) {
      expect(e.stderr).toContain('Error: You are not inside a Blitz project')
    }
  })
})
