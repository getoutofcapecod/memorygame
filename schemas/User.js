export const userSchema = {
    "name": "User",
    "type": "object", 
    "properties": {
        "memory_color_scheme": {
            "type": "string",
            "enum": ["classic", "neon", "forest", "ocean", "sunset"],
            "description": "Preferred color scheme for memory game"
        },
        "memory_emoji_set": {
            "type": "string",
            "enum": ["mixed", "food", "animals", "space", "art", "sports"],
            "description": "Preferred emoji set for memory game"
        }
    }
};
