import "@testing-library/jest-dom"; 
import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi } from 'vitest';
import Timer from "./components/Timer";

vi.useFakeTimers();

describe("Timer Component", () => {
    it("Checking Initial Render: ", () => {
        render(<Timer />);
        const initial_time = screen.getByText(/00:00:00/i)
        const initial_start = screen.getByText(/Start/i)
        const initial_stop = screen.getByText(/Stop/i)
        const initial_reset = screen.getByText( /Reset/i)
        expect(initial_time).toBeInTheDocument();
        expect(initial_start).toBeInTheDocument();
        expect(initial_stop).toBeInTheDocument();
        expect(initial_reset).toBeInTheDocument();
    });

    it("Checking For Start: ", () => {
        render(<Timer />)
        fireEvent.click(screen.getByText(/Start/i))
        act(() => {
            vi.advanceTimersByTime(2000);
        });
        expect(screen.getByText(/00:00:02/i)).toBeInTheDocument();
    });
    it("Checking For Stop: ", () => {
        render(<Timer />)
        fireEvent.click(screen.getByText(/Start/i))
        act(() => {
            vi.advanceTimersByTime(2000);
        });
        fireEvent.click(screen.getByText(/Stop/i))
        act(() => {
            vi.advanceTimersByTime(5000);
        });
        expect(screen.getByText(/00:00:02/i)).toBeInTheDocument();
    })
    it("Checking for Reset: ",()=>{
        render(<Timer />)
        fireEvent.click(screen.getByText(/Start/i))
        act(() => {
            vi.advanceTimersByTime(2000);
        });
        fireEvent.click(screen.getByText(/Reset/i))
        act(() => {
            vi.advanceTimersByTime(2000);
        });
        expect(screen.getByText(/00:00:00/i))
    })
})