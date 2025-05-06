"use client";
import { useEffect } from "react";
import { Copany } from "@/types/types";
import { useState } from "react";
import { deleteCopany, getCopanies } from "@/services/copanyFuncs";

export default function CopanyList() {
  const [copanies, setCopanies] = useState<Copany[]>([]);
  const [status, setStatus] = useState<"loading" | "failed" | "success">(
    "loading"
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCopanies()
      .then((copanies) => {
        const typedCopanies = copanies.map((copany) => ({
          id: Number(copany.id),
          github_url: String(copany.github_url),
          name: String(copany.name),
          description: String(copany.description),
          created_by: Number(copany.created_by),
          project_type: String(copany.project_type),
          project_stage: String(copany.project_stage),
          main_language: String(copany.main_language),
          license: String(copany.license),
          created_at: String(copany.created_at),
          updated_at: copany.updated_at ? String(copany.updated_at) : null,
        }));
        setCopanies(typedCopanies);
        setStatus("success");
      })
      .catch((error) => {
        setError(error.message);
        setStatus("failed");
      });
  }, []);

  if (status === "loading") {
    return <div className="text-sm font-bold text-gray-700">Loading...</div>;
  }

  if (status === "failed") {
    return (
      <div className="text-sm font-bold text-gray-700">Error: {error}</div>
    );
  }

  return (
    <div>
      <ul className="space-y-6">
        {copanies.map((copany) => (
          <li key={copany.id} className="space-y-2">
            <div className="font-medium text-lg text-black">{copany.name}</div>
            <div className="text-gray-600">{copany.description}</div>
            <div className="text-sm text-gray-500">ID: {copany.id}</div>
            <div className="text-sm text-gray-500">
              github_url:{" "}
              <a
                href={copany.github_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copany.github_url}
              </a>
            </div>
            <div className="text-sm text-gray-500">
              project_type: {copany.project_type}
            </div>
            <div className="text-sm text-gray-500">
              project_stage: {copany.project_stage}
            </div>
            <div className="text-sm text-gray-500">
              main_language: {copany.main_language}
            </div>
            <div className="text-sm text-gray-500">
              license: {copany.license}
            </div>
            <div className="text-sm text-gray-500">
              created_at: {copany.created_at}
            </div>
            <div className="text-sm text-gray-500">
              updated_at: {copany.updated_at}
            </div>

            {/* <button
              onClick={async () => {
                await handleEdit(copany.id);
              }}
              className="text-black hover:text-gray-800 transition-colors cursor-pointer"
            >
              edit
            </button> */}
            <button
              onClick={async () => {
                await deleteCopany(copany.id);
              }}
              className="text-black hover:text-gray-800 transition-colors cursor-pointer mx-2"
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
