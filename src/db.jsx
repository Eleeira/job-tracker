// src/db.js
import Dexie from "dexie";

export const db = new Dexie("jobtracker");
db.version(1).stores({
  applications: "++id,company,role,status,createdAt,order",
});

export const STATUSES = ["Applied", "Interviewing", "Offer", "Rejected"];

export async function seedIfEmpty() {
  const count = await db.applications.count();
  if (count > 0) return;
  const now = Date.now();
  await db.applications.bulkAdd([
    { company: "Acme Corp",   role: "Frontend Dev",   status: "Applied",      location:"Remote",   createdAt: now-864e5*10, order:0, link:"#", tags:["react"] },
    { company: "Nordic Labs", role: "UI Engineer",    status: "Interviewing", location:"Stockholm",createdAt: now-864e5*6,  order:0, link:"#", tags:["tailwind"] },
    { company: "Pixel Studio",role: "Frontend Intern",status: "Offer",        location:"Hybrid",   createdAt: now-864e5*3,  order:0, link:"#", tags:["internship"] },
    { company: "Legacy Co",   role: "Web Developer",  status: "Rejected",     location:"Remote",   createdAt: now-864e5*20, order:0, link:"#", tags:["js"] },
  ]);
}

async function nextOrder(status) {
  const n = await db.applications.where({ status }).count();
  return n; // append at end
}

export async function createApplication(data) {
  const status = data.status || "Applied";
  const id = await db.applications.add({
    company: data.company?.trim() || "(Untitled)",
    role: data.role?.trim() || "",
    location: data.location?.trim() || "",
    status,
    link: data.link?.trim() || "",
    tags: Array.isArray(data.tags)
      ? data.tags
      : String(data.tags || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
    createdAt: Date.now(),
    order: await nextOrder(status),
  });
  return id;
}

export async function updateApplication(id, updates) {
  const payload = { ...updates };
  if (typeof payload.tags === "string") {
    payload.tags = payload.tags
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  await db.applications.update(id, payload);
}

export async function deleteApplication(id) {
  await db.applications.delete(id);
}
