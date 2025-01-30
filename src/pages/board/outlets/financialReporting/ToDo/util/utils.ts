const getXAction = (humanDecision: string): string => {
  if (humanDecision === "PREVIABILIZAR_SOLICITUD") {
    return "PrequalifyCreditRequest";
  } else if (humanDecision === "VIABILIZAR_SOLICITUD") {
    return "MakeTheCreditRequestViable";
  } else if (humanDecision === "xx") {
    return "";
  } else if (humanDecision === "") {
    return "";
  }
  return "";
};

export { getXAction };
