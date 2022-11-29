import crypto from 'node:crypto'
const chs = (str: string): string =>
  crypto.createHash('sha256').update(str).digest('hex')

export default chs
