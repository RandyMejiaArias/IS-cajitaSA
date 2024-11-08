import cron from 'node-cron'

import { createCSV } from './app.js'

async function main() {
  await cron.schedule('*/10 * * * * *', async () => {
    await createCSV()
  })
}

main()