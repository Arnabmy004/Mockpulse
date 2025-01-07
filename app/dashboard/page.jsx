import { SignedIn, SignedOut, SignOutButton, RedirectToSignIn, UserButton } from '@clerk/nextjs';

export default function Dashboard() {
  return (
    <>
     <h1>Dashboard</h1>
    <UserButton/>
    </>
  );
}
