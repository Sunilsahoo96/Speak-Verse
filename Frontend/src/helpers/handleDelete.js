export const deleteData = async(endpoint) => {
    try {
        const response = await fetch(endpoint, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (!response.ok) throw new Error("Failed to delete");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
