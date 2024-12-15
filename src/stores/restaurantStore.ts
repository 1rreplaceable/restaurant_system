import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RestaurantStore {
  restaurantId: number | null;
  setRestaurantId: (id: number) => void;
  clearRestaurantId: () => void;
}

const useRestaurantStore = create(
  persist<RestaurantStore>(
    (set) => ({
      restaurantId: null,
      setRestaurantId: (id) => set({ restaurantId: id }),
      clearRestaurantId: () => set({ restaurantId: null }),
    }),
    {
      name: "restaurant-storage",
    }
  )
);

export default useRestaurantStore;
