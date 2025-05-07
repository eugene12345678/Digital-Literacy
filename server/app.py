

from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
import json
import time

app = Flask(__name__)
CORS(app)

# Set OpenAI API key from environment variable
openai.api_key = os.environ.get("OPENAI_API_KEY", "")

# Default responses for common questions
DEFAULT_RESPONSES = {
    "How do I create a strong password?": 
        "To create a strong password: 1) Use at least 12 characters 2) Mix uppercase, lowercase letters, numbers, and symbols 3) Avoid personal information 4) Don't use common words or patterns 5) Use a different password for each account. Consider using a password manager to help create and store strong passwords safely!",
    
    "What is the best way to avoid scams online?": 
        "To avoid online scams: 1) Be skeptical of unexpected emails and messages 2) Don't click on suspicious links 3) Never share personal or financial information with untrusted sources 4) Use strong passwords and enable two-factor authentication 5) Keep your software updated 6) Research companies before making purchases 7) If something seems too good to be true, it probably is!",
    
    "How do I use video calling apps?": 
        "To use video calling apps: 1) Download the app (like Zoom, FaceTime, or WhatsApp) from your device's app store 2) Create an account if required 3) Give the app permission to use your camera and microphone 4) Add contacts or use their phone numbers/email addresses 5) Tap the video call button to start a call. Most apps have similar interfaces with buttons to mute yourself, turn off video, or end the call.",
    
    "How can I send photos on WhatsApp?": 
        "To send photos on WhatsApp: 1) Open a chat with the person you want to send to 2) Tap the '+' or paperclip icon 3) Select 'Gallery' or 'Photos' 4) Choose the photo you want to send 5) Add a caption if desired 6) Tap the send button. You can also take a new photo directly in WhatsApp by selecting the camera option!",
    
    "What should I do if I forget my password?": 
        "If you forget your password: 1) Look for a 'Forgot Password' or 'Reset Password' option on the login page 2) Enter your email address or username 3) Check your email for reset instructions 4) Create a new strong password 5) Consider writing it down in a secure place or using a password manager for future reference. For important accounts, make sure your recovery email is up to date!",
    
    "How do I update my apps?": 
        "To update your apps: On iPhone/iPad: 1) Open App Store 2) Tap your profile icon 3) Scroll to see available updates 4) Tap 'Update All' or update individual apps. On Android: 1) Open Google Play Store 2) Tap your profile icon 3) Select 'Manage apps & device' 4) Tap 'Updates available' and update apps. Regular updates improve security and add new features!"
}

@app.route('/api/health', methods=['GET'])
def health_check():
    """Endpoint to check if the API is running"""
    return jsonify({"status": "online", "timestamp": time.time()})

@app.route('/api/chat', methods=['POST'])
def chat():
    """Main chat endpoint that processes user messages and returns responses"""
    data = request.json
    if not data or 'message' not in data:
        return jsonify({"error": "No message provided"}), 400
    
    user_message = data['message']
    history = data.get('history', [])
    
    # Check if we have a default response for this exact question
    if user_message in DEFAULT_RESPONSES:
        return jsonify({"response": DEFAULT_RESPONSES[user_message]})
    
    # Try to find a close match in our default responses
    for question, answer in DEFAULT_RESPONSES.items():
        if user_message.lower() in question.lower() or question.lower() in user_message.lower():
            return jsonify({"response": answer})
    
    try:
        # Prepare conversation history for the API call
        messages = [
            {"role": "system", "content": """You are DigiBuddy, a friendly and helpful AI assistant for a Digital Literacy Course designed to help parents and elderly users learn digital tools. 
            Provide clear, simple explanations focused on practical advice. Keep your answers concise, friendly, and avoid technical jargon when possible. 
            When appropriate, suggest relevant tutorials from our platform that might help the user learn more about the topic.
            Break down your instructions into numbered steps when providing how-to guidance."""}
        ]
        
        # Add conversation history if available
        for msg in history:
            role = "assistant" if msg.get("type") == "bot" else "user"
            messages.append({"role": role, "content": msg.get("text", "")})
        
        # Add the current user message
        messages.append({"role": "user", "content": user_message})
        
        # Call the OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.7,
            max_tokens=500
        )
        
        # Extract the bot's response
        bot_response = response.choices[0].message.content
        
        return jsonify({"response": bot_response})
    
    except Exception as e:
        print(f"Error: {str(e)}")
        
        # Fallback response if API call fails
        fallback_response = (
            "I'm sorry, I'm having trouble connecting to my knowledge system at the moment. "
            "For digital literacy assistance, you might want to try one of these common topics:\n\n"
            "- Creating strong passwords\n"
            "- Avoiding online scams\n"
            "- Using video calling apps\n"
            "- Sending photos in messaging apps\n"
            "- Recovering forgotten passwords\n"
            "- Updating your apps"
        )
        
        return jsonify({"response": fallback_response, "error": str(e)}), 200  # Return 200 with fallback

if __name__ == '__main__':
    # Get port from environment variable or default to 5000
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', debug=False, port=port)