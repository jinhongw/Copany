"use client";
import { useEffect } from "react";
import { Copany } from "@/types/types";
import { useState } from "react";
import {
  createCopany,
  deleteCopany,
  getCopanies,
} from "@/services/copanyFuncs";
import { useSession, signIn } from "next-auth/react";

export default function CopanyList() {
  const [copanies, setCopanies] = useState<Copany[]>([]);
  const [status, setStatus] = useState<"loading" | "failed" | "success">(
    "loading"
  );
  const [error, setError] = useState<string | null>(null);
  const { data: session, status: authStatus } = useSession();

  useEffect(() => {
    getCopanies()
      .then((copanies) => {
        const typedCopanies: Copany[] = copanies.map((copany) => {
          const item: Copany = {
            id: Number(copany.id),
            github_url: String(copany.github_url),
            name: String(copany.name),
            description: String(copany.description),
            created_by: String(copany.created_by),
            project_type: String(copany.project_type),
            project_stage: String(copany.project_stage),
            main_language: String(copany.main_language),
            license: String(copany.license),
            created_at: String(copany.created_at),
            updated_at: copany.updated_at ? String(copany.updated_at) : null,
          };
          return item;
        });
        setCopanies(typedCopanies);
        setStatus("success");
      })
      .catch((error) => {
        setError(error.message);
        setStatus("failed");
      });
  }, []);

  if (status === "loading") {
    return <div className="text-sm font-bold">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-sm font-bold">Error: {error}</div>;
  }

  return (
    <div>
      <button
        className="cursor-pointer rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 border-1 border-gray-300 px-2 mb-2"
        disabled={authStatus !== "authenticated"}
        onClick={async () => {
          if (!session?.user?.id) {
            signIn();
            return;
          }
          await createCopany({
            name: "Test Copany",
            description: "Test Description",
            github_url: "https://github.com/test.com",
            created_by: session.user.id,
            project_type: "Test Project Type",
            project_stage: "Test Project Stage",
            main_language: "Test Main Language",
            license: "Test License",
          });
          const copanies = await getCopanies();
          const typedCopanies: Copany[] = copanies.map((copany) => {
            const item: Copany = {
              id: Number(copany.id),
              github_url: String(copany.github_url),
              name: String(copany.name),
              description: String(copany.description),
              created_by: String(copany.created_by),
              project_type: String(copany.project_type),
              project_stage: String(copany.project_stage),
              main_language: String(copany.main_language),
              license: String(copany.license),
              created_at: String(copany.created_at),
              updated_at: copany.updated_at ? String(copany.updated_at) : null,
            };
            return item;
          });
          setCopanies(typedCopanies);
          console.log(typedCopanies);
        }}
      >
        Create Copany
      </button>
      <ul className="space-y-6">
        {copanies.map((copany) => (
          <li key={copany.id} className="space-y-2">
            <div className="font-medium text-lg">{copany.name}</div>
            <div className="">{copany.description}</div>
            <div className="text-sm">ID: {copany.id}</div>
            <div className="text-sm">
              github_url:{" "}
              <a
                href={copany.github_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copany.github_url}
              </a>
            </div>
            <div className="text-sm">project_type: {copany.project_type}</div>
            <div className="text-sm">project_stage: {copany.project_stage}</div>
            <div className="text-sm">main_language: {copany.main_language}</div>
            <div className="text-sm">license: {copany.license}</div>
            <div className="text-sm">created_at: {copany.created_at}</div>
            <div className="text-sm">updated_at: {copany.updated_at}</div>
            <div className="text-sm">created_by: {copany.created_by}</div>
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
                setCopanies(copanies.filter((c) => c.id !== copany.id));
              }}
              className="text-sm cursor-pointer rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 border-1 border-gray-300 px-2"
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
