const makeHourList = () => {
  let count = 0,
    result = [];

  while (count < 24) {
    if (String(count).length === 1) {
      result.push(`0${count}`);
    } else {
      result.push(`${count}`);
    }

    count += 1;
  }

  return result;
};

const makeMinuteList = () => {
  let count = 0,
    result = [];

  while (count < 60) {
    if (String(count).length === 1) {
      result.push(`0${count}`);
    } else {
      result.push(`${count}`);
    }

    count += 1;
  }

  return result;
};

export { makeHourList, makeMinuteList };
