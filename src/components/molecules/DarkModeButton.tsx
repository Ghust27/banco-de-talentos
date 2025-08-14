"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

export default function DarkModeButton() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode((prev) => !prev);
  };

  return (
    <div>
      <Button variant={"outline"} size={"icon"} onClick={toggleDarkMode}>
        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </div>
  );
}
