const fs = require("fs");
const path = require("path");

function getFolderStructure(dirPath, indent = "") {
  const items = fs.readdirSync(dirPath);
  let result = "";

  items.forEach((item, index) => {
    // Skip 'node_modules' folder
    if (item === "node_modules" || item === ".git") return;

    const fullPath = path.join(dirPath, item);
    const stats = fs.statSync(fullPath);

    // Add the current item (file/folder name) to the result
    const isLastItem = index === items.length - 1;
    const prefix = isLastItem ? "└── " : "├── ";
    result += indent + prefix + item + "\n";

    if (stats.isDirectory()) {
      // Recursively process subdirectories with indentation
      result += getFolderStructure(
        fullPath,
        indent + (isLastItem ? "    " : "│   ")
      );
    }
  });

  return result;
}

console.log(getFolderStructure(__dirname));
