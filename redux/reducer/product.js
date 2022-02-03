const initalState = {
  isLoading: false,
  isError: false,
  message: "",
  allProduct: [],
  pageInfo: {},
};

const product = (state = initalState, action) => {
  switch (action.type) {
    case "GETALLPRODUCT_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
      };
    }
    case "GETALLPRODUCT_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
        allProduct: action.payload.data.data,
        pageInfo: action.payload.data.pagination,
      };
    }
    case "GETALLPRODUCT_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message,
        allProduct: [],
        pageInfo: {},
      };
    }
    case "POSTPRODUCT_PENDING": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: "",
      };
    }
    case "POSTPRODUCT_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
      };
    }
    case "POSTPRODUCT_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message,
      };
    }
    case "UPDATEPRODUCT_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
      };
    }
    case "UPDATEPRODUCT_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
      };
    }
    case "UPDATEPRODUCT_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message,
      };
    }
    default: {
      return state;
    }
  }
};

export default product;
