export const PostReg = async ({ username, email, password }: { username: string; email: string; password: string }) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: 'POST',
      body: JSON.stringify({ nickname: username, email: email, password: password }),
    });
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const result = await response.json();
    console.log(result);
    return;
  } catch (e: any) {
    console.error(e.message);
  }
};
