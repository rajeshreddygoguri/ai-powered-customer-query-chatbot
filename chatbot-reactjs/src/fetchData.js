export async function fetchCompanyInfo() {
    try {
      const response = await fetch("http://localhost:5000/api/company-info");
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error(" Error fetching data:", error);
      return "Error fetching company information.";
    }
  }
  