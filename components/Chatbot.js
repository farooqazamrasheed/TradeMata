import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import { Button, Box, Heading } from "@chakra-ui/react";
import axios from "axios";
import { SiChatbot } from "react-icons/si";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useDisclosure,
  VStack,
  Textarea,
  Divider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

const Chatbot = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const btnRef = React.useRef();
  const fetchChatBotResponse = async (text) => {
    const LANGUAGE_MODEL_API_KEY = "AIzaSyBS_bDrruqlZkiYEDe_A_koaHUbLwxCsNM";
    const LANGUAGE_MODEL_URL = `https://generativelanguage.googleapis.com/v1beta1/models/chat-bison-001:generateMessage?key=${LANGUAGE_MODEL_API_KEY}`;
    
    // Convert text to lowercase for case-insensitive matching
    const lowercaseText = text.toLowerCase();
  
    if (
      lowercaseText.includes("trading") ||
      lowercaseText.includes("electricity") ||
      lowercaseText.includes("trade guidance portal") ||
      lowercaseText.includes("guidelines") ||
      lowercaseText.includes("practical trading") ||
      lowercaseText.includes("courses") ||
      lowercaseText.includes("assignments") ||
      lowercaseText.includes("lectures") ||
      lowercaseText.includes("social community") ||
      lowercaseText.includes("trading strategies") ||
      lowercaseText.includes("market analysis") ||
      lowercaseText.includes("technical analysis") ||
      lowercaseText.includes("fundamental analysis") ||
      lowercaseText.includes("trading signals") ||
      lowercaseText.includes("trading tools") ||
      lowercaseText.includes("trading platforms") ||
      lowercaseText.includes("market trends") ||
      lowercaseText.includes("broker") ||
      lowercaseText.includes("brokers") ||
      lowercaseText.includes("exchange ") ||
      lowercaseText.includes("crypto exchange") ||
      lowercaseText.includes("crypto coins") ||
      lowercaseText.includes("tokens") ||
      lowercaseText.includes("currency") ||
      lowercaseText.includes("hello") ||
      lowercaseText.includes("hi")
    ) {
      const payload = {
        prompt: { messages: [{ content: text }] },
        temperature: 0.1,
        candidate_count: 1,
      };
  
      try {
        const response = await fetch(LANGUAGE_MODEL_URL, {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          method: "POST",
        });
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error:", error);
        return { error: "Internal Server Error" };
      }
    } else {
      return {
        message: "I can only answer questions related trading and finance.",
      };
    }
  };
  
  
  const handleSendMessage = async () => {
    const newMessage = {
      sender: "user",
      content: message,
    };
    setMessages([...messages, newMessage]);
  
    try {
      const chatBotResponse = await fetchChatBotResponse(message);
  
      if (chatBotResponse && chatBotResponse.message) {
        // Handle specific message from the API
        const newChatBotMessage = {
          sender: "bot",
          content: chatBotResponse.message,
        };
        setMessages((prevMessages) => [...prevMessages, newChatBotMessage]);
      } else if (
        chatBotResponse &&
        chatBotResponse.candidates &&
        chatBotResponse.candidates.length > 0
      ) {
        const newChatBotMessage = {
          sender: "bot",
          content: chatBotResponse.candidates[0].content,
        };
        setMessages((prevMessages) => [...prevMessages, newChatBotMessage]);
      } else if (
        chatBotResponse &&
        chatBotResponse.messages &&
        chatBotResponse.messages.length > 0
      ) {
        const newChatBotMessage = {
          sender: "bot",
          content: chatBotResponse.messages[0].content,
        };
        setMessages((prevMessages) => [...prevMessages, newChatBotMessage]);
      } else {
        console.error("Invalid chatbot response:", chatBotResponse);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  
    setMessage("");
  };
  
  return (
    <>
      <div
     className="bg-gray-400"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: "999",
          padding: "1rem",
          borderRadius: "50%",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Button  className="border border-white text-3xl md:text-1xl"  colorScheme="teal" size="md" onClick={onOpen}>
        <SiChatbot />
        </Button>
        <Drawer
          isOpen={isOpen}
          onClose={onClose}
          finalFocusRef={btnRef}
          placement="right"
          size="sm"
        >
          <DrawerOverlay />
          <DrawerContent borderRadius="lg">
            <DrawerCloseButton />
            <DrawerHeader>TradMate-Bot</DrawerHeader>
            <DrawerBody>
              <VStack spacing="4" alignItems="stretch">
                {messages.map((msg, index) => (
                  <Box
                    key={index}
                    p="2"
                    bg={msg.sender === "user" ? "blue.100" : "gray.100"}
                    borderRadius="lg"
                  >
                    <Text fontSize="sm" color="gray.500">
                      {msg.sender === "user" ? "You" : "TradeMate-Bot"}
                    </Text>
                    <Text fontSize="md" mt="1">
                      {msg.content}
                    </Text>
                  </Box>
                ))}
              </VStack>
              <Divider mt="4" mb="8" />
              <Textarea
              
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type your message..."
                size="md"
                style={{
                  position: "absolute",
                  bottom: "5px",
                  right: "20px",
                  width: "calc(100% - 40px)",
                  backgroundColor: "#333",
                  color: "#fff",
                  border: "1px solid #555",
                  borderRadius: "5px",
                }}
              />
            </DrawerBody>
            <DrawerFooter>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default Chatbot;
