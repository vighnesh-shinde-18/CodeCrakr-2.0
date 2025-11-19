import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { IconLogout, IconDotsVertical } from "@tabler/icons-react";
import { toast } from "sonner";
import authService from "../../api/AuthServices";

function NavUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    const username = localStorage.getItem("username")
    const email = localStorage.getItem("email")
    setUser({ email, username })
  }, [])

  const initials = user.username ? user.username.slice(0, 2).toUpperCase() : "US";

  const handleLogout = async () => {
    await authService.logout()
    localStorage.removeItem("username")
    localStorage.removeItem("email")
    toast.success("Logged out Successfully");
    navigate("/login")
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center justify-between">
        <SidebarMenuButton size="lg" className="flex-1">
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage src={user.avatar} alt={user.username || "User"} />
            <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight ml-3">
            <span className="truncate font-medium">{user.username || "Unknown"}</span>
            <span className="text-muted-foreground truncate text-xs">{user.email || ""}</span>
          </div>
        </SidebarMenuButton>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 hover:bg-muted rounded-md transition cursor-pointer">
              <IconDotsVertical className="h-4 w-4 cursor-pointer" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className=" cursor-pointer" align="end">
            <DropdownMenuItem onClick={handleLogout}  >
              <DropdownMenuItem className="cursor-pointer" >
                <IconLogout className="mr-1 h-2 w-2 cursor-pointer" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavUser;