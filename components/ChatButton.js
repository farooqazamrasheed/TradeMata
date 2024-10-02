import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Forum } from "@mui/icons-material";

const FloatingWhatsAppButton = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const currentUser = session?.user;
  const [isLoading, setIsLoading] = useState(false);

  const AppChat = async () => {
    try {
      setIsLoading(true);
     if(currentUser){
      const response = await fetch(`/api/chats/create?currentUserId=${currentUser.id}`); // Adjust endpoint as per your API route
      const data= await response.json();
      const chatId = data._id;
      console.log(data,chatId)
      setIsLoading(false);
      // Navigate to chat page with chat ID
      router.push(`/chat`);}else{
        router.push("/signin");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching chat ID:", error);
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed bottom-6 right-6 bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center cursor-pointer"
      onClick={AppChat}
      style={{ zIndex: "999" }}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white" />
      ) : (
        <Forum style={{ color: "white", fontSize: "2rem" }} />
      )}
    </div>
  );
};

export default FloatingWhatsAppButton;
