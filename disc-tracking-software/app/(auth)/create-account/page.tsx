import Link from "next/link"

export default function CreateAccountPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Create Account</h1>
        <p className="text-slate-500">Enter your information to get started.</p>
      </div>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
             <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
             <input id="firstName" placeholder="Max" className="w-full p-2 border rounded-md" required />
          </div>
          <div className="space-y-2">
             <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
             <input id="lastName" placeholder="Robinson" className="w-full p-2 border rounded-md" required />
          </div>
        </div>
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
          Create Account
        </button>
      </form>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="underline hover:text-blue-600">
          Sign in
        </Link>
      </div>
    </div>
  )
}
