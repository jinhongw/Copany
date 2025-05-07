import CopanyList from "@/components/CopanyList";
import { signIn, signOut, auth } from "./auth";
import { updateRecord } from "@auth/d1-adapter";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { redirect } from "next/navigation";
import Image from "next/image";
async function updateName(formData: FormData): Promise<void> {
  "use server";
  const session = await auth();
  if (!session?.user?.id) {
    return;
  }
  const name = formData.get("name") as string;
  if (!name) {
    return;
  }
  const query = `UPDATE users SET name = $1 WHERE id = $2`;
  await updateRecord(
    (
      await getCloudflareContext({ async: true })
    ).env.DB,
    query,
    [name, session.user.id]
  );
  redirect("/");
}

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <div className="p-8">
        <div>
          <p>Welcome to Copany</p>
        </div>

        {session ? (
          <div>
            <div>
              <div>
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || ""}
                    className="w-32 h-32"
                    width={100}
                    height={100}
                  />
                ) : (
                  <span className="rounded-md p-2 bg-gray-200 border-1 border-gray-300">
                    {session.user?.name?.[0] || "U"}
                  </span>
                )}
              </div>
              <div>
                <p>{session.user?.name || "No name set"}</p>
                <p>{session.user?.email}</p>
              </div>
            </div>

            <div>
              <p>User ID: {session.user?.id}</p>
            </div>

            <form action={updateName} className="flex gap-2">
              <div>
                <input
                  id="name"
                  name="name"
                  placeholder="Enter new name"
                  className="rounded-md border-1 border-gray-300 px-2"
                />
              </div>
              <button
                type="submit"
                className="cursor-pointer rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 border-1 border-gray-300 px-2"
              >
                Update Name
              </button>
            </form>
          </div>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn();
            }}
          >
            <button
              type="submit"
              className="cursor-pointer rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 border-1 border-gray-300 px-2"
            >
              Sign in with Github
            </button>
          </form>
        )}

        {session && (
          <div>
            <form
              action={async () => {
                "use server";
                await signOut();
                Response.redirect("/");
              }}
            >
              <button
                type="submit"
                className="cursor-pointer rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 border-1 border-gray-300 mt-2 px-2"
              >
                Sign out
              </button>
            </form>
          </div>
        )}
        <div className="pt-8">
          {/* <form
            action={async () => {
              "use server";
              await createCopany({
                name: "Test Copany",
                description: "Test Description",
                github_url: "https://github.com/test.com",
                created_by: 1,
                project_type: "Test Project Type",
                project_stage: "Test Project Stage",
                main_language: "Test Main Language",
                license: "Test License",
              });
              const copanies = await getCopanies();
              console.log(copanies);
            }}
          >
            <button type="submit">Create Copany</button>
          </form> */}
          <CopanyList />
        </div>
      </div>
    </main>
  );
}
