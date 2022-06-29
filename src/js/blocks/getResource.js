const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, ststus ${res.status}`);
    }
    return await res.json();
};

export default getResource;