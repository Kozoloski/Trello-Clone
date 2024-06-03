"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button} from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"; 
import { Accordion } from "@/components/ui/accordion";



interface SidebarProps {
    storageKey?:string;
};

export const Sidebar = ({
    storageKey,
}: SidebarProps) => {
    const [expanded, setExpanded] = useLocalStorage(storageKey, {});

    return (
        <div>
            Sidebar!
        </div>
    )
}