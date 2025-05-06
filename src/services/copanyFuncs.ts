"use server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { CopanyService } from "@/services/copanyService";

export async function getCopanies() {
  const apiService = new CopanyService(
    (await getCloudflareContext({ async: true })).env.DB
  );
  return await apiService.getAll();
}
