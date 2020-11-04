import React from "react";
import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByAltText, 
        getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";
import Application from "components/Application";
import axios from "axios"

afterEach(cleanup);

describe("Application", () => {
  xit("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });
  xit("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container} = render(<Application />);
      await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0] 
    
    fireEvent.click(getByAltText(appointment, "Add")); 
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    }); 
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer")); 
    fireEvent.click(getByText(appointment, "Save"));
    
    expect(getByText(appointment, "Saving")).toBeInTheDocument(); 
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones")); 
    
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday"), 
    );
    expect(getByText(day, "no spots remaining"))
    }); 
    xit("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
      const { container} = render(<Application />);
    
      await waitForElement(() => getByText(container, "Archie Cohen"));
    
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );
    
      fireEvent.click(queryByAltText(appointment, "Delete"));
      expect(
        getByText(appointment, "Are you sure you would like to delete?")
      ).toBeInTheDocument();
    
      fireEvent.click(queryByText(appointment, "Confirm"));
    
      expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    
      await waitForElement(() => getByAltText(appointment, "Add"));
    
      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      )
    }) 
    it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
      const { container, debug } = render(<Application />);
      await waitForElement(() => getByText(container, "Archie Cohen"));
      const appointments = getAllByTestId(container, "appointment");
      const appointment = appointments[0];
      fireEvent.click(getByAltText(appointment, "Add"));
      fireEvent.change(
        getByPlaceholderText(appointment, /enter student name/i),
        {
          target: { value: "Lydia Miller-Jones" }
        }
      );
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
      fireEvent.click(getByText(appointment, "Save"));
   })  
   it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  }); 
  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });
})