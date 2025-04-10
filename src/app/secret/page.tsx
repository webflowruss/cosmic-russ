import { getCloudflareContext } from "@opennextjs/cloudflare";

type Env = {
  MY_SECRET: string;
};

export const dynamic = "force-dynamic";
export default async function Home() {
  const { env } = await getCloudflareContext<Env>({ async: true });
  const secret = (env as Env).MY_SECRET;
  return (
    <div>
      <p>Secret: {secret ? secret : "secret not found"}</p>
    </div>
  );
}
