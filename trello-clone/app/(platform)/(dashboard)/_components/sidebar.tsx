"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button} from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"; 
import { Accordion } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";



interface SidebarProps {
    storageKey?:string;
};

export const Sidebar = ({
    storageKey = "t-sidebar-state",
}: SidebarProps) => {
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
        storageKey, 
        {}
    );
    const {organization: activeOrganization,
        isLoaded: isLoadedOrg
    } = useOrganization();
    const {
        userMemberships,
        isLoaded: isLoadedOrgList
    } = useOrganizationList({
       userMemberships: {
        infinite: true,
       }, 
    });

    const defaultAccordionValue: string[] = Object.keys(expanded)
    .reduce((acc: string[], key: string) => {
        if(expanded[key]) {
            acc.push(key);
        }

        return acc;
    }, []);
    
    const onExpand = (id: string) => {
        setExpanded((curr) =>({
            ...curr,
            [id]: !expanded[id],
        }));
    };

    if(!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading ) {
        return (
            <>
            <Skeleton />
            </>
        );
    };

    return (
       <> 
        <div className="font-medium text-xs flex items-center mb-1">
            <span>
                Workspaces
            </span>
        </div>
        </>
    );
};