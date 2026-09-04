export async function createMaintenance(data){
     const response = await fetch('http://localhost:8080/api/maintenance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Error al enviar los datos');
            }

            return response.json();

}