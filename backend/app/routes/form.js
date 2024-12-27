// require('dotenv').config();
const express = require('express');
const supabase = require('../services/supabase');
const router = express.Router();

router.post('/', async (req, res) => {
    const formData = req.body;

    try {
        console.log('Supabase Client:', supabase); // Log the Supabase client to confirm it's initialized
        console.log('Incoming Form Data:', formData);

        const { data, error } = await supabase
            .from('responses') // Ensure this matches the exact table name
            .insert([
                {
                    name: formData.name,
                    phone: formData.phone,
                    age: formData.age,
                    q1: formData.q1,
                    q2: formData.q2,
                    q3: formData.q3,
                    q4: formData.q4,
                    q5: formData.q5,
                    q6: formData.q6,
                    q7: formData.q7,
                    q8: formData.q8,
                    q9: formData.q9,
                    q10: formData.q10,
                    q11: formData.q11,
                    q12: formData.q12,
                    brands: formData.brands,
                    drama1: formData.drama1,
                    food_preference: formData.food_preference,
                    barbecue_pref: formData.barbecue_pref,
                    spending_cats: formData.spending_cats,
                    referred_by: formData.referred_by || null,
                    // submitted_at: new Date(),
                },
            ]);

        if (error) {
            console.error('Supabase Insert Error:', error);
            return res.status(400).json({ error: error.message });
        }
        
        // const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5500';
        // Generate the referral link
        const referralName = formData.name.replace(/\s+/g, ''); // Remove spaces from name
        const referralLink = `https://supp-form.onrender.com/?ref=${referralName}`;

        console.log(referralName)

        res.status(200).json({ message: 'Form submitted successfully', referralLink, data   });
    } catch (err) {
        console.error('Unexpected Error:', err);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }


});

module.exports = router;
