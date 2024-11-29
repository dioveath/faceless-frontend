import dotenv from 'dotenv'

const envFile = ".env.local"
dotenv.config({ path: envFile })

// test("Variables is loaded", () => {
//     expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBeDefined()
//     expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined()
//     expect(process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY).toBeDefined()
// })