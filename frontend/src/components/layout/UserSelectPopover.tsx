// UserSelectPopover.tsx
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, Plus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUsernames } from "@/features/users/hooks/useUsers";

interface User {
  id: string;
  name: string;
}

interface UserSelectPopoverProps {
  onUserSelect?: (user: User) => void;
  selectedUser?: User | null;
  isLoading?: boolean;
  disabled?: boolean;
}

export function UserSelectPopover({ 
  onUserSelect, 
  selectedUser,
  isLoading = false,
  disabled = false
}: UserSelectPopoverProps) {
  const [open, setOpen] = useState(false);
  const { data: users = [], isLoading: isLoadingUsers } = useUsernames();

  const handleSelect = (user: User) => {
    onUserSelect?.(user);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="default" 
          size="icon" 
          disabled={disabled || isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-2" align="start">
        <div className="space-y-1">
          <h4 className="text-sm font-medium mb-2">Assign User</h4>

          {isLoadingUsers ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          ) : users.length > 0 ? (
            users.map((user) => (
              <button
                key={user.id}
                onClick={() => handleSelect({ 
                  id: user.id.toString(), 
                  name: user.name 
                })}
                disabled={isLoading}
                className={cn(
                  "w-full flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-muted transition",
                  selectedUser?.id === user.id.toString() && "bg-muted",
                  isLoading && "opacity-50 cursor-not-allowed"
                )}
              >
                <span>{user.name}</span>
                {selectedUser?.id === user.id.toString() && (
                  <Check className="h-4 w-4" />
                )}
              </button>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No users available</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}