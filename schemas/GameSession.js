export const gameSessionSchema = {
    "name": "GameSession", 
    "type": "object",
    "properties": {
        "moves": {
            "type": "number",
            "description": "Number of moves made"
        },
        "time_seconds": {
            "type": "number", 
            "description": "Time taken to complete game"
        },
        "difficulty": {
            "type": "string",
            "enum": ["easy", "medium", "hard"],
            "description": "Game difficulty level"
        },
        "completed": {
            "type": "boolean",
            "description": "Whether game was completed"
        },
        "color_scheme": {
            "type": "string",
            "enum": ["classic", "neon", "forest", "ocean", "sunset"],
            "default": "classic",
            "description": "Selected color theme"
        },
        "emoji_set": {
            "type": "string", 
            "enum": ["mixed", "food", "animals", "space", "art", "sports"],
            "default": "mixed",
            "description": "Selected emoji theme"
        }
    },
    "required": ["moves", "difficulty", "completed"]
};
