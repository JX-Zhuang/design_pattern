class Folder {
    constructor(name) {
        this.name = name;
        this.files = [];
        this.parent = null;
    }
    add() {
        const files = [...arguments];
        for (const file of files) {
            file.parent = this;
        }
        this.files.push(...arguments);
    }
    scan() {
        console.log('开始扫描文件夹：' + this.name);
        for (const file of this.files) {
            file.scan();
        }
    }
    remove() {
        if (!this.parent) return;
        const files = this.parent.files;
        for (let i = 0; i < files.length; i++) {
            if (files[i] === this) {
                files.splice(i, 1);
            }
        }
    }
}
class File {
    constructor(name) {
        this.name = name;
        this.parent = null;
    }
    scan() {
        console.log('开始扫描文件：' + this.name);
    }
    remove() {
        if (!this.parent) return;
        const files = this.parent.files;
        for (let i = 0; i < files.length; i++) {
            if (files[i] === this) {
                files.splice(i, 1);
            }
        }
    }
}
const folder = new Folder('图书馆'),
    folder1 = new Folder('计算机'),
    folder2 = new Folder('文学');
const folderFE = new Folder('前端'),
    folderBE = new Folder('后端');
const folderLX = new Folder('鲁迅'),
    folderLB = new Folder('李白');
const fileJS = new File('js'),
    fileNode = new File('node'),
    fileJava = new File('Java'),
    filePython = new File('Python');
const fileKuang = new File('狂人日记'),
    fileNa = new File('呐喊'),
    fileJing = new File('静夜思'),
    fileYue = new File('月下独酌');

folder.add(folder1, folder2);

folder1.add(folderFE, folderBE);
folderFE.add(fileJS, fileNode);
folderBE.add(fileJava, filePython);

folder2.add(folderLB, folderLX);
folderLB.add(fileJing, fileYue);
folderLX.add(fileKuang, fileNa);

folder1.scan();
console.log('----remove----');
filePython.remove();
folderFE.remove();
folder1.scan();