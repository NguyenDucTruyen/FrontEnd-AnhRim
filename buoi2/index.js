const { rejects } = require("assert");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const fileContent = fs.readFileSync(path.resolve("./danh-sach.txt"), {
  encoding: "utf-8",
});

// const danhsach = fileContent.split("\r\n").map((line) => {
//   const [name, age, job] = line.split(",");

//   return { name, age, job };
// });

function writeFile(listSV) {
  let lines = "";
  listSV.forEach((e) => {
    lines += `${e.name},${e.age},${e.job}\n`;
  });
  
  fs.writeFile(path.resolve("./danh-sach.txt"), lines, (err) => {
    if (err) console.log(err);
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve, rejects) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

let listSV = [];

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
    await ask("Nhan 'y' de tiep tuc, pham bat ky de ket thuc:").then((value) => {
      switch (value) {
        case "y":
        case "Y":
          listSV.push({...student});
          tieptuc = true;
          break;
        default:
          tieptuc = false;
          listSV.push({...student});
          break;
      }
    });
  }
}
input();

// 1. Nhap sinh vien moi
// 2. hien thi danh sach sv
// 3.  Tim kiem sinh vien
// 4. Thoat
