import { getAppointmentsForDay, getInterviewsForDay } from "helpers/selectors";

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1, 4]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5], 
      interviewers: [2, 3, 1]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  }, 
  interviewers: {
    "1": {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    "3": {
      id: 3,
      name: "John Doe",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    "4": {
      id: 4,
      name: "Willy Nilly",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};


test("getAppointmentsForDay returns an array", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getAppointmentsForDay returns an array with a length matching the number of appointments for that day", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(result.length).toEqual(3);
});

test("getAppointmentsForDay returns an array containing the correct appointment objects", () => {
  const [first, second] = getAppointmentsForDay(state, "Tuesday");
  expect(first).toEqual(state.appointments["4"]);
  expect(second).toEqual(state.appointments["5"]);
});

test("getAppointmentsForDay returns an empty array when the days data is empty", () => {
  const result = getAppointmentsForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getAppointmentsForDay returns an empty array when the day is not found", () => {
  const result = getAppointmentsForDay(state, "Wednesday");
  expect(result.length).toEqual(0);
}); 
test("getInterviewsForDay returns an array", () => {
  const result = getInterviewsForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getInterviewsForDay returns an array with a length matching the number of interviewers for that day", () => {
  const result = getInterviewsForDay(state, "Monday");
  expect(result.length).toEqual(2);
});

test("getInterviewsForDay returns an array containing the correct interviewer objects", () => {
  const [first, second, third] = getInterviewsForDay(state, "Tuesday");
  expect(first).toEqual(state.interviewers["2"]);
  expect(second).toEqual(state.interviewers["3"]); 
  expect(third).toEqual(state.interviewers["1"]);
});

test("getInterviewsForDay returns an empty array when the days data is empty", () => {
  const result = getInterviewsForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getInterviewsForDay returns an empty array when the day is not found", () => {
  const result = getInterviewsForDay(state, "Wednesday");
  expect(result.length).toEqual(0);
}); 