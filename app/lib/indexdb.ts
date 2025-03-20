import { openDB } from "idb";

// Función para inicializar IndexedDB
async function initDB() {
  const db = await openDB("filterDB", 1, {
    upgrade(db) {
      db.createObjectStore("filters");
    },
  });
  return db;
}

// Guardar filtros en IndexedDB
export async function saveFilters(filters) {
  const db = await initDB();
  await db.put("filters", filters, "activeFilters");
}

// Obtener filtros desde IndexedDB
export async function getFilters() {
  const db = await initDB();
  const filters = await db.get("filters", "activeFilters");
  return filters || {};
}
