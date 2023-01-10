const sortDateTime = (keys) => {
  keys = Array.from(keys);

  return keys.sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  });
};

export default sortDateTime;
