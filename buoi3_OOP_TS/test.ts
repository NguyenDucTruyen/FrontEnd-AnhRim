import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

class Student {
  name: string;
  age: number;
  job: string;

  constructor(name: string, age: number, job: string) {
    this.name = name;
    this.age = age;
    this.job = job;
  }

  displayInfo(): void {
    rl.write(`Name: ${this.name}\t Age: ${this.age}\t Job: ${this.job}\n`);
  }
}

class StudentManager {
  private listSV: Student[] = [];
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.loadFromFile();
  }

  private loadFromFile(): void {
    try {
      const fileContent: string = fs.readFileSync(this.filePath, {
        encoding: "utf-8",
      });

      this.listSV = fileContent
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => {
          const [name, age, job] = line.split(",");
          return new Student(name, parseInt(age, 10), job);
        });
    } catch (error) {
      console.log("Error loading file:", error);
    }
  }

  private saveToFile(): void {
    try {
      const lines = this.listSV
        .map((student) => `${student.name},${student.age},${student.job}`)
        .join("\n");

      fs.writeFileSync(this.filePath, lines);
    } catch (error) {
      console.log("Error saving file:", error);
    }
  }

  public addStudent(student: Student): void {
    this.listSV.push(student);
    this.saveToFile();
  }

  public displayAllStudents(): void {
    this.listSV.forEach((student) => {
      student.displayInfo();
    });
  }

  public searchStudentsByName(name: string): Student[] {
    return this.listSV.filter((student) =>
      student.name.toLowerCase().includes(name.toLowerCase())
    );
  }
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main(): Promise<void> {
  const studentManager = new StudentManager(path.resolve("./danh-sach.txt"));

  let thuchien = true;
  while (thuchien) {
    const menu: string = `\n\nMenu:\n1. Nhap sinh vien moi\n2. Hien thi danh sach sinh vien\n3. Tim kiem sinh vien\n4. Thoat\nLua chon cua ban:`;

    const choice: string = await ask(menu);

    switch (choice) {
      case "1":
        const student = new Student("", 0, "");
        await ask("Ho va ten:").then((value) => {
          student.name = value;
        });
        await ask("Tuoi:").then((value) => {
          student.age = parseInt(value, 10);
        });
        await ask("Nghe nghiep:").then((value) => {
          student.job = value;
        });
        studentManager.addStudent(student);
        break;
      case "2":
        studentManager.displayAllStudents();
        break;
      case "3":
        const keyword = await ask("Nhap ten sinh vien:");
        const searchResults = studentManager.searchStudentsByName(keyword);
        searchResults.forEach((result) => {
          const studentSearch = new Student(result.name,result.age,result.job)
          studentSearch.displayInfo()
        });
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
