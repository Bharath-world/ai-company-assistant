

export async function askAI(question) {
  //  logic
  if (question.toLowerCase().includes("pricing")) {
    return "Our pricing depends on project scope. We offer flexible engagement models including fixed price and monthly retainers.";
  }

  if (question.toLowerCase().includes("service")) {
    return "We provide UI/UX design, full-stack development, and AI-powered internal tools.";
  }

  if (question.toLowerCase().includes("tech")) {
    return "Our stack includes React, Node.js, Express, MongoDB, and AI integrations.";
  }

  return "Thanks for your question. A consultant from our team will get back to you with details.";
}
