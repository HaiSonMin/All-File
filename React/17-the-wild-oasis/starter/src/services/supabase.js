/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qhijbhjfbqanzkhpvtkv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoaWpiaGpmYnFhbnpraHB2dGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgzMTA0NjksImV4cCI6MjAwMzg4NjQ2OX0.S0oBTXWHm22mzIBTT5ia3y_SdGppp0Y-9pYBvVDLuOI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
