// src/utils/csv.js
import Papa from "papaparse";
import { STATUSES } from "../db";

// colonne suggerite
export const CSV_COLUMNS = [
  "company",
  "role",
  "location",
  "status",
  "link",
  "tags",
  "createdAt"
];

// -> stringa CSV
export function toCsv(apps) {
  const rows = apps.map((a) => ({
    company: a.company || "",
    role: a.role || "",
    location: a.location || "",
    status: a.status || "Applied",
    link: a.link || "",
    tags: Array.isArray(a.tags) ? a.tags.join(", ") : (a.tags || ""),
    createdAt: a.createdAt ? new Date(a.createdAt).toISOString() : ""
  }));
  return Papa.unparse(rows, { columns: CSV_COLUMNS });
}

// scarica file
export function downloadText(filename, text, mime = "text/csv;charset=utf-8;") {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// parse file CSV -> array di oggetti
export function parseCsvFile(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => resolve(data),
      error: reject,
    });
  });
}

// normalizza una riga verso il modello "application"
export function normalizeRow(row) {
  const valid = new Set(STATUSES.map((s) => s.toLowerCase()));
  const raw = (row.status || "Applied").toString().trim().toLowerCase();
  const match = STATUSES.find((s) => s.toLowerCase() === raw) || "Applied";

  const tags = String(row.tags || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const createdAt = row.createdAt
    ? Date.parse(row.createdAt) || Date.now()
    : Date.now();

  return {
    company: (row.company || "(Untitled)").toString().trim(),
    role: (row.role || "").toString().trim(),
    location: (row.location || "").toString().trim(),
    status: match,
    link: (row.link || "").toString().trim(),
    tags,
    createdAt,
    order: 0,
  };
}
