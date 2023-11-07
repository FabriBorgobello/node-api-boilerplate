import { configuration } from './config';
import { WiseApi } from './wise';

const wise = new WiseApi({
  token: configuration.WISE_TOKEN,
  test: configuration.NODE_ENV === 'development',
});

async function main() {
  const data = await wise.balances.statements(177349, {
    currency: 'USD',
    intervalStart: '2023-11-01T00:00:00.000Z',
    intervalEnd: new Date().toISOString(),
    type: 'COMPACT',
  });
  console.log(data);
}

main();
