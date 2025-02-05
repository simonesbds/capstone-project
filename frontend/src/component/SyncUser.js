import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";

const SyncUser = () => {
  const { user } = useUser();

  useEffect(() => {
    console.log("👤 SyncUser montato, user:", user);
    if (user) {
      axios.post("http://localhost:5000/api/auth/sync-user", {
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress || null,
        name: user.fullName,
        avatar: user.imageUrl,
      })
      .then(response => {
        console.log("✅ User synced successfully:", response.data);
      })
      .catch(error => {
        console.error("❌ Error syncing user:", error.response ? error.response.data : error.message);
      });
    }
  }, [user]);

  return null;
};

export default SyncUser;
