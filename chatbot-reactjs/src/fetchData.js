export async function fetchCompanyInfo() {
    try {
      const response = await fetch("https://chatbot-backend-1rid.onrender.com/api/company-info");
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error(" Error fetching data:", error);
      return "Error fetching company information.";
    }
  }
  
