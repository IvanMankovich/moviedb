export const getGIRegEx = (str: string) => {
  return new RegExp(str, 'gi');
};

export const getSearchStr = (qFields: string | string[], qStr: string) => {
  const reObj = { $regex: qStr, $options: 'i' };
  if (Array.isArray(qFields)) {
    return qFields.reduce((obj, item) => Object.assign(obj, { [item]: reObj }), {});
  } else {
    return { [qFields]: reObj };
  }
};
