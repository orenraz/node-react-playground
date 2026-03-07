export async function runMigrations(umzug: any) {
  try {
    const executedMigrations = await umzug.executed();
    console.log('Previously Executed migrations:', executedMigrations.map(m => m.name));

    const pendingMigrations = await umzug.pending();
    console.log('Pending migrations:', pendingMigrations.map(m => m.name));

    if (pendingMigrations.length > 0) {
      console.log(`Executing pending migrations...`);
      const results = await umzug.up();
      console.log('Migrations executed successfully:', results.map(m => m.name));
    } else {
      console.log('No pending migrations to execute.');
    }
  } catch (error) {
    console.error('Error during migration execution:', error);
  }
}