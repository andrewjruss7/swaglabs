// api.js

const axios = require('axios'); // O utiliza tu librería HTTP preferida

async function fetchApiData() {
    try {
        const response = await axios.get('https://randomuser.me/api/');
        if (response.status === 200) {
            const data = response.data.results[0];
            return {
                firstName: data.name.first,
                lastName: data.name.last,
                postalCode: data.location.postcode,
            };
        } else {
            throw new Error('Error al obtener datos de la API');
        }
    } catch (error) {
        throw new Error('Error en la llamada a la API: ' + error.message);
    }
}

module.exports = {
    fetchApiData,
};