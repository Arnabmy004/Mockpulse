import { SignedIn, SignedOut, SignOutButton, RedirectToSignIn } from '@clerk/nextjs';

export default function Dashboard() {
  return (
    <>
     <h1>Dashboard</h1>
     <SignOutButton/>
    </>
  );
}
