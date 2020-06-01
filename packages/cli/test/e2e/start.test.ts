import path from 'path'
import childProcess from 'child_process'
import {promisify} from 'util'
import {doesNotMatch} from 'assert'

const spawnAsync = promisify(childProcess.execFile)
const cliBinPath = path.join(__dirname, '../../bin/run')
const spawn = require('child_process').spawn

describe.only('E2E - start command', () => {
  it('Should fail on a non blitz project', async () => {
    expect.assertions(1)
    try {
      const command = await spawnAsync('node', [cliBinPath, 'start'])
    } catch (e) {
      expect(e.stderr).toContain('Error: You are not inside a Blitz project')
    }
  })

  it('Should succeed on a blitz project', async (done) => {
    const promise = new Promise((resolve, reject) => {
      const startProcess = spawn('node', [cliBinPath, 'start'], {
        cwd: path.join(__dirname, 'blitz-project'),
      })
      startProcess.stdout.on('data', (data) => {
        console.log(data.toString(), 'HERE IS DATA')
        expect(data.toString()).toContain('started server')
        done()
      })
    })
    return promise
  })
})
