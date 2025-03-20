//app\routes\SSE-service.ts
 import { SSEService } from "~/lib/server/sse.server";
import bossTrackerService from "~/lib/services/BossTrackerService.server";
import { LoaderFunction } from "@remix-run/node";

const sseService = new SSEService('bossDataUpdate', () => bossTrackerService);

export const loader: LoaderFunction = sseService.getLoader();