import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
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

    "/*": index,

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
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
