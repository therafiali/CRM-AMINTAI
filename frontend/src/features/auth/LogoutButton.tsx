import { Button } from "@/components/ui/button"
import { useLogout } from "./hooks/useLogout"
import React from "react"

interface LogoutButtonProps extends React.ComponentProps<typeof Button> {
  children?: React.ReactNode
}

export function LogoutButton({ children, ...props }: LogoutButtonProps) {
  const logout = useLogout()

  return (
    <Button
      variant="outline"
      onClick={logout}
      {...props}
    >
      {children ?? "Logout"}
    </Button>
  )
}
