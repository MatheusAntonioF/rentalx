import fs from 'fs';

export const deleteFile = async (filename: string): Promise<void> => {
  try {
    await fs.promises.stat(filename); // verify if that file exists
  } catch (err) {
    return;
  }

  await fs.promises.unlink(filename); // delete a file
};
