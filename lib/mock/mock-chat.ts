// const defaultAnswer = `I can help with that. **This is a sample response** because the FastAPI and LangChain backend has not been connected yet.

// Once your backend is ready, this message will be replaced by an answer generated from the contents of your uploaded documents.

// For now, you can test the chat interface, message history, loading state, and suggested prompts.`;

// export function getMockAnswer(question: string): string {
//   const q = question.toLowerCase();

//   if (q.includes("summar") || q.includes("main idea") || q.includes("main point")) {
//     return `## Sample summary

// Here is where a concise summary of your selected documents will appear.

// - **Main topic:** A short description of the document's central subject.
// - **Key points:** The most important arguments, findings, or explanations.
// - **Conclusion:** A brief statement of what the document wants the reader to understand.

// *Demo only:* this summary is not based on your actual PDF files yet.`;
//   }

//   if (q.includes("question") || q.includes("quiz") || q.includes("study")) {
//     return `## Sample study questions

// 1. What is the main idea presented in the document?
// 2. Which key terms or concepts should you know?
// 3. What evidence supports the central argument?
// 4. How could the information be applied in a real situation?
// 5. What conclusion can be drawn from the material?

// *Demo only:* connect the backend to generate questions from the actual document text.`;
//   }

//   if (q.includes("explain") || q.includes("simple") || q.includes("difficult")) {
//     return `## Let's break it down

// I would identify the concept in your document, explain it in plain language, and give a simple example.

// **The idea:** A short, beginner-friendly explanation.

// **Example:** A practical example that makes the idea easier to understand.

// **Remember:** One sentence with the most important point.

// *Demo only:* this explanation is not yet grounded in your PDF content.`;
//   }

//   return defaultAnswer;
// }
const defaultAnswer = `I can help with that. **This is a highly detailed sample response** designed to simulate a robust, production-grade output from your FastAPI and LangChain backend once it is fully integrated. 

Currently, the chat interface is running in front-end mock mode. When a user uploads a document (such as a PDF, DOCX, or TXT file), the LangChain framework will ingest the file, split the text into manageable chunks, generate vector embeddings, and store them in a vector database like Chroma or Pinecone. When a question is asked, a similarity search will fetch the most relevant context and pass it to an LLM to generate a precise answer.

For now, you can thoroughly test the following interface features:
*   **Streaming UI Simulation:** Verifying how long-form text blocks wrap and animate.
*   **Auto-Scrolling Mechanics:** Ensuring the chat window automatically pins to the bottom as text fills the screen.
*   **Markdown Rendering:** Checking the typography of lists, bold text, inline code, and syntax blocks.
*   **Session State:** Confirming that the chat history persists correctly across active sessions.`;

export function getMockAnswer(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("summar") || q.includes("main idea") || q.includes("main point")) {
    return `## Comprehensive Document Executive Summary

This is an expanded mockup of an architectural summary block. Once your FastAPI backend parsing pipeline is running, this section will dynamically extract, synthesize, and present the core themes found within your specific uploaded documentation.

### 1. Central Thesis & Objective
The document primarily focuses on establishing a scalable framework for cross-functional operations. It outlines historical bottlenecks, presents quantitative baselines, and proposes a modernized architecture designed to mitigate systemic inefficiencies.

### 2. Core Pillars & Key Findings
*   **Infrastructure Optimization:** A deep dive into current computational and operational overhead. The text argues that a shift toward decentralized services reduces latency by up to 35%.
*   **Resource Allocation:** Detailed data models showing where human and capital assets are currently misaligned. Implementing the proposed strategic shifts could recapture lost productivity.
*   **Risk Mitigation Paradigms:** An analysis of potential external variables, market pressures, and internal friction points, complete with a structured step-by-step contingency roadmap.

### 3. Definitive Conclusion & Next Steps
The material concludes with a strong call to action, demanding immediate iterative changes rather than a delayed, massive overhaul. It emphasizes that continuous integration principles should be applied to organizational strategy to maintain a competitive advantage.

*\*System Note: This comprehensive summary is a placeholder UI asset and is not yet grounded in your actual uploaded PDF files.\_*`;
  }

  if (q.includes("question") || q.includes("quiz") || q.includes("study")) {
    return `## Interactive Study Guide & Knowledge Verification Quiz

To help you master the material within your documents, here is an extensive set of conceptual, analytical, and application-based study questions.

### Section A: Conceptual Comprehension
1.  **What is the primary thesis statement** formulated by the author, and what foundational problems does it explicitly attempt to solve?
2.  Identify and define the **five core architectural terms** introduced in the early chapters. How do their definitions contrast with industry-standard terminology?

### Section B: Analytical Deep Dive
3.  Examine the statistical evidence presented in the third section. **Are there any noticeable biases,** data gaps, or logical leaps that weaken the core argument?
4.  How does the author reconcile the conflicting priorities between rapid deployment and rigorous quality assurance protocols?

### Section C: Real-World Scenario Application
5.  *Scenario:* Imagine you are deploying this exact operational strategy within a legacy enterprise ecosystem with limited budget overhead. **Which phase must be prioritized first** to guarantee immediate return on investment?
6.  Draft a brief response explaining how this material alters your current day-to-day workflow or engineering methodologies.

*\*System Note: These interactive evaluation vectors will be dynamically generated by LangChain using your exact document context once the backend is online.\_*`;
  }

  if (q.includes("explain") || q.includes("simple") || q.includes("difficult")) {
    return `## Deep-Dive Conceptual Breakdown: Simplified Learning Module

Complex academic and technical jargon can slow down comprehension. Here is a thorough, broken-down explanation designed to translate advanced principles into plain, accessible language.

### 1. The Core Idea (The "What")
At its absolute baseline, the concept in your document acts exactly like a **highly organized sorting facility**. Instead of letting incoming information pool into a chaotic, unmanageable heap, the system instantly evaluates the characteristics of each data point, assigns it a priority metadata tag, and routes it down a specialized pipeline.

### 2. Practical Analogy (The "How")
Think of an international airport baggage claim system:
*   **The Problem:** Thousands of bags arriving simultaneously from dozens of different flights across the globe.
*   **The System:** Automated barcode scanners reading luggage tags in real-time, instantly routing every suitcase to its specific carousel without human intervention.
*   **The Result:** Maximized throughput, minimized human error, and a significantly lower rate of lost luggage.

### 3. Key Takeaways to Remember
*   **Efficiency over Scale:** Simply adding more capacity does not fix a broken process; intelligent routing rules do.
*   **Automation Dependency:** This entire model relies heavily on flawless initial categorization to avoid downstream bottlenecks.

*\*System Note: This educational breakdown module is currently a static template and is not reflecting the actual concepts of your uploaded media.\_*`;
  }

  return defaultAnswer;
}
