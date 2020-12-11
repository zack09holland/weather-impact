// Property Data reducer
const propertyData = (state = null, action) => {
  switch (action.type) {
      case "SAVE_PROPERTY_DATA":
          return action.payload;
      default:
          return state;
  }
};

export default propertyData;