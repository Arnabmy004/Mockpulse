import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full h-fit">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">
          Create Your Account
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Join us and experience the power of AI interviews!
        </p>
        <SignUp />
      </div>
    </section>
  );
}
