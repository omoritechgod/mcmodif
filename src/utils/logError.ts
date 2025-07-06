export const logErrorToBackend = async (context: string, error: any) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
  const token = localStorage.getItem('token');

  try {
    await fetch(`${BASE_URL}/api/log-error`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        context,
        message: error?.message || 'Unknown error',
        stack: error?.stack || null,
        url: window?.location?.href || null, 
        extra: typeof error === 'object' ? error : { raw: error },
      }),
    });
  } catch (logErr) {
    console.warn('Error while logging to backend:', logErr);
  }
};
