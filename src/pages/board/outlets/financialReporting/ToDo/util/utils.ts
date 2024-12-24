const getXAction = (executedTask: string, humanDecision: string): string => {
  if (
    executedTask === "ASESORAR_CLIENTE" &&
    humanDecision === "VIABILIZAR_SOLICITUD"
  ) {
    return "PrequalifyCreditRequest";
  } else if (
    executedTask === "VALIDAR_REQUISITOS" &&
    humanDecision === "VIABILIZAR_SOLICITUD"
  ) {
    return "MakeTheCreditRequestViable";
  } else if (executedTask === "xx" && humanDecision === "xx") {
    return "";
  } else if (executedTask === "" && humanDecision === "") {
    return "";
  }
  return "";
};

export { getXAction };
