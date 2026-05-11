export const TRIP_PROMPT = (destination: string, days: number, budget: string, members: number) => {
  return `
    Plan a ${days}-day trip to ${destination} for ${members} people. 
    The total budget is ${budget} per person.
    
    Return the response STRICTLY as a JSON object with this structure:
    {
      "trip_name": "string",
      "itinerary": [
        {
          "day": 1,
          "theme": "string",
          "activities": [
            { "time": "Morning", "description": "string", "location": "string", "est_cost_in_inr": 0 }
          ]
        }
      ]
    }
    Do not include any text before or after the JSON.
  `;
};