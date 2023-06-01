// Returns the object property by given path
function getPropByPath(obj: { [key: string]: any }, path: string): any {
  const pathArr = path.split('.');

  if (pathArr.length > 1) {
    return getPropByPath(
      obj[pathArr[0]],
      pathArr.slice(1, pathArr.length).join('.')
    );
  }
  return obj[pathArr[0]];
}

export { getPropByPath };
