export const PostAuth = async ({ emailOrUsername, password }: { emailOrUsername: string; password: string }) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Email: emailOrUsername, Password: password }),
    });
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (e: any) {
    console.error(e.message);
  }
};
