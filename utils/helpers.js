// POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch("/api/"+url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function deleteData(url = '') {
    // Default options are marked with *
    const response = await fetch("/api/"+url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export {postData, deleteData}
