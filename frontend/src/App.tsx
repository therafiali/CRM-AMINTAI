
import { useUser } from "@/features/auth/hooks/useUser";
import { LogoutButton } from "@/features/auth/LogoutButton";
import { UsersList } from "@/features/users";

function App() {
  const { user, isLoading } = useUser();

  return (
    <>
<<<<<<< HEAD
      <section className="p-6 space-y-2">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        {isLoading && <p className="text-sm text-gray-500">Loading user...</p>}
        {!isLoading && user && (
=======
      <section className="">
        {/* <h1 className="text-2xl font-semibold">Dashboard</h1> */}
        {isLoading && <p className="text-sm text-gray-500">Loading user...</p>}
        {/* {!isLoading && user && (
>>>>>>> 171e6a2 (UI better)
          <div className="rounded border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-lg">Welcome, <span className="font-medium">{user.name || user.email}</span></p>
              <LogoutButton />
            </div>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>
<<<<<<< HEAD
        )}
=======
        )} */}
>>>>>>> 171e6a2 (UI better)
      </section>

      {/* Users List component */}
      <section className="p-6 space-y-3">
        <h2 className="text-xl font-semibold">Users</h2>
        <UsersList />
      </section>
    </>
  )
}

export default App
