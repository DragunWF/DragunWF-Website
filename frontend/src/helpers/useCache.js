const expirationHours = 6;

function useCache(key) {
  const get = () => {
    const cached = localStorage.getItem(key);
    const timestamp = localStorage.getItem(`${key}_timestamp`);

    if (!cached || !timestamp) return null;

    const expirationMs = expirationHours * 60 * 60 * 1000; // 6 hours in miliseconds
    const isExpired = Date.now() - parseInt(timestamp) > expirationMs;

    return isExpired ? null : JSON.parse(cached);
  };

  const set = (data) => {
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(`${key}_timestamp`, Date.now().toString());
  };

  const clear = () => {
    localStorage.removeItem(key);
    localStorage.removeItem(`${key}_timestamp`);
  };

  return { get, set, clear };
}

export default useCache;
