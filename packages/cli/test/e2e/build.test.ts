import path from 'path'
import childProcess from 'child_process'
import {promisify} from 'util'

const spawnAsync = promisify(childProcess.execFile)
const cliBinPath = path.join(__dirname, '../../bin/run')
const spawn = require('child_process').spawn

describe.only('E2E - start command', () => {
  it('Should fail on a non blitz project', async () => {
    try {
      let command = await spawnAsync('node', [cliBinPath, 'build'])
    } catch (e) {
      expect(e.stderr).toContain('Error: You are not inside a Blitz project')
    }
  })

  it('Should succeed inside a blitz project', (done) => {
    const promise = new Promise((resolve, reject) => {
      const startProcess = spawn('node', [cliBinPath, 'build'], {
        cwd: path.join(__dirname, 'blitz-project'),
      })
      startProcess.stdout.on('data', (data) => {
        // This has the potential to time out
        if (data.toString().includes('Compiled')) {
          expect(data.toString()).toContain('Compiled successfully')
          done()
        }
      })
    })
    return promise
  })
})
