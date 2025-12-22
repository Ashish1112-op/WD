export function showMenu() {
  console.log("===== MENU =====");
  console.log("1. Fill Form");
  console.log("2. View Saved Data");
  console.log("3. Exit");
}

export function handleMenu(option) {
  switch (option) {
    case "1":
      console.log("👉 Please fill the form on screen.");
      break;
    case "2":
      let saved = localStorage.getItem("registrationData");
      console.log("📂 Saved Data:", saved ? JSON.parse(saved) : "No data found.");
      break;
    case "3":
      console.log("👋 Exiting Program.");
      break;
    default:
      console.log("⚠️ Invalid input! Try again.");
  }
}
