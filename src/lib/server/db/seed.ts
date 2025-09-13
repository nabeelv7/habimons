import habimons from "../../habimons";
import { db } from "./index";
import { marketPlaceTable } from "./schema";

// not working
export async function seedMarketPlace() {
	console.log("Inserting habimons 🐑");
	await db.insert(marketPlaceTable).values(habimons);
	console.log("Inserted habimons 🐑");
}
