// const DATABASE_HOST = process.env.DATABASE_HOST
// const DATABASE_NAME = process.env.DATABASE_NAME
// const DATABASE_USER = process.env.DATABASE_USER
// const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
// const DATABASE_PORT = process.env.DATABASE_PORT

const DATABASE_HOST ="localhost"
const DATABASE_NAME = "hero"
const DATABASE_USER = "fangyiwang"
const DATABASE_PASSWORD ="as700423"
const DATABASE_PORT = 5432

import Sequelize from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()
var opts = {
  define: {
    freezeTableName: true,
    raw: true,
    timestamps: false,
  },
}
//postgres://USER:PASSWORD@HOST:PORT/DATABASE
const DATABASE_URL =
  'postgres://' +
  DATABASE_USER +
  ':' +
  DATABASE_PASSWORD +
  '@' +
  DATABASE_HOST +
  ':' +
  DATABASE_PORT +
  '/' +
  DATABASE_NAME
const database = new Sequelize(DATABASE_URL, opts)
console.log(database)
database.sync({ force: false, alter: true })
export default database