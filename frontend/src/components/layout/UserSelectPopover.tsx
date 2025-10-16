import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email?: string;
}

export function UserSelectPopover() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // 🧠 Dummy data (can later be fetched from API)
  const users: User[] = [
    { id: "1", name: "Rafi Ali", email: "rafi@example.com" },
    { id: "2", name: "Sana Malik", email: "sana@example.com" },
    { id: "3", name: "Hassan Khan", email: "hassan@example.com" },
    { id: "4", name: "Ayesha Ahmed", email: "ayesha@example.com" },
  ];

  const handleSelect = (user: User) => {
    setSelectedUser(user);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="default" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-2">
        <div className="space-y-1">
          <h4 className="text-sm font-medium mb-2">Select User</h4>

          {users.length > 0 ? (
            users.map((user) => (
              <button
                key={user.id}
                onClick={() => handleSelect(user)}
                className={cn(
                  "w-full flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-muted transition",
                  selectedUser?.id === user.id && "bg-muted"
                )}
              >
                <span>{user.name}</span>
                {selectedUser?.id === user.id && <Check className="h-4 w-4" />}
              </button>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No users found</p>
          )}

          {selectedUser && (
            <div className="mt-2 border-t pt-2 text-xs text-muted-foreground">
              Selected: <span className="font-medium">{selectedUser.name}</span>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
