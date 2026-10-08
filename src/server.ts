import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);

      // Handle REST API health check
      if (url.pathname === "/api/health") {
        return new Response(
          JSON.stringify({
            status: "healthy",
            service: "Chouhan Firetech Services API",
            timestamp: new Date().toISOString(),
            company: "Chouhan Firetech Services",
            gstin: "03DVBPS7608H1ZI",
            phone: "+91 9417828887",
            location: "Shop No. 1, Urna, Sub Division Banur, Mohali, Punjab",
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      }

      // Handle Clear All Admin & Backend Data
      if (url.pathname === "/api/admin/clear-all") {
        if (request.method === "OPTIONS") {
          return new Response(null, {
            status: 204,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
              "Access-Control-Allow-Headers": "Content-Type",
            },
          });
        }
        console.log("=================================================");
        console.log("🧹 [ADMIN DATA CLEAR] All backend data reset triggered");
        console.log("=================================================");
        return new Response(
          JSON.stringify({
            success: true,
            message: "All backend and admin panel data cleared successfully.",
            clearedAt: new Date().toISOString(),
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      }

      // Handle Quote / Lead Enquiry submission
      if (url.pathname === "/api/enquiry") {
        if (request.method === "OPTIONS") {
          return new Response(null, {
            status: 204,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
            },
          });
        }

        if (request.method === "POST") {
          try {
            const rawBody = await request.text();
            let body: Record<string, any> = {};

            if (rawBody && rawBody.trim()) {
              try {
                body = JSON.parse(rawBody);
              } catch {
                try {
                  const search = new URLSearchParams(rawBody);
                  body = Object.fromEntries(search.entries());
                } catch {
                  body = { raw: rawBody };
                }
              }
            }

            const referenceId = `CFS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
            const receivedAt = new Date().toISOString();

            const leadData = body as Record<string, any>;
            console.log("=================================================");
            console.log(`🔥 [NEW LEAD RECEIVED] Ref ID: ${referenceId}`);
            console.log(`👤 Name: ${leadData["name"] || "N/A"}`);
            console.log(`📞 Phone: ${leadData["phone"] || "N/A"}`);
            console.log(`📧 Email: ${leadData["email"] || "N/A"}`);
            console.log(`⏱️ Urgency: ${leadData["urgency"] || "Immediate"}`);
            console.log(`🏢 Property: ${leadData["property"] || "General"}`);
            console.log(`🛠️ Service: ${leadData["service"] || "General Scope"}`);
            console.log(`📝 Message: ${leadData["message"] || "None"}`);
            console.log(`🕒 Timestamp: ${receivedAt}`);
            console.log("=================================================");

            return new Response(
              JSON.stringify({
                success: true,
                referenceId,
                message: "Enquiry successfully registered and queued for 15-minute dispatch.",
                receivedAt,
                lead: {
                  ...body,
                  referenceId,
                  receivedAt,
                },
              }),
              {
                status: 200,
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
              }
            );
          } catch (parseError) {
            console.error("Failed to parse enquiry payload:", parseError);
            return new Response(
              JSON.stringify({
                success: false,
                error: "Invalid enquiry payload.",
              }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              }
            );
          }
        }

        return new Response(
          JSON.stringify({
            status: "ready",
            message: "Send POST request with JSON payload to submit fire safety lead.",
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
