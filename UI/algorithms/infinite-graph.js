let array = [];
let unique = 0;
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    if ((i === 0 || i === 3) && (j === 0 || j === 3)) {
      array.push({ id: unique, group: "1" });
      unique++;
      continue;
    }
    array.push({ id: unique, group: "2" });
    unique++;
  }
}
console.log(JSON.stringify(array));
array = [];
unique = 0;
for (let i = 1; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    array.push({ id: unique, source: j + i * 4, target: j + 1 + i * 4 });

    unique++;
  }
}
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j < 3; j++) {
    array.push({ id: unique, source: j + 4 * i, target: j - 4 + 4 * i });

    unique++;
  }
}
console.log(JSON.stringify(array));
