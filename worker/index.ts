export interface Env {
  DB: D1Database;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-API-Key",
  "Access-Control-Max-Age": "86400",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    try {
      // Route pattern: /api/:table or /api/:table/:id
      const parts = url.pathname.split("/").filter(Boolean);
      if (parts[0] !== "api" || parts.length < 2) {
        return new Response(JSON.stringify({ error: "Not Found" }), {
          status: 404,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      }

      // Handle both /api/:table and /api/v1/:table
      const startIndex = parts[1] === "v1" ? 2 : 1;
      if (parts.length <= startIndex) {
        return new Response(JSON.stringify({ error: "Not Found" }), {
          status: 404,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      }

      const table = parts[startIndex];
      const id = parts[startIndex + 1];

      // Sanitize table name to prevent SQL injection
      if (!/^[a-zA-Z0-9_]+$/.test(table)) {
        return new Response(JSON.stringify({ error: "Invalid table name" }), {
          status: 400,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      }

      // GET - Fetch all or by ID
      if (request.method === "GET") {
        if (id) {
          const result = await env.DB.prepare(`SELECT * FROM ${table} WHERE id = ?`).bind(id).first();
          if (!result) {
            return new Response(JSON.stringify({ error: "Not Found" }), {
              status: 404,
              headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
            });
          }
          return new Response(JSON.stringify(result), {
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
          });
        } else {
          const { results } = await env.DB.prepare(`SELECT * FROM ${table} ORDER BY id DESC`).all();
          return new Response(JSON.stringify(results), {
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
          });
        }
      }

      // POST - Insert record
      if (request.method === "POST") {
        const body: any = await request.json();
        const keys = Object.keys(body).filter(k => k !== "id");
        const placeholders = keys.map(() => "?").join(", ");
        const sql = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders}) RETURNING *`;
        const result = await env.DB.prepare(sql).bind(...keys.map(k => body[k])).first();
        return new Response(JSON.stringify(result), {
          status: 201,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      }

      // PUT - Update record by ID
      if (request.method === "PUT" && id) {
        const body: any = await request.json();
        const keys = Object.keys(body).filter(k => k !== "id");
        const setClause = keys.map(k => `${k} = ?`).join(", ");
        const sql = `UPDATE ${table} SET ${setClause} WHERE id = ? RETURNING *`;
        const result = await env.DB.prepare(sql).bind(...keys.map(k => body[k]), id).first();
        return new Response(JSON.stringify(result), {
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      }

      // DELETE - Delete record by ID
      if (request.method === "DELETE" && id) {
        await env.DB.prepare(`DELETE FROM ${table} WHERE id = ?`).bind(id).run();
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });

    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }
  },
};
