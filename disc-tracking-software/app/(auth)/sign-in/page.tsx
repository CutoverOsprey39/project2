import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Sign In</h1>
        <p className="text-slate-500">Welcome back! Please enter your details.</p>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input 
            id="email" 
            type="email" 
            placeholder="m@example.com" 
            className="w-full p-2 border rounded-md"
            required 
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <input 
            id="password" 
            type="password" 
            className="w-full p-2 border rounded-md"
            required 
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Sign In
        </button>
      </form>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/create-account" className="underline hover:text-blue-600">
          Sign up
        </Link>
      </div>
    </div>
  )
}
