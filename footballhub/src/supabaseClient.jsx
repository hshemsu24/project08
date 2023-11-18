import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://smywirsxepshhyxgcdzs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNteXdpcnN4ZXBzaGh5eGdjZHpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4OTQzMDUsImV4cCI6MjAxNDQ3MDMwNX0.5ZIAAbJo-rwNJYINoE4mnTFCH5DKnMztqc4mZZ4dpKo';
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;