export const logErrorToBackend = async (context: string, error: any) => {
  try {
    const { userApi } = await import('../services/userApi');
    await userApi.logError({
      context,
      message: error?.message || 'Unknown error',
      stack: error?.stack || null,
      url: window?.location?.href || null, 
      extra: typeof error === 'object' ? error : { raw: error },
    });
  } catch (logErr) {
    console.warn('Error while logging to backend:', logErr);
  }
};
