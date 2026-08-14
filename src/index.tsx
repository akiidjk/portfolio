import { serve } from "bun";
import { renderToReadableStream } from "react-dom/server";
import tailwindPlugin from "bun-plugin-tailwind";
import { Document } from "./Document";

const isProd = process.env.NODE_ENV === "production";

// Bundle the client hydration entry + Tailwind CSS once at boot.
// `bun --hot` re-executes this module (and rebuilds) whenever a
// dependency changes, so a browser refresh picks up new code.
const clientBuild = await Bun.build({
  entrypoints: ["./src/entry-client.tsx", "./src/index.css"],
  target: "browser",
  minify: isProd,
  sourcemap: isProd ? "none" : "linked",
  naming: "[name].[ext]",
  define: { "process.env.NODE_ENV": JSON.stringify(isProd ? "production" : "development") },
  plugins: [tailwindPlugin],
});

if (!clientBuild.success) {
  for (const log of clientBuild.logs) console.error(log);
  throw new Error("Client bundle failed to build");
}

const clientRoutes: Record<string, Response> = {};
for (const output of clientBuild.outputs) {
  clientRoutes["/" + output.path.split("/").pop()] = new Response(output, {
    headers: { "Content-Type": output.type },
  });
}

const server = serve({
  routes: {
    "/assets/*": {
      async GET(req) {
        const path = (new URL(req.url).pathname).replace("/assets/", "src/assets/");
        const file = Bun.file(path);
        return new Response(file);
      },
    },

    "/robots.txt": new Response(Bun.file("public/robots.txt"), { headers: { "Content-Type": "text/plain; charset=utf-8" } }),
    "/llms.txt": new Response(Bun.file("public/llms.txt"), { headers: { "Content-Type": "text/plain; charset=utf-8" } }),
    "/sitemap.xml": new Response(Bun.file("public/sitemap.xml"), { headers: { "Content-Type": "application/xml; charset=utf-8" } }),

    ...clientRoutes,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },

    // SSR fallback for every other (non-API, non-asset) route — the
    // client router then takes over for in-app navigation.
    "/*": async (req) => {
      const { pathname } = new URL(req.url);
      const stream = await renderToReadableStream(<Document initialPath={pathname} />, {
        bootstrapModules: ["/entry-client.js"],
        onError(error) {
          console.error(error);
        },
      });
      return new Response(stream, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
