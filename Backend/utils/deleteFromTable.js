const deleteFromTable = (table, value) => {
  const index = table.indexOf(value);
  if (index === 0) {
    table.shift();
    return table;
  }
  if (index === table.length - 1) {
    table.pop();
    return table;
  }
  return index != -1
    ? [...table.splice(0, index), ...table.splice(index + 1)]
    : table;
};

module.exports = { deleteFromTable };
