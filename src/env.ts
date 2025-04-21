import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env=createEnv({
  server: {},
  clientPrefix: "NEXT_PUBLIC_",

  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    NEXT_PUBLIC_WIX_CLIENT_ID: z.string().min(1)
  },
 
  runtimeEnv: process.env
})