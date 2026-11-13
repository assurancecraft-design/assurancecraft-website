import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {dirname,resolve,sep} from 'node:path';
const files=JSON.parse(await readFile(new URL('./site-source.json',import.meta.url),'utf8'));
const root=resolve('dist');
for(const [name,data] of Object.entries(files)){
 const target=resolve(root,name);
 if(!target.startsWith(root+sep))throw Error('Invalid path');
 await mkdir(dirname(target),{recursive:true});
 await writeFile(target,Buffer.from(data,'base64'));
}
console.log(`Prepared ${Object.keys(files).length} public static files`);
