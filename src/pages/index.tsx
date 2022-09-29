import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data, status } = useSession();

  if (data) {
    return (
      <>
        Signed in as {data.user?.email} <br />
        <button onClick={() => signOut()}>sign out here</button>
        <h1>data:</h1>
        <p>{data.user?.id}</p>
        <p>{data.user?.name}</p>
        <p>{data.user?.email}</p>
        <p>{data.user?.role}</p>
        <p>{status}</p>
      </>
    );
  }
  return (
    <>
      not signed in <br />
      <p>{status}</p>
      <button onClick={() => signIn()}>sign in here</button>
    </>
  );
}
