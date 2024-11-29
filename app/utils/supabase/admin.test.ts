import { createClient } from "@supabase/supabase-js"
import Stripe from "stripe"
import { upsertProductRecord } from "./admin"


describe("Supabase Admin Permissions", () => {
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY || ""
    )

    test("Environment variables are loaded", () => {
        expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBeDefined()
        expect(process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY).toBeDefined()
    })

    test("can read data from a table", async () => {
        const { data, error } = await supabaseAdmin.from("products").select("*")
        expect(error).toBeNull()
        expect(data).toBeDefined()
        expect(Array.isArray(data)).toBe(true)
    })

})


describe("upsertProductRecord", () => {
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY || ""
    )

    console.log("URL", process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log("SERVICE_KEY", process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY)

    const testProduct: Stripe.Product = {
        id: 'prod_test_123',
        active: true,
        name: 'Test Product',
        description: 'A product for testing',
        images: ['https://example.com/image.jpg'],
        metadata: { category: 'test' },
        created: Math.floor(Date.now() / 1000), // Stripe timestamp
        updated: Math.floor(Date.now() / 1000), // Stripe timestamp
        object: 'product',
        livemode: false,
        marketing_features: [],
        package_dimensions: null,
        shippable: null,
        tax_code: null,
        type: "good",
        url: null
    };

    afterAll(async () => {
        // Clean up the database after the test
        await supabaseAdmin.from('products').delete().eq('id', testProduct.id);
    });

    test('should insert or update a product record successfully', async () => {
        try {
            await upsertProductRecord(testProduct);

            // Verify that the product was inserted/updated in the database
            const { data, error } = await supabaseAdmin
                .from('products')
                .select('*')
                .eq('id', testProduct.id)
                .single();

            expect(error).toBeNull();
            expect(data).toBeDefined();
            expect(data.id).toBe(testProduct.id);
            expect(data.name).toBe(testProduct.name);
            expect(data.description).toBe(testProduct.description);
            expect(data.image).toBe(testProduct.images[0]);
            expect(data.metadata).toEqual(testProduct.metadata);
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });
});
