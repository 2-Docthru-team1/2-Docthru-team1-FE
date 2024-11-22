'use client';

import React, { useState } from 'react';
import SignInput from '../Input/SignInput';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSignIn}>
        <SignInput
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <SignInput
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm"
        >
          Sign In
        </button>
        <p>Not a member yet? Sign up now</p>
      </form>
    </div>
  );
}
