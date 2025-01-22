import localforage from "localforage";

type LoanTextOption = "¿Qué valor espera recibir?" | "Monto solicitado.";

const businessUnitTextMapping: Record<string, LoanTextOption> = {
    "ValueReceive": "¿Qué valor espera recibir?",
    "RequestedAmount": "Monto solicitado.",
};

export async function getLoanText(businessUnit: string): Promise<LoanTextOption | null> {
    try {
        const storedMapping = await localforage.getItem<Record<string, LoanTextOption>>("businessUnitTextMapping");
        const mapping = storedMapping || businessUnitTextMapping;
        return mapping[businessUnit] || null;
    } catch {
        return null;
    }
}

export async function saveBusinessUnitTextMapping(newMapping: Record<string, LoanTextOption>): Promise<void> {
    await localforage.setItem("businessUnitTextMapping", newMapping);
}
