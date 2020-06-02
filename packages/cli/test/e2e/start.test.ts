import path from 'path'
import childProcess from 'child_process'
import {promisify} from 'util'
import {doesNotMatch} from 'assert'

const spawnAsync = promisify(childProcess.execFile)
const cliBinPath = path.join(__dirname, '../../bin/run')
const spawn = require('child_process').spawn

describe.only('E2E - start command', () => {
  it('Should fail outside a blitz project', async () => {
    expect.assertions(1)
    try {
      const command = await spawnAsync('node', [cliBinPath, 'start'])
    } catch (e) {
      expect(e.stderr).toContain('Error: You are not inside a Blitz project')
    }
  })

  it('Should succeed on a blitz project', (done) => {
    expect.assertions(1)
    const promise = new Promise((resolve, reject) => {
      const startProcess = spawn('node', [cliBinPath, 'start'], {
        cwd: path.join(__dirname, 'blitz-project'),
      })
      startProcess.stdout.once('data', (data) => {
        // Need to wrap this in a try/catch because expect could throw error
        try {
          expect(data.toString()).toContain('started server')
          done()
        } catch (e) {
          done.fail()
        }
      })
    })
    return promise
  })
})
