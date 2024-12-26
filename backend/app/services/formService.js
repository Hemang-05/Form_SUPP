const { supabase } = require('./supabase');

// Function to save form data
async function saveFormData(formData) {
    try {
        const { data, error } = await supabase.from('responses').insert(formData);

        if (error) {
            throw new Error(error.message);
        }

        return data; // Return the inserted data
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

module.exports = { saveFormData };
