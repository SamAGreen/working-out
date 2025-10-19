import * as SQLite from 'expo-sqlite';

export type Exercise = {
  id: number;
  name: string;
};

export const dbPromise = SQLite.openDatabaseAsync('database.db');

export async function setupExercises() {
  const db = await dbPromise;

  await db.withTransactionAsync(async () => {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS exercises (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL UNIQUE
      );
    `);

    const insertStatements = [
      'Back Squat',
      'Benchpress',
      'Deadlift',
      'Overhead Press',
      'Front Squat',
      'Bicep Curl',
      'Lateral Raise',
      'Leg Extension',
      'Calf Raise',
      'Leg Raise',
      'Lying Leg Raise',
      'Bulgarian Split Squat'
    ];

    for (const name of insertStatements) {
      await db.runAsync(
        'INSERT OR IGNORE INTO exercises (name) VALUES (?);',
        name
      );
    }
  });
}

export async function getExercises(): Promise<Exercise[]> {
  const db = await dbPromise;
  return db.getAllAsync<Exercise>('SELECT * FROM exercises');
}

export async function addExercise(exerciseName: string): Promise<number> {
  const db = await dbPromise;
  try {
    const result = await db.runAsync('INSERT INTO exercises (name) VALUES (?)', exerciseName);
    return result.lastInsertRowId;
  } catch (error) {
    console.log('There has been an error adding');
    return 0; 
  }
}
