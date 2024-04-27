// Home component
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Navigation } from "@/components/ui/navigation";
import MainCard from "@/components/ui/main-card";
import React from "react";

export default function Home() {
    return (
        <>
            <Navigation />
            <AuroraBackground>
                <MainCard />
            </AuroraBackground>
        </>
    );
};
