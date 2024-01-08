const height: Number = 123;
console.log("Number:", height);

class Lazystring {
  key = "";
  constructor(key: string) {}

  toString() {
    return this.key;
  }
}
const DAY_LABEL = {
  MON: new Lazystring("MONDAY"),
};
