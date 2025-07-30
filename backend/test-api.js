// Simple test script to check API endpoints
import fetch from "node-fetch";

const baseUrl = "http://localhost:4000/api";

async function testAPI() {
  try {
    // Test states endpoint
    const statesResponse = await fetch(`${baseUrl}/state/all-states`);
    if (!statesResponse.ok) {
      console.error("States endpoint failed");
    }

    // Test colleges endpoint
    const collegesResponse = await fetch(`${baseUrl}/college/all-colleges`);
    if (!collegesResponse.ok) {
      console.error("Colleges endpoint failed");
    }
  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

testAPI();
