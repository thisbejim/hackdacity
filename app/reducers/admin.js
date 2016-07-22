const initialState = {
  applicants: [],
  slack: {
    token: null
  },
  hackathons: [],
  currentHackathon: null,
  selected: null,
  editDisabled: true,
  categories: [],
  prizes: []
}

export const admin = (state=initialState, action) => {
  switch (action.type) {
    // approve
    case "ADD_APPLICANTS":
      return Object.assign({}, state, {applicants: action.applicants})

    case "UPDATE_SLACK_CREDENTIALS":
      return Object.assign({}, state,  {slack: {token: action.token}})

    // dashboard
    case "ADD_HACKATHONS":
      return Object.assign({}, state, {
        hackathons: action.hackathons,
        currentHackathon: action.currentHackathon,
        selected: action.currentHackathon,
        categories: action.categories,
        prizes: action.prizes
      })

    case "TOGGLE_EDIT_HACKATHON":
      var edit = state.editDisabled ? false : true;
      return Object.assign({}, state, {editDisabled: edit})

    case "DELETE_PRIZE":
      const index = state.prizes.findIndex(p => p.id == action.id);
      var prizes = state.prizes.slice(0, index).concat(
        state.prizes.slice(index + 1)
      );
      return Object.assign({}, state, {prizes: prizes})

    case "ADD_PRIZE":
      var prizes = [
        ...state.prizes,
        {
          categoryId: action.categoryId,
          id: action.id,
          text: ""
        }
      ];
      return Object.assign({}, state, {prizes: prizes})

    case "UPDATE_PRIZE":
      var prizes = state.prizes.map((prize) => {
        if(prize.id != action.id) {
          return prize
        }
        return {
          ...prize,
          text: action.text
        }
      });
      return Object.assign({}, state, {prizes: prizes})

    case "ADD_PRIZE_CATEGORY":
      var categories = [
        ...state.categories,
        {
          hackathonId: action.hackathonId,
          id: action.id,
          name: ""
        }
      ];
      return Object.assign({}, state, {categories: categories})

    case "UPDATE_CATEGORY":
      var categories = state.categories.map((category) => {
        if(category.id != action.id) {
          return category
        }
        return {
          ...category,
          name: action.name
        }
      });
      return Object.assign({}, state, {categories: categories})

    case "DELETE_CATEGORY":
      var categories = state.categories.filter(c => c.id != action.categoryId);
      var prizes = state.prizes.filter(p => p.categoryId != action.categoryId);
      return Object.assign({}, state, {
        categories: categories,
        prizes: prizes
      })

    case "UPDATE_DATE":
      var hackathons = state.hackathons.map((hackathon) => {
        if(hackathon.id != action.id) {
          return hackathon
        }
        if(action.dateType == "startDate") {
          return {
            ...hackathon,
            startDate: action.date
          }
        } else {
          return {
            ...hackathon,
            endDate: action.date
          }
        }
      });
      return Object.assign({}, state, {hackathons: hackathons})

    default:
      return state
  }
}
