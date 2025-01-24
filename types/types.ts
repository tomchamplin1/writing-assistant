export interface Message {
  content: {
    text: string
  }
}

export interface GeneratedData {
  messages: Message
}
