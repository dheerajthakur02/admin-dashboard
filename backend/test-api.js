// Simple test script to check API endpoints
import fetch from "node-fetch";

const baseUrl = "http://localhost:4000/api";

async function testAPI() {
  try {
    console.log("Testing API endpoints...");

    // Test states endpoint
    console.log("\n1. Testing states endpoint...");
    const statesResponse = await fetch(`${baseUrl}/state/all-states`);
    console.log("States response status:", statesResponse.status);
    if (statesResponse.ok) {
      const states = await statesResponse.json();
      console.log("States found:", states.length);
    } else {
      console.log("States error:", await statesResponse.text());
    }

    // Test colleges endpoint
    console.log("\n2. Testing colleges endpoint...");
    const collegesResponse = await fetch(`${baseUrl}/college/all-colleges`);
    console.log("Colleges response status:", collegesResponse.status);
    if (collegesResponse.ok) {
      const colleges = await collegesResponse.json();
      console.log("Colleges found:", colleges.length);
    } else {
      console.log("Colleges error:", await collegesResponse.text());
    }
  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

testAPI();
