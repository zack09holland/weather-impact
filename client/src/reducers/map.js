// Map reducer
const map = (state = null, action) => {
    switch (action.type) {
        case "SAVE_MAP":
            return action.payload;
        default:
            return state;
    }
};

export default map;