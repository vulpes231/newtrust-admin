import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
});

// [2025-09-14T17:37:40.192Z] [PID: 10923] [NODE-CRON] [WARN] missed execution at Sun Sep 14 2025 00:00:00 GMT+0100 (West Africa Standard Time)! Possible blocking IO or high CPU user at the same process used by node-cron.
// [2025-09-14T17:37:40.206Z] [PID: 10923] [NODE-CRON] [WARN] missed execution at Sun Sep 14 2025 01:00:00 GMT+0100 (West Africa Standard Time)! Possible blocking IO or high CPU user at the same process used by node-cron.
// [2025-09-14T17:37:40.215Z] [PID: 10923] [NODE-CRON] [WARN] missed execution at Sun Sep 14 2025 02:00:00 GMT+0100 (West Africa Standard Time)! Possible blocking IO or high CPU user at the same process used by node-cron.
// [2025-09-14T17:37:40.226Z] [PID: 10923] [NODE-CRON] [WARN] missed execution at Sun Sep 14 2025 03:00:00 GMT+0100 (West Africa Standard Time)! Possible blocking IO or high CPU user at the same process used by node-cron.
