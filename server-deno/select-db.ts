import { open, save } from "https://deno.land/x/sqlite/mod.ts";

// Open a database
const db = await open("data.db");

interface Menu {
  id: number,
  parentId?: number,
  moduleUrl?: string,
  moduleName?: string,
  moduleDescribe?: string,
  moduleSequence?: number,
}

// Print out data in table
for (const [id, parentId, moduleUrl, moduleName, moduleDescribe, moduleSequence] of db.query("SELECT * FROM Menu")) {
  console.log(id, parentId, moduleUrl, moduleName, moduleDescribe, moduleSequence);
}

db.close();
