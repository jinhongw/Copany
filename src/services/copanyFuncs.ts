"use server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { CopanyService } from "@/services/copanyService";
import { Copany } from "@/types/types";

export async function getCopanies() {
  const apiService = new CopanyService(
    (await getCloudflareContext({ async: true })).env.DB
  );
  return await apiService.getAll();
}

export async function updateCopany(
  id: number,
  copany: Partial<Omit<Copany, "id" | "created_at" | "updated_at">>
) {
  const apiService = new CopanyService(
    (await getCloudflareContext({ async: true })).env.DB
  );
  return await apiService.update(id, copany);
}

export async function createCopany(
  copany: Omit<Copany, "id" | "created_at" | "updated_at">
) {
  const apiService = new CopanyService(
    (await getCloudflareContext({ async: true })).env.DB
  );
  return await apiService.create(copany);
}

export async function deleteCopany(id: number) {
  const apiService = new CopanyService(
    (await getCloudflareContext({ async: true })).env.DB
  );
  return await apiService.delete(id);
}
