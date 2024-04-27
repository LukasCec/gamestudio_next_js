import React from 'react';
import {Navigation} from "@/components/ui/navigation";
import {AuroraBackground} from "@/components/ui/aurora-background";
import NonogramMainCard from "@/components/ui/nonogramMainCard";

const Page: React.FC = () => {
    return (
        <div>
            <Navigation />
            <AuroraBackground>
                <NonogramMainCard />
            </AuroraBackground>
        </div>
    );
}

export default Page;