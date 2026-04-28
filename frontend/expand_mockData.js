// const fs = require('fs');

// let content = fs.readFileSync('src/data/mockData.js', 'utf8');
// const match = content.match(/const categories = (\{[\s\S]*?\});\n\nconst variations/);

// if (match) {
//     let catStr = match[1];
//     let categories;
//     eval('categories = ' + catStr);
    
//     for (let cat in categories) {
//         let items = categories[cat];
//         let newItems = [...items];
//         let suffixes = ['Pro', 'Max'];
//         let imgIndex = 10;
//         for (let s of suffixes) {
//             for (let i = 0; i < 10; i++) {
//                 let oldItem = items[i];
//                 newItems.push({
//                     base: `${oldItem.base} ${s}`,
//                     img: `https://picsum.photos/seed/${cat}${s.toLowerCase()}${i}/500/500`,
//                     brand: oldItem.brand
//                 });
//                 imgIndex++;
//             }
//         }
//         categories[cat] = newItems;
//     }
    
//     let newCatStr = JSON.stringify(categories, null, 2);
//     // remove quotes from keys for cleaner JS
//     newCatStr = newCatStr.replace(/\"([a-zA-Z0-9_-]+)\":/g, '$1:');
//     let newContent = content.replace(catStr, newCatStr);
    
//     // Modify the loop
//     const newLoop = `for (let i = 0; i < bases.length; i++) {
//     const baseObj = bases[i];
//     generatedProducts.push({`;
    
//     newContent = newContent.replace(/for \(let i = 0; i < 30; i\+\+\) \{[\s\S]*?generatedProducts\.push\(\{/, newLoop);
//     newContent = newContent.replace(/name: `\$\{baseObj\.base\}\$\{space\}\$\{variant\}`/, 'name: baseObj.base');
//     newContent = newContent.replace(/const variations = \['', 'Pro', 'Edition', 'Plus'\];\n\n/, '');
    
//     fs.writeFileSync('src/data/mockData.js', newContent);
//     console.log('Successfully expanded mockData.js to 30 items per category.');
// } else {
//     console.log('Failed to match categories object.');
// }
