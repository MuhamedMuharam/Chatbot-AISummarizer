import concurrently from 'concurrently';

concurrently([
   {
      command: 'npm run dev --workspace=packages/server',
      name: 'server',
      prefixColor: 'cyan',
   },
   {
      command: 'npm run dev --workspace=packages/client',
      name: 'client',
      prefixColor: 'green',
   },
]);
