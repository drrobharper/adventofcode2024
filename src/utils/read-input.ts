import { readFile } from 'node:fs/promises';

export default (path: string): Promise<string> => readFile(path, 'utf8');
