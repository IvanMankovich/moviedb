import fs from 'fs';

export const getGIRegEx = (str: string) => {
  return { $regex: str, $options: 'i' };
};

export const getSearchStr = (qFields: string | string[], qStr: string) => {
  const reObj = getGIRegEx(qStr);
  if (Array.isArray(qFields)) {
    return qFields.reduce((obj, item) => Object.assign(obj, { [item]: reObj }), {});
  } else {
    return { [qFields]: reObj };
  }
};

export const parseFiles = (files: Express.Multer.File[]) => {
  return files.map((file) => {
    const encode_img = fs.readFileSync(file?.path).toString('base64');
    return {
      size: file?.size,
      contentType: file?.mimetype,
      data: Buffer.from(encode_img, 'base64'),
    };
  });
};

export const getDoB = (dob?: string | string[]) => {
  if (!dob) {
    return null;
  } else {
    if (Array.isArray(dob)) {
      return [];
    } else {
      return [];
    }
  }
};
