"use client";

import { Code } from "@/components/typography/code";
import { Link } from "@/components/typography/link";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  SignOutButton,
  SignUpSignIn,
  useMutationWithAuth,
  useSessionId,
} from "@convex-dev/convex-lucia-auth/react";
import { useMutation, useQuery } from "convex/react";

export default function Home() {
  const sessionId = useSessionId();

  return sessionId ? <SignedIn /> : <AuthForm />;
}

function SignedIn() {
  const numbers = useQuery(api.myFunctions.listNumbers, { count: 10 });
  const addNumber = useMutation(api.myFunctions.addNumber);

  return (
    <main className="container max-w-2xl flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">
        Convex + Next.js + Lucia Auth
      </h1>
      <p>
        <SignOutButton
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
        disabled:pointer-events-none disabled:opacity-50
        bg-primary text-primary-foreground shadow hover:bg-primary/90
        h-9 px-4 py-2"
        />
      </p>
      <p>
        Click the button and open this page in another window - this data is
        persisted in the Convex cloud database!
      </p>
      <p>
        <Button
          onClick={() => {
            void addNumber({ value: Math.floor(Math.random() * 10) });
          }}
        >
          Add a random number
        </Button>
      </p>
      <p>
        Numbers:{" "}
        {numbers?.length === 0
          ? "Click the button!"
          : numbers?.join(", ") ?? "..."}
      </p>
      <p>
        Edit <Code>convex/myFunctions.ts</Code> to change your backend
      </p>
      <p>
        Edit <Code>app/(fullstack)/page.tsx</Code> to change your frontend
      </p>
      <p>
        Check out{" "}
        <Link target="_blank" href="https://docs.convex.dev/home">
          Convex docs
        </Link>
      </p>
      <p>
        To build a full page layout copy one of the included{" "}
        <Link target="_blank" href="/layouts">
          layouts
        </Link>
      </p>
    </main>
  );
}

function AuthForm() {
  const signIn = useMutationWithAuth(api.auth.signIn);
  const signUp = useMutationWithAuth(api.auth.signUp);
  return (
    <SignUpSignIn
      signIn={signIn}
      signUp={signUp}
      labelClassName="mb-4"
      inputClassName="
          flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1
          text-sm shadow-sm transition-colors file:border-0 file:bg-transparent
          file:text-sm file:font-medium placeholder:text-muted-foreground
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
          disabled:cursor-not-allowed disabled:opacity-50
          mb-4 w-80"
      buttonClassName="
          inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
          disabled:pointer-events-none disabled:opacity-50
          bg-primary text-primary-foreground shadow hover:bg-primary/90
          h-9 px-4 py-2
          cursor-pointer w-full mb-4"
      flowToggleClassName="block font-medium text-primary cursor-pointer text-center"
    />
  );
}
