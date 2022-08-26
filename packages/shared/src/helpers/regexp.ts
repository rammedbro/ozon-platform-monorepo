export function composeRegexp(args: (RegExp | string)[]): RegExp {
  return new RegExp(
    args.map(item =>
      (item instanceof RegExp)
        ? item.toString().slice(1, -1)
        : item
    ).join('|')
  );
}
