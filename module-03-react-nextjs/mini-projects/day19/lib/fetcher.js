/**
 * Shared fetcher used across all SWR queries.
 * Automatically parses JSON and throws an informative Error for non-OK responses.
 */
export const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error('An error occurred while fetching data from the server.');
    error.info = await res.json().catch(() => null);
    error.status = res.status;
    throw error;
  }

  return res.json();
};
