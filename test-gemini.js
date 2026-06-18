const { GoogleGenerativeAI } = require("@google/generative-ai");

// Test with a hardcoded API key for debugging
const API_KEY = process.env.GEMINI_API_KEY;

console.log("🔍 Testing Gemini API...");
console.log("🔍 API Key exists:", !!API_KEY);
console.log("🔍 API Key length:", API_KEY?.length || 0);

if (!API_KEY) {
  console.error("❌ No API key found in environment variables");
  process.exit(1);
}

async function testGemini() {
  try {
    // First, try to list models
    console.log("\n📋 Trying to list available models...");
    const modelsResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    
    if (!modelsResponse.ok) {
      console.error(`❌ Failed to list models: ${modelsResponse.status} ${modelsResponse.statusText}`);
      const errorText = await modelsResponse.text();
      console.error("Error details:", errorText);
      return;
    }
    
    const modelsData = await modelsResponse.json();
    console.log("✅ Successfully listed models:");
    
    const generateContentModels = modelsData.models?.filter(model => 
      model.supportedGenerationMethods?.includes("generateContent")
    ) || [];
    
    console.log("\n🤖 Models that support generateContent:");
    generateContentModels.forEach(model => {
      console.log(`  - ${model.name} (${model.displayName})`);
    });
    
    // Now try to use the first available model
    if (generateContentModels.length > 0) {
      const firstModel = generateContentModels[0];
      const modelName = firstModel.name.replace('models/', '');
      
      console.log(`\n🧪 Testing with model: ${modelName}`);
      
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: modelName });
      
      const result = await model.generateContent("Hello, can you respond with just 'Hello back!'?");
      const response = await result.response;
      const text = response.text();
      
      console.log("✅ Model test successful!");
      console.log("Response:", text);
    }
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    console.error("Full error:", error);
  }
}

testGemini();
