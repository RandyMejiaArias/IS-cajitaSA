import { createObjectCsvWriter } from 'csv-writer';
import { faker } from '@faker-js/faker';
import moment from 'moment-timezone';

const getRandomAmount = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const createCSV = async () => {
  try {
    const date = moment(faker.date.past()).format('YYYY-MM-DD');

    const month = moment(date).format('MM');
    const year = moment(date).format('YYYY');

    const csvWriter = createObjectCsvWriter({
      path: `./files/${moment(date).local().format('YYYY-MM-DD')}.csv`,
      header: [
        { id: 'date', title: 'fecha' },
        { id: 'month', title: 'mesReporte' },
        { id: 'year', title: 'añoReporte' },
        { id: 'movement', title: 'tipoRegistro' },
        { id: 'amount', title: 'monto' },
      ],
    });

    for (let i = 0; i < 100; i++) {
      const movement = {
        date,
        month,
        year,
        movement: getRandomAmount(1, 2) === 1 ? 'ingreso' : 'egreso',
        amount: getRandomAmount(100, 100000) <= 1000 ? '' : getRandomAmount(100, 100000),
      }
      
      await csvWriter.writeRecords([movement]);

    }
    console.log('Report created: ', date);
  } catch (error) {
    console.log(error)
  }
}