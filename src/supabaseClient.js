import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cevsjxqctilqzaeqllqc.supabase.co'
const supabaseAnonKey = 'sb_publishable_YNkr1UU_7IvOxPLLQxKPLw_AdC9raoO'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
