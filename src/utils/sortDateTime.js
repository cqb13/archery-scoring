const sortDateTime = (keys) => {
  keys = Array.from(keys);

  // removes name from date/time
  for (let i = 0; i < keys.length; i++) {
    keys[i] = keys[i].split(" | ")[0];
  }

  // separates date and time
  for (let i = 0; i < keys.length; i++) {
    keys[i] = keys[i].split(" ");
  }

  // sorts date/time
  keys.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] > b[1] ? 1 : -1;
    } else {
      return a[0] > b[0] ? 1 : -1;
    }
  });

  // recreate date/time string
  for (let i = 0; i < keys.length; i++) {
    keys[i] = keys[i].join(" ");
  }

  return keys;
};

export default sortDateTime;
