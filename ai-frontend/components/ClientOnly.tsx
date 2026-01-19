"use client";

import { useEffect, useState } from "react";

export default function ClientOnly({ children, className }: { children: React.ReactNode, className?: string }) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return <div className={className} />;
    }

    return <>{children}</>;
}
