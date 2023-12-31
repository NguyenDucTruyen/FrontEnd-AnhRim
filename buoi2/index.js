const { rejects } = require("assert");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const fileContent = fs.readFileSync(path.resolve("./danh-sach.txt"), {
  encoding: "utf-8",
});

let listSV = fileContent
  .split("\n")
  .filter((line) => line.trim() !== "")
  .map((line) => {
    const [name, age, job] = line.split(",");
    return { name, age, job };
  });

function writeFile(listSV) {
  let lines = "";
  listSV.forEach((e) => {
    lines += `${e.name},${e.age},${e.job}\n`;
  });

  fs.writeFile(path.resolve("./danh-sach.txt"), lines, (err) => {
    if (err) console.log(err);
  });
}

function ask(question) {
  return new Promise((resolve, rejects) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function input() {
  let tieptuc = true;

  while (tieptuc) {
    let student = {
      name: "",
      age: 0,
      job: "",
    };

    await ask("Ho va ten:").then((value) => {
      student.name = value;
    });
    await ask("Tuoi:").then((value) => {
      student.age = value;
    });
    await ask("Nghe nghiep:").then((value) => {
      student.job = value;
    });
    await ask("Nhan 'y' de tiep tuc, pham bat ky de ket thuc:").then(
      (value) => {
        switch (value) {
          case "y":
          case "Y":
            listSV.push({ ...student });
            tieptuc = true;
            break;
          default:
            tieptuc = false;
            listSV.push({ ...student });
            writeFile(listSV);
            break;
        }
      }
    );
  }
}

function show(anArray) {
  let lines = "";
  anArray.forEach((e) => {
    lines += `${e.name},${e.age},${e.job}\n`;
  });
  rl.write(lines);
}

async function searchSV() {
  let searchResults = [];
  await ask("Nhap ten sinh vien:").then((value) => {
    searchResults = listSV.filter((e) =>
      e.name.toLowerCase().includes(value.toLowerCase())
    );
  });
  show(searchResults);
}

async function main() {
  let thuchien = true;
  while (thuchien) {
    const menu = `\n\nMenu:\n1. Nhap sinh vien moi\n2. Hien thi danh sach sinh vien\n3. Tim kiem sinh vien\n4. Thoat\nLua chon cua ban:`;

    const choice = await ask(menu);

    switch (choice) {
      case "1":
        await input();
        break;
      case "2":
        show(listSV);
        break;
      case "3":
        await searchSV();
        break;

      default:
        thuchien = false;
        rl.write("Ket thuc chuong trinh");
        rl.close();
        break;
    }
  }
}

main();
