import { renderHook, act } from "@testing-library/react-hooks";
import useSettingsPage from "../../hooks/custom/useSettingsPage";
import useTarget from "../../hooks/useTarget";
import useHeadquarter from "../../hooks/useHeadquarter";

// Mock delle funzioni utilizzate nell'hook
jest.mock("../../hooks/useTarget");
jest.mock("../../hooks/useHeadquarter");

describe("useSettingsPage hook", () => {
  it("should load target elements correctly", async () => {
    // Mock dei dati di targets
    const mockTargets = [
      { id: 1, name: "Target 1", price: 100 },
      { id: 2, name: "Target 2", price: 200 },
    ];

    useTarget.mockReturnValue({
      targets: mockTargets,
      loading: false,
      errorTarget: null,
      createTarget: jest.fn(),
    });

    useHeadquarter.mockReturnValue({
      headquarters: [],
      loading: false,
      errorHeadquarter: null,
      createHeadquarter: jest.fn(),
    });

    // Render dell'hook
    const { result, waitForNextUpdate } = renderHook(() => useSettingsPage());

    // Aspetta che l'hook termini l'aggiornamento
    await waitForNextUpdate();

    // Verifica che i target elements siano caricati correttamente
    expect(result.current.targets).toEqual([
      { id: 1, title: "Target 1", more: "100 chf" },
      { id: 2, title: "Target 2", more: "200 chf" },
    ]);
  });
});
