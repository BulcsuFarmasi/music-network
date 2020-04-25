export const updateObject = (oldObject: any, updatedObject: any): any => {
  return {
    ...oldObject,
    ...updatedObject,
  };
};
