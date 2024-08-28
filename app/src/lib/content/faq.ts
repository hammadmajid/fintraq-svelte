interface FAQ {
  value: string,
  question: string,
  answer: string,
}

export const FAQs: FAQ[] = [
  {
    value: "0",
    question: "Is this a real product?",
    answer: "No, this is a sample website created for learning purposes with SvelteKit and Hono. It is not an actual product.",
  },
  {
    value: "1",
    question: "Is the software functional?",
    answer: "This is a pre-alpha version of the software. While it has some basic functionality, it is still in development and may not be fully operational.",
  },
  {
    value: "2",
    question: "Are payments supported?",
    answer: "No, the payment features are not active. The pricing table you see is a mockup and does not support real transactions.",
  },
  {
    value: "3",
    question: "Can I contribute to this project?",
    answer: "As this is a learning project, contributions are not being accepted. However, you are welcome to explore the code and use it as a reference for your own projects.",
  },
  {
    value: "5",
    question: "Can I use the code from this project in my own work?",
    answer: "Yes, you can use the code as a learning resource or as a base for your own projects. Please ensure to follow best practices and guidelines for the technologies used.",
  },
]
