import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client used by the work-inquiries route handler.
 *
 * It uses the publishable (anon) key, not the service role key, and deliberately
 * so: the work_inquiries table has RLS on with a single INSERT policy and no
 * SELECT policy, so this key can add an enquiry and cannot read one back. A
 * service role key would work too, but it bypasses RLS entirely — if it ever
 * leaked it would expose the whole database rather than one write-only table.
 *
 * The key is still kept server-side (no NEXT_PUBLIC_ prefix, so Next.js will not
 * inline it into the browser bundle) because nothing on the client needs it.
 */
export const getSupabaseClient = () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
};
