export default function sortDateTime(keys: any) {
  keys = Array.from(keys);

  return keys.sort((a: any, b: any) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  });
}
