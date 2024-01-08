import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

interface Student {
  name: string;
  age: string;
  job: string;
}

const fileContent: string = fs.readFileSync(path.resolve("./danh-sach.txt"), {
  encoding: "utf-8",
});

let listSV: Student[] = fileContent
  .split("\n")
  .filter((line) => line.trim() !== "")
  .map((line) => {
    const [name, age, job] = line.split(",");
    return { name, age, job };
  });

function writeFile(listSV: Student[]): void {
  let lines = "";
  listSV.forEach((e) => {
    lines += `${e.name},${e.age},${e.job}\n`;
  });

  fs.writeFile(path.resolve("./danh-sach.txt"), lines, (err) => {
    if (err) console.log(err);
  });
}

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function input(): Promise<void> {
  let tieptuc = true;

  while (tieptuc) {
    let student: Student = {
      name: "",
      age: "",
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
        switch (value.toUpperCase()) {
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

function show(anArray: Student[]): void {
  let lines = "";
  anArray.forEach((e) => {
    lines += `${e.name},${e.age},${e.job}\n`;
  });
  rl.write(lines);
}

async function searchSV(): Promise<void> {
  let searchResults: Student[] = [];
  await ask("Nhap ten sinh vien:").then((value) => {
    searchResults = listSV.filter((e) =>
      e.name.toLowerCase().includes(value.toLowerCase())
    );
  });
  show(searchResults);
}

async function main(): Promise<void> {
  let thuchien = true;
  while (thuchien) {
    const menu: string = `\n\nMenu:\n1. Nhap sinh vien moi\n2. Hien thi danh sach sinh vien\n3. Tim kiem sinh vien\n4. Thoat\nLua chon cua ban:`;

    const choice: string = await ask(menu);

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
