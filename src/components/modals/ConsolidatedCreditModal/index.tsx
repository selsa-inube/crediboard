import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Blanket } from "@inubekit/blanket";
import { ConsolidatedCreditsInterface } from "./interface";

export interface ConsolidatedCreditsProps {
    handleClose: () => void;
    portalId?: string;
    investmentCode: string;
    expiredValue: number;
    collectedValue: number;
    loading?: boolean;
    nextExpiration: number;
}

export const ConsolidatedCredits = (props: ConsolidatedCreditsProps) => {
    const {
        portalId,
        handleClose,
        collectedValue,
        investmentCode,
        nextExpiration,
        expiredValue,
        loading = false,
    } = props;

    const node = document.getElementById(portalId ?? "portal");
    if (!node) {
        throw new Error(
            "The portal node is not defined. Ensure the portal has been set correctly."
        );
    }

    const [error, setError] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setError(false);
        }, 2000);
    }, []);

    return createPortal(
        <Blanket>
            <ConsolidatedCreditsInterface
                loading={loading}
                error={error}
                handleClose={handleClose}
                investmentCode={investmentCode}
                nextExpiration={nextExpiration}
                expiredValue={expiredValue}
                collectedValue={collectedValue}
            />
        </Blanket>,
        node
    );
};
