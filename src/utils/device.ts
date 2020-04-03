export function runs(name: string): boolean {
  if (name === 'ios') {
      return ['iphone', 'ipad'].indexOf(Ti.Platform.osname) !== -1;
  }

  return name === Ti.Platform.osname;
}