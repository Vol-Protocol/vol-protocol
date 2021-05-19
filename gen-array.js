let arr = [];
for (let i = 0; i < 30; i++) {
  if (i % 2 == 0) {
    arr.push(3000);
  } else {
    arr.push(2900);
  }
}
console.log(JSON.stringify(arr));
